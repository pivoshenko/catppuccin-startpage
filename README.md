<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
  Catppuccin <a href="https://github.com/pivoshenko/catppuccin-startpage">Startpage</a>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>

<p align="center">
  <a href="https://github.com/pivoshenko/catppuccin-startpage/stargazers"><img src="https://img.shields.io/github/stars/catppuccin/bento?colorA=363a4f&colorB=b7bdf8&style=for-the-badge"></a>
  <a href="https://github.com/pivoshenko/catppuccin-startpage/issues"><img src="https://img.shields.io/github/issues/catppuccin/bento?colorA=363a4f&colorB=f5a97f&style=for-the-badge"></a>
  <a href="https://github.com/pivoshenko/catppuccin-startpage/contributors"><img src="https://img.shields.io/github/contributors/catppuccin/bento?colorA=363a4f&colorB=a6da95&style=for-the-badge"></a>
</p>

https://github.com/pivoshenko/catppuccin-startpage/assets/40499728/d96c8bd6-168e-408f-b4f0-0e339569c696

> **Note**: A live demo can be found [here](https://pivoshenko.github.io/catppuccin-startpage)

## Overview

Aesthetic and clean startpage in [**Catppuccin Mocha**](https://catppuccin.com/palette) style, hosted on GitHub Pages. This start page is based on the [`dawn`] and [`tartarus-startpage`], which has even more functionality.
I've tweaked the page's style to match [Catppuccin] palette and my [`dotfiles`].

### Main principles

- Minimalism in everything
- Consistency
- Simplicity
- One style
- Reduced visual noise

## Usage

1. Create your own repository for the startpage and clone it
2. Clone this repository with: `git clone https://github.com/pivoshenko/catppuccin-startpage.git pivoshenko-catppuccin-startpage`
3. Copy the assets and configs from `pivoshenko-catppuccin-startpage` to your repository: `cp pivoshenko-catppuccin-startpage/* <YOUR REPOSITORY>`
4. Remove `.github` directory as it contains only PR templates, issue labels etc
5. Update [`userconfig.js`]:
   1. Set your location for the weather widget
   2. Update the number of pages and their banners
   3. Update bookmarks and quick links for the one you are using the most :3

> [!TIP]
> You can find icons for your bookmarks using [`tabler-icons`]

> [!TIP]
> If you want to reduce the loading time of the icons, you could install the icon [font] locally and activate the option `"localIcons": true` in the config to disable the remote styles.

### Available banners

| cbg-2                                           | cbg-3                                           | cbg-4                                           | cbg-5                                           |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| <img src="src/img/banners/cbg-2.gif" width=175> | <img src="src/img/banners/cbg-3.gif" width=175> | <img src="src/img/banners/cbg-4.gif" width=175> | <img src="src/img/banners/cbg-5.gif" width=175> |

| cbg-6                                           | cbg-7                                           | cbg-8                                           | cbg-9                                           |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| <img src="src/img/banners/cbg-6.gif" width=175> | <img src="src/img/banners/cbg-7.gif" width=175> | <img src="src/img/banners/cbg-8.gif" width=175> | <img src="src/img/banners/cbg-9.gif" width=175> |

| cbg-10                                           | cbg-11                                           | cbg-12                                           | cbg-13                                           |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| <img src="src/img/banners/cbg-10.gif" width=175> | <img src="src/img/banners/cbg-11.gif" width=175> | <img src="src/img/banners/cbg-12.gif" width=175> | <img src="src/img/banners/cbg-13.gif" width=175> |


[`dawn`]: https://github.com/b-coimbra/dawn
[Catppuccin]: https://github.com/catppuccin/catppuccin
[`tartarus-startpage`]:https://github.com/AllJavi/tartarus-startpage
[`dotfiles`]: https://github.com/pivoshenko/dotfiles
[`userconfig.js`]: userconfig.js
[`tabler-icons`]: https://tabler.io/icons
[font]: src/fonts
