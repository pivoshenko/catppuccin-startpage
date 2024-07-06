# Contributing

- [Contributing](#contributing)
  - [Reporting Bugs](#reporting-bugs)
    - [How Do I Submit a Bug Report?](#how-do-i-submit-a-bug-report)
  - [Suggesting Enhancements](#suggesting-enhancements)
    - [How Do I Submit A Suggested Enhancement?](#how-do-i-submit-a-suggested-enhancement)
  - [Code Contributions](#code-contributions)
    - [Local Development](#local-development)
    - [Commits](#commits)
    - [Pull Requests](#pull-requests)

First of all, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to `catppuccin-startpage`. These are mostly guidelines,
not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Reporting Bugs

This section guides you through submitting a bug report for `catppuccin-startpage`. Following these guidelines
helps maintainers and the community understand your report, reproduce the behaviour, and find related reports.

Before creating bug reports, please check that your issue does not already exist in the issue tracker.
When you are creating a bug report, please include as many details as possible. Fill out the required
template the information it asks helps the maintainers resolve the issue faster.

> [!NOTE]
> If you find a **Closed** issue that seems like it is the same thing that you're experiencing,
> open a new issue and include a link to the original issue in the body of your new one.

### How Do I Submit a Bug Report?

Bugs concerning `catppuccin-startpage` should be submitted to the main issue tracker, using the correct issue template.

Explain the problem and make it easy for others to search for and understand:

- Use a clear and descriptive title for the issue to identify the problem
- Describe the exact steps which reproduce the problem in as many details as possible
- Describe the behaviour you observed after following the steps and point out how this is a bug
- Explain which behaviour you expected to see instead and why

Provide detailed steps for reproduction of your issue:

- Provide specific examples to demonstrate the steps to reproduce the issue. This could be an example repository, a sequence of steps run in a container
- Are you unable to reliably reproduce the issue? If so, provide details about how often the problem happens and under which conditions it normally happens

Provide more context by answering these questions:

- Did the problem start happening recently (e.g. after updating to a new version of `catppuccin-startpage`) or was this always a problem?
- If the problem started happening recently, can you reproduce the problem in an older version of `catppuccin-startpage`? What’s the most recent version in which the problem does not happen?
- Is there anything exotic or unusual about your environment? This could include the use of special container images, newer CPU architectures like Apple Silicon

Include details about your configuration and environment:

- What’s the name and version of the OS you’re using?

To give others the best chance to understand and reproduce your issue, please be sure to put extra effort into your reproduction steps. You can both rule out local configuration issues on your end, and ensure others can cleanly reproduce your issue if attempt all reproductions in a pristine container (or VM), and provide the steps you performed inside that container/VM in your issue report.

## Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for `catppuccin-startpage`,
including completely new features as well as improvements to existing functionality.
Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

Before creating enhancement suggestions, please check this list as you might find out that you don't
need to create one. When you are creating an enhancement suggestion, please include as many details
as possible. Fill in the template, including the steps that you imagine you would
take if the feature you're requesting existed.

### How Do I Submit A Suggested Enhancement?

Suggested enhancements concerning `catppuccin-startpage` should be submitted to the main issue tracker, using the correct issue template.

- Use a clear and descriptive title for the issue to identify the suggestion
- Provide a detailed description of the proposed enhancement, with specific steps or examples when possible
- Describe the current behaviour and explain which behaviour you would like to see instead, and why

## Code Contributions

### Local Development

You should first fork the `catppuccin-startpage` repository and then clone it locally so that you can make pull requests against the project.
If you are new to `git` and pull request based development, GitHub provides a [guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) you will find helpful.

The [`pre-commit`](https://pre-commit.com) tool is used to install and run liniting tools, and requires one-time setup:

```shell
pre-commit install
```

`pre-commit` will now run and check your code every time you make a commit.
By default, it will only run on changed files, but you can run it on all files manually (this may be useful if you altered the `pre-commit` config):

```shell
pre-commit run --all-files
```

### Commits

We follow the [conventional commit message syntax](https://www.conventionalcommits.org/en/v1.0.0) for our commits. For instance:
`feat: allow provided config object to extend other configs`.

Every feature branch that is squashed onto the main branch must follow these rules. The benefits are:

- A standard way of writing commit messages for every contributor
- A way to quickly see and understand what the commit does and what it affects
- Automatic changelog creation based on those keywords

The keywords that support (heavily inspired by [`config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)):

- `ci`
- `chore`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `revert`
- `style`
- `test`

Moreover, every commit message needs to be written in lowercase.

> [!NOTE]
> All the commits in a pull request are squashed when merged into the `main` branch. That means only the commit message of the squashed branch needs to follow this commit message convention.
> That also means that you don't need to follow this convention for commits within a branch, which will usually contain a lot of commits with a `wip` title

### Pull Requests

- Fill out the pull request body completely and describe your changes as accurately as possible. The pull request body should be kept up to date as it will usually form the base for the final merge commit and the changelog entry
- Be sure that your pull request contains tests that cover the changed or added code. Tests are generally required for code to be considered mergeable, and code without passing tests will not be merged
- Ensure your pull request passes all checks. Remember that you can run these tools locally instead of relying on remote CI
- If your changes warrant a documentation change, the pull request must also update the documentation. Make sure to review the documentation preview generated by CI for any rendering issues

> [!NOTE]
> Make sure your branch is rebased against the latest `main` branch. A maintainer might ask you to ensure the branch is up-to-date prior to merging your pull request (especially if there have been CI changes on the `main` branch), and will also ask you to fix any conflicts

All pull requests, unless otherwise instructed, need to be first accepted into the `main` branch. Maintainers will generally decide if any backports to other branches are required, and carry them out as needed.
