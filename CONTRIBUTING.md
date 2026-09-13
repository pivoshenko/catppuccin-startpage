# Contributing

- [Contributing](#contributing)
  - [Reporting Bugs](#reporting-bugs)
    - [How to Submit a Bug Report](#how-to-submit-a-bug-report)
  - [Suggesting Enhancements](#suggesting-enhancements)
    - [How to Submit an Enhancement](#how-to-submit-an-enhancement)
  - [Code Contributions](#code-contributions)
    - [Local Development](#local-development)
    - [CI/CD](#cicd)
    - [Branches](#branches)
    - [Commits](#commits)
    - [Pull Requests](#pull-requests)

Thank you for taking the time to contribute.

These guidelines are intended to make contributions consistent and easy to review across repositories. They are guidance, not hard instructions, and maintainers may adapt them when needed.

## Reporting Bugs

Before creating a bug report, search existing issues to avoid duplicates.

When opening a bug report, include enough context for someone else to reproduce the issue and understand the impact.

> [!NOTE]
> If you find a closed issue that looks similar, open a new issue and link the previous one.

### How to Submit a Bug Report

Open a bug report and provide the following:

- A clear, descriptive title
- Reproduction steps (minimal and reliable if possible)
- Current behavior and expected behavior
- Relevant environment details (for example OS, runtime, browser, framework versions)
- Logs, stack traces, screenshots, or recordings when useful

If the issue is intermittent, describe how often it happens and known triggers.
If the issue appeared after a change, mention the last known working version or commit if available.

## Suggesting Enhancements

Before submitting an enhancement, check whether a similar request already exists.

Enhancement requests can include new features, changes to existing behavior, usability improvements, or performance improvements.

### How to Submit an Enhancement

Open a feature request and provide the following:

- A clear problem statement
- The proposed solution
- Alternatives considered or current workarounds
- Expected impact (who benefits and how)

Concrete examples, API sketches, UI mockups, or references are helpful when relevant.

## Code Contributions

### Local Development

This is a dependency-free, static Catppuccin-themed startpage built from vanilla JS Web Components, so contributing needs only `just`, Python 3 to serve the page locally, and Rust/Cargo to install `whiskers` for regenerating the palette.

This project uses [`just`](https://github.com/casey/just) as its task runner. Run `just --list` for the full set; these are the ones you need day to day:

| Command | What it does |
| --- | --- |
| `just` | Lists every available recipe (the default target) |
| `just install` | Installs the `catppuccin-whiskers` CLI |
| `just build` | Regenerates the palette source from `templates/palette.tera` using `whiskers` |
| `just build-awoo-css` | Regenerates `src/css/awoo.min.css` from `src/css/awoo-local.min.css`, prepending the Google Fonts `@import` |
| `just run-dev-server` | Serves the repository root locally on port 8000 |
| `just format` | No-op - no formatter is configured for this repo |
| `just lint` | No-op - no linter is configured for this repo |
| `just test` | No-op - no tests are configured for this repo |
| `just check` | Runs `lint`, `test`, and `build` in sequence |
| `just update` | Re-installs the `catppuccin-whiskers` CLI |

1. Fork this repository and clone your fork locally
2. Create a branch following the naming convention described in [Branches](#branches)
3. Run `just check` to verify your changes before opening a pull request

> [!IMPORTANT]
> Behavioral code changes should include or update tests.

### CI/CD

This repository has no GitHub Actions workflows; run the checks above locally before opening a pull request.

### Branches

Branch names follow the pattern `<type>/<short-description>` using the same type prefixes as commits.
The description should be lowercase kebab-case, brief, and specific enough to identify the change at a glance.

Examples:

```
feat/github-token-refresh
fix/private-repo-archive-auth
docs/update-sync-flow-diagram
refactor/mcps-schema-alignment
```

A branch covering multiple unrelated changes should be split. One concern per branch makes review and bisect much easier.

### Commits

Use clear, focused commits with descriptive messages.

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

**Format**

```
<type>(<scope>): <subject>

[optional body]
```

- **type** - one of the prefixes from the table below
- **scope** - the module, command, or area being changed (e.g. `sync`, `mcps`, `github`, `landing`, `config`); omit when the change is truly cross-cutting
- **subject** - imperative mood, lowercase, no trailing period, 72 characters or fewer
- **body** - optional; use it to explain *why*, not *what*; wrap at 72 characters

**Type prefixes**

| Prefix     | When to use                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| `feat`     | A new feature or user-facing capability                                                                 |
| `fix`      | A bug fix that corrects incorrect behavior                                                              |
| `docs`     | Changes to documentation only (README, comments, guides)                                                |
| `refactor` | Code restructuring that does not change external behavior (renaming, extracting functions, simplifying) |
| `test`     | Adding, updating, or fixing tests without changing production code                                      |
| `chore`    | Maintenance tasks that don't affect source code or tests (dependency bumps, config tweaks, .gitignore)  |
| `ci`       | Changes to CI/CD configuration and scripts (GitHub Actions, workflows, pipelines)                       |
| `build`    | Changes to the build system or external dependencies (Cargo.toml, build scripts, Makefile)              |
| `perf`     | A code change that improves performance without altering functionality                                  |
| `style`    | Formatting-only changes (whitespace, semicolons, linting) with no logic changes                         |
| `design`   | Changes to visual or UI design assets and layout                                                        |
| `revert`   | Reverts a previous commit (reference the reverted commit hash in the body)                              |

**Examples**

```
feat(sync): support skills source sub-directory selection
fix(github): url-encode git refs in API tarball endpoint
refactor(mcps): align mcps[] schema with skills[]
docs(config): document browser URL auto-rewriting for --config
```

### Pull Requests

- Fill out the pull request template completely
- Keep the pull request focused and scoped to one change set
- Ensure tests and checks pass before requesting review
- Update documentation when behavior or interfaces change
- Respond to review feedback and keep the branch up to date with the target branch

Maintainers may ask for changes, additional tests, or scope adjustments before merging.
