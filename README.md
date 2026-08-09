<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
  Catppuccin <a href="https://pivoshenko.github.io/catppuccin-startpage">Startpage</a>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>

<p align="center">
  <a href="https://github.com/pivoshenko/catppuccin-startpage/stargazers">
    <img src="https://img.shields.io/github/stars/pivoshenko/catppuccin-startpage?style=for-the-badge&logo=starship&color=c6a0f6&logoColor=cad3f5&labelColor=302d41">
  </a>
  <a href="https://github.com/pivoshenko/catppuccin-startpage/issues">
    <img src="https://img.shields.io/github/issues/pivoshenko/catppuccin-startpage?style=for-the-badge&logo=gitbook&color=ed8796&logoColor=cad3f5&labelColor=302d41">
  </a>
  <a href="https://github.com/pivoshenko/catppuccin-startpage/contributors">
    <img src="https://img.shields.io/github/contributors/pivoshenko/catppuccin-startpage?style=for-the-badge&logo=github&color=a6da95&logoColor=cad3f5&labelColor=302d41">
  </a>
  <a href="https://github.com/pivoshenko/catppuccin-startpage">
      <img src="https://img.shields.io/github/repo-size/pivoshenko/catppuccin-startpage?style=for-the-badge&logo=hackthebox&color=8aadf4&logoColor=cad3f5&labelColor=302d41">
  </a>
</p>

<p align="center">
  <a href="https://stand-with-ukraine.pp.ua">
    <img alt="StandWithUkraine" src="https://img.shields.io/badge/Support-Ukraine-FFC93C?style=for-the-badge&logoColor=cad3f5&labelColor=07689F">
  </a>
</p>

<p align="center">
  <img src="assets/preview.png"/>
</p>

## 🪴 Overview

A minimalistic and customisable startpage that uses the [**Catppuccin palettes**](https://catppuccin.com/palette). It hosts on GitHub Pages. The page is based on [`dawn`](https://github.com/b-coimbra/dawn), which has more functionality than this version; I pared it down to match my [`dotfiles`](https://github.com/pivoshenko/dotfiles), so have a look at those too.

### 🧠 Main Principles

- Minimal in all aspects
- Consistent user interface and codebase
- Simple design and configuration
- One style, little visual noise

### 🎨 Supported Palettes

- Latte
- Frappé
- Macchiato
- Mocha

### ⭐ Features

- Automatic theme switching based on system settings (light/dark mode)
- Customisable startpage / bookmarks manager
- Search bar with multiple engines
- Weather widget
- Clock widget with 12/24-hour format and multiple time zones support
- Local fonts mode for privacy and offline use (no Google Fonts CDN)

## 🪵 Usage

1. Fork this repository and clone it
2. Optionally remove the `.github` directory, as it contains only PR templates, issue labels, etc., that are linked to this repository
3. Create [`userconfig.js`](userconfig.example.js) based on the example file: `cp userconfig.example.js userconfig.js`
   - Set the desired palette: `latte`, `frappe`, `macchiato`, or `mocha`
   - Set your location for the weather widget
   - Update the number of tabs and their banners
   - Update bookmarks and quick links for those you use most

> [!TIP]
> You can find icons for your bookmarks using [`tabler-icons`](https://tabler.io/icons).
>
> To cut icon loading times, install the icon [font](src/fonts) locally and set `"localIcons": true` in the configuration to disable remote styles. Set `"localFonts": true` to serve all fonts from the repository instead of the Google Fonts CDN.

### As Homepage

- Click the menu button and select `Options/Preferences`
- Click the home panel
- Click the menu next to 'Homepage and new windows', choose to show custom URLs, and add your GitHub Pages link

### As New Tab

You can use different add-ons or extensions for this.

- If you use Firefox-based browsers: [Custom New Tab Page](https://addons.mozilla.org/en-US/firefox/addon/custom-new-tab-page/?src=search) and make sure to enable "Force links to open in the top frame (experimental)" in the extension's preferences page
- If you use Chromium-based browsers (Brave / Chrome): [Custom New Tab URL](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia)

## 🛠️ Development

For local viewing, run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000`.
To regenerate the palette CSS, run `just build` (requires [`whiskers`](https://github.com/catppuccin/whiskers)).

### 🔎 Search

<p align="center">
  <img src="assets/preview.searchbar.png"/>
</p>

The search dialogue is a search bar wired to the search engines defined in the configuration. Press `s` to open it, then type a query, or a URL to jump straight there.

To pick an engine, prefix the query with its `!<id>`. The engines defined by default are:

- `!p`: PerplexityAI
- `!g`: Google
- `!d`: DuckDuckGo

The default search engine can be set in the `userconfig.js` file (use the engine ID without the `!` prefix):

```javascript
search: {
  default: "d"
}
```

### ⏰ Clock

The clock component supports:

- 12-hour and 24-hour time formats
- Multiple clocks for different time zones
- Customisable formatting
- Locales for regional time display

The `format` string uses strftime-like tokens (`k`, `i`, `p`, `h`, `H`). See [`src/common/strftime.js`](src/common/strftime.js) for the full reference.

You can configure the clock format and add additional time zones in your `userconfig.js`:

```javascript
clock: {
  format: "k:i p", // 12-hour format with AM/PM (09:30 PM)
  icon_color: palette.maroon,
},
// Optional: Add multiple clocks for different time zones
additionalClocks: [
  {
    label: "NYC", // Label for the clock
    timezone: "America/New_York", // IANA timezone name (handles DST automatically)
    format: "h:i", // 24-hour format (21:30)
    locale: "en-US", // Locale for date/time formatting
    icon_color: palette.blue // Optional different icon color
  }
],
```

## 🖼️ Available Banners

| banner_01                                           | banner_02                                           | banner_03                                           | banner_04                                           |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| <img src="src/img/banners/banner_01.gif" width=175> | <img src="src/img/banners/banner_02.gif" width=175> | <img src="src/img/banners/banner_03.gif" width=175> | <img src="src/img/banners/banner_04.gif" width=175> |

| banner_05                                           | banner_06                                           | banner_07                                           | banner_08                                           |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| <img src="src/img/banners/banner_05.gif" width=175> | <img src="src/img/banners/banner_06.gif" width=175> | <img src="src/img/banners/banner_07.gif" width=175> | <img src="src/img/banners/banner_08.gif" width=175> |

| banner_09                                           | banner_10                                           | banner_11                                           | banner_12                                           |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| <img src="src/img/banners/banner_09.gif" width=175> | <img src="src/img/banners/banner_10.gif" width=175> | <img src="src/img/banners/banner_11.gif" width=175> | <img src="src/img/banners/banner_12.gif" width=175> |

| banner_13                                           | banner_14                                           | banner_15                                           | banner_16                                           |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| <img src="src/img/banners/banner_13.gif" width=175> | <img src="src/img/banners/banner_14.gif" width=175> | <img src="src/img/banners/banner_15.gif" width=175> | <img src="src/img/banners/banner_16.gif" width=175> |

| banner_17                                           | banner_18                                           |
| --------------------------------------------------- | --------------------------------------------------- |
| <img src="src/img/banners/banner_17.gif" width=175> | <img src="src/img/banners/banner_18.gif" width=175> |
