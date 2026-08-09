# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, dependency-free browser startpage (Catppuccin-themed) served from GitHub Pages. Vanilla JS Web Components, no bundler, no package manager, no test suite, no linter. Everything ships as-is from the repo root; `.nojekyll` disables Jekyll processing.

## Commands

```sh
just dev          # python3 -m http.server 8000, then open http://localhost:8000
just build        # regenerate src/common/palette.js from templates/palette.tera (needs whiskers)
just install      # cargo install catppuccin-whiskers
just build-awoo   # regenerate src/css/awoo.min.css from src/css/awoo-local.min.css
```

First-run setup (required — the page is blank without it):

```sh
cp userconfig.example.js userconfig.js
```

`userconfig.js` is untracked and **not** in `.gitignore`; it is loaded by `index.html` and must exist locally. Do not commit it.

There are no tests and no lint step. The only CI is `.github/workflows/labels.yaml`, which syncs GitHub labels from `.github/labels.yaml`.

## Architecture

Scripts are plain `<script>` tags in `index.html` — **no modules, no imports; everything is a global and load order is load-bearing.** Adding a new file means adding a `<script>` tag in the correct slot: `src/common/*` first, then `userconfig.js` (which constructs `CONFIG`), then components, then `src/common/module.js` last.

**Boot sequence**

1. `src/common/*.js` define globals: `palette` flavours, `Storage`, `Actions`, `Config`, `strftime`, `initThemeSystem`, `Component`.
2. `userconfig.js` calls `initThemeSystem(light, dark)` to pick a palette from `prefers-color-scheme`, builds `const CONFIG = new Config(default_configuration, palette)`, and sets the `--bg` / `--accent` CSS vars on `:root`.
3. An inline script in `index.html` reads `CONFIG.localFonts` to load either CDN or local font/awoo stylesheets.
4. Component classes are defined, then `module.js` registers them as custom elements, skipping anything in `CONFIG.disabled`.

**Component contract** (`src/common/component.js`)

`Component extends HTMLElement` with an open shadow root. Subclasses override `imports()` (array of `<link>` tags via `this.getResource(category, name)`), `style()` (CSS string), `template()` (HTML string), and declare a `refs` object mapping names to selectors. `connectedCallback()` calls `this.render()`, which sets `shadow.innerHTML` and swaps `refs` for a Proxy: reading `this.refs.foo` returns the matched element(s); assigning `this.refs.foo = html` sets its `innerHTML`. Every rendered instance registers itself in the global `RenderedComponents` map keyed by tag name.

Styles are template literals that interpolate `CONFIG.palette.*` at render time, which is why a system theme change triggers a full page reload (`theme.js`) rather than a restyle.

**Component graph**

`<tabs-list>` is the only element in `index.html`. Its shadow DOM contains `<search-bar>` and `<status-bar>`; `<status-bar>` in turn embeds `<current-time>` and `<weather-forecast>`. Cross-component wiring is deliberate but implicit:

- `Statusbar.setDependencies()` reaches out through `this.parentNode.querySelectorAll(".categories ul")` to get the tab panels it drives (`externalRefs.categories`).
- `Actions.activate(tagName)` looks up `RenderedComponents[tagName]` and calls its `activate()`. `CONFIG.keybindings` maps a key to a **custom element tag name** (default `"s": "search-bar"`), so any component reachable by keybinding must implement `activate()`.
- Tab switching (click, number keys 1-5, wheel) lives entirely in `statusbar.component.js`; `openLastVisitedTab` persists the index to `localStorage.lastVisitedTab`.

**Configuration** (`src/common/config.js`)

`Config` merges three sources per setting: user config wins only when `overrideStorage: true` (or the setting is `tabs`, which always wins), else `localStorage.configuration`, else `defaults`. The instance is returned wrapped in a Proxy so any property write re-persists to localStorage. Consequence: with `overrideStorage: false`, editing `userconfig.js` appears to do nothing until localStorage is cleared.

**Palette** (`src/common/palette.js`)

Generated — do not hand-edit. It comes from `templates/palette.tera` via `just build` (catppuccin `whiskers`, version pinned in the template frontmatter). Change the template, not the output. Same rule for `src/css/awoo.min.css`: the source of truth is `awoo-local.min.css`, and `just build-awoo` regenerates the CDN variant by prepending the Google Fonts `@import`.

**Local vs CDN assets**

`CONFIG.localFonts` is the single switch. `Component.localOverrides` remaps `fonts.roboto` / `fonts.nunito` / `fonts.raleway` / `icons.material` / `libs.awoo` to their `*-local` equivalents inside `getResource()`. Note: `localIcons` appears in `userconfig.example.js` and the README but is **not read anywhere in the code** — tabler icons are always served locally.

**Clock formatting** (`src/common/strftime.js`)

Non-standard, percent-free strftime that patches `Date.prototype.strftime(format, locale)`. Hour tokens are easy to confuse: `h` = 24h padded, `H` = 24h unpadded, `k` = 12h padded, `K` = 12h unpadded, `i` = padded minutes, `p`/`P` = AM-PM / am-pm. Additional time zones come from `CONFIG.additionalClocks` (IANA names, DST handled by `toLocaleString`).

**Weather** (`src/components/weather/`)

OpenWeatherMap, `CONFIG.temperature.appId`. With no key the client's URL is `null` and `getWeather()` resolves to `null`, leaving the placeholder — never make the widget throw when the key is absent. Clicking the widget toggles C/F.

## Conventions

- `.editorconfig`: 2-space indent, LF, UTF-8, trim trailing whitespace, 120-column soft limit.
- Prose in comments, docstrings, and docs uses British spelling (`initialise`, `colour`, `customisable`) — match it.
- Layout uses awoo's escaped utility classes: `+` (flex centre both axes), `-` (flex, align-centre), `|` (flex, justify-centre), and `!`-prefixed variants for absolute positioning. They look like typos in templates; they are not.
- Conventional Commits, `<type>(<scope>): <subject>`, imperative and lowercase; branches are `<type>/<short-kebab-description>`. Full type table in `CONTRIBUTING.md`.
