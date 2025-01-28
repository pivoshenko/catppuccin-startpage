<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
  Catppuccin <a href="https://pivoshenko.github.io/catppuccin-startpage">Startpage</a>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>

<p align="center">
  <a href="https://github.com/pivoshenko/catppuccin-startpage/stargazers">
    <img src="https://img.shields.io/github/stars/pivoshenko/catppuccin-startpage?style=for-the-badge&logo=starship&color=a6e3a1&logoColor=D9E0EE&labelColor=302D41">
  </a>
  <a href="https://github.com/pivoshenko/catppuccin-startpage/issues">
    <img src="https://img.shields.io/github/issues/pivoshenko/catppuccin-startpage?style=for-the-badge&logo=gitbook&color=fab387&logoColor=D9E0EE&labelColor=302D41">
  </a>
  <a href="https://github.com/pivoshenko/catppuccin-startpage/contributors">
    <img src="https://img.shields.io/github/contributors/pivoshenko/catppuccin-startpage?style=for-the-badge&logo=github&color=f38ba8&logoColor=D9E0EE&labelColor=302D41">
  </a>
</p>

<p align="center">
  <img src="assets/preview.png"/>
</p>

## 🪴 Overview

A minimalistic and customizable startpage featuring the [**Catppuccin palettes**](https://catppuccin.com/palette).
Designed for both aesthetics and functionality with seamless hosting on GitHub Pages.
This startpage is based on the [`dawn`](https://github.com/b-coimbra/dawn), which has even more functionality.
I've tweaked the page to match my [`dotfiles`](https://github.com/pivoshenko/dotfiles) so check them out as well.

### 🧠 Main principles

- Minimalism in everything
- Consistency
- Simplicity
- One style
- Reduced visual noise

### 🎨 Supported Palettes

- Latte
- Frappé
- Macchiato
- Mocha

## 🪵 Usage

1. Fork this repository and clone it
2. Optionally remove the `.github` directory as it contains only PR templates, issue labels, etc that are linked to this repository
3. Update [`userconfig.js`](userconfig.js):
   - Set the desired palette: `latte / frappe / macchiato / mocha`
   - Set your location for the weather widget
   - Update the number of pages and their banners
   - Update bookmarks and quick links for the one you are using the most :3

> [!TIP]
> You can find icons for your bookmarks using [`tabler-icons`](https://tabler.io/icons)
>
> If you want to reduce the loading time of the icons, you could install the icon [font](src/fonts) locally and activate the option `"localIcons": true` in the config to disable the remote styles

#### As Homepage

- Click the menu button and select `Options/Preferences`
- Click the home panel
- Click the menu next to the homepage and new windows and choose to show custom URLs and add your GitHub Pages link

#### As New Tab

You can use different add-ons/extensions for it

- If you use Firefox-based browsers: [Custom New Tab Page](https://addons.mozilla.org/en-US/firefox/addon/custom-new-tab-page/?src=search) and make sure you enable "Force links to open in the top frame (experimental)" in the extension's preferences page
- If you use Chromium-based browsers (Brave / Chrome): [Custom New Tab URL](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia)

### 🖼️ Available banners

| cbg-01                                           | cbg-02                                           | cbg-03                                           | cbg-04                                           |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| <img src="src/img/banners/cbg-01.gif" width=175> | <img src="src/img/banners/cbg-02.gif" width=175> | <img src="src/img/banners/cbg-03.gif" width=175> | <img src="src/img/banners/cbg-04.gif" width=175> |

| cbg-05                                           | cbg-06                                           | cbg-07                                           | cbg-08                                           |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| <img src="src/img/banners/cbg-05.gif" width=175> | <img src="src/img/banners/cbg-06.gif" width=175> | <img src="src/img/banners/cbg-07.gif" width=175> | <img src="src/img/banners/cbg-08.gif" width=175> |

| cbg-09                                           | cbg-10                                           | cbg-11                                           | cbg-12                                           |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| <img src="src/img/banners/cbg-09.gif" width=175> | <img src="src/img/banners/cbg-10.gif" width=175> | <img src="src/img/banners/cbg-11.gif" width=175> | <img src="src/img/banners/cbg-12.gif" width=175> |

| cbg-13                                           | cbg-14                                           | cbg-15                                           |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| <img src="src/img/banners/cbg-13.gif" width=175> | <img src="src/img/banners/cbg-14.gif" width=175> | <img src="src/img/banners/cbg-15.gif" width=175> |
