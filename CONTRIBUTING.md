# Contributing

- [Contributing](#contributing)
  - [Reporting Bugs](#reporting-bugs)
    - [How To Submit a Bug Report](#how-to-submit-a-bug-report)
  - [Suggesting Enhancements](#suggesting-enhancements)
    - [How To Submit an Enhancement](#how-to-submit-an-enhancement)
  - [Code Contributions](#code-contributions)
    - [Local Development](#local-development)
    - [Commits](#commits)
    - [Pull Requests](#pull-requests)

Thank you for taking the time to contribute.

These guidelines are intended to make contributions consistent and easy to review across repositories. They are guidance, not hard rules, and maintainers may adapt them when needed.

## Reporting Bugs

Before creating a bug report, search existing issues to avoid duplicates.

When opening a bug report, include enough context for someone else to reproduce the issue and understand the impact.

> [!NOTE]
> If you find a closed issue that looks similar, open a new issue and link the previous one.

### How To Submit a Bug Report

Use the bug issue template and provide the following:

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

### How To Submit an Enhancement

Use the feature request template and provide the following:

- A clear problem statement
- The proposed solution
- Alternatives considered or current workarounds
- Expected impact (who benefits and how)

Concrete examples, API sketches, UI mockups, or references are helpful when relevant.

## Code Contributions

### Local Development

1. Fork the repository and create a branch for your change.
2. Set up the project using the repository's README or development docs.
3. Run the project's tests and quality checks locally before opening a pull request.

When a repository includes helper scripts or task runners, prefer using those documented commands.

> [!IMPORTANT]
> Behavioral code changes should include or update tests.

### Commits

Use clear, focused commits with descriptive messages.

This template recommends [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`
- `ci`
- `build`
- `perf`
- `style`
- `revert`

Example: `feat(auth): add token refresh support`

If your repository enforces a different commit style, follow the repository-specific rule.

### Pull Requests

- Fill out the pull request template completely
- Keep the pull request focused and scoped to one change set
- Ensure tests and checks pass before requesting review
- Update documentation when behavior or interfaces change
- Respond to review feedback and keep the branch up to date with the target branch

Maintainers may ask for changes, additional tests, or scope adjustments before merging.
