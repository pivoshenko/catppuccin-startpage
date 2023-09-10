<p align="center">
    <a href="https://www.buymeacoffee.com/volopivoshenko" target="_blank">
        <img alt="buymeacoffee" src="https://img.shields.io/badge/buy_me_-a_coffee-ff6964?logo=buymeacoffee">
    </a>
    <a href="https://stand-with-ukraine.pp.ua/">
        <img alt="standwithukraine" src="https://img.shields.io/badge/Support-Ukraine-FFD500?style=flat&labelColor=005BBB">
    </a>
    <a href="https://stand-with-ukraine.pp.ua">
        <img alt="standwithukraine" src="https://img.shields.io/badge/made_in-Ukraine-ffd700.svg?labelColor=0057b7">
    </a>
    <a href="https://wakatime.com/badge/user/9862508c-0a86-427a-929c-46186f2d191a/project/6f149575-e390-48f9-9b7a-fd557bda4a6a">
        <img src="https://wakatime.com/badge/user/9862508c-0a86-427a-929c-46186f2d191a/project/6f149575-e390-48f9-9b7a-fd557bda4a6a.svg" alt="wakatime">
    </a>
</p>

- [Overview](#overview)
- [Keybindings](#keybindings)
- [Configuration Dialog](#configuration-dialog)
- [Search Dialog](#search-dialog)


## Overview

This start page is based on the [dawn](https://github.com/b-coimbra/dawn), which has even more functionality.

## Keybindings

| Hotkey                                                         | Action              |
| -------------------------------------------------------------- | ------------------- |
| <kbd>Numrow</kbd> \| <kbd>MouseWheel</kbd> \| <kbd>Click</kbd> | Switch tabs         |
| <kbd>s</kbd>                                                   | Search Dialog       |
| <kbd>q</kbd>                                                   | Config Dialog (new) |
| <kbd>Esc</kbd>                                                 | Close Dialogs       |

## Configuration Dialog

The default configuration file is [userconfig.js](userconfig.js), but you can change it in the configuration dialog. You can find more information about how the file works in the [original repository](https://github.com/b-coimbra/dawn). The available components are tabs, a clock, and weather.

Additionally, there's a new option called `fastlink` to set the link of the Pokéball button.

## Search Dialog

The search dialog allows you to display a search bar with various search engines defined in the configuration. To select each one, you simply need to prefix the query with the corresponding `!<id>`.

By default, the defined search engines are:
- `!g`: google
- `!d`: duckduckgo
- `!y`: youtube
- `!r`: reddit
- `!p`: pinterest
