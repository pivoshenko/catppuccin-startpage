class Config {
  // Default configuration values for the startpage. These can be overridden by user configuration or local storage.
  defaults = {
    overrideStorage: false,
    temperature: {
      location: "London",
      scale: "C",
    },
    clock: {
      format: "h:i p",
    },
    search: {
      engines: {
        d: ["https://duckduckgo.com/?q=", "DuckDuckGo"],
        g: ["https://google.com/search?q=", "Google"],
      }
    },
    disabled: [],
    openLastVisitedTab: false,
    tabs: [],
    keybindings: {
      "s": "search-bar",
    }
  };

  config;

  constructor(configuration, palette) {
    // Store the user configuration and palette for the startpage.
    this.config = configuration;
    this.palette = palette;
    this.storage = new Storage("configuration");

    this.autoConfig();
    this.setKeybindings();
    this.save();

    // Use a Proxy to automatically persist configuration changes.
    return new Proxy(this, {
      ...this,
      __proto__: this.__proto__,
      set: (target, prop, value) => this.settingUpdatedCallback(target, prop, value),
    });
  }

  /**
   * Automatically save whenever a configuration property is updated.
   * @returns {void}
   */
  settingUpdatedCallback(target, prop, val) {
    if (!(prop in target)) return false;

    Reflect.set(target, prop, val);
    Object.assign(this, target);

    this.save();

    return true;
  }

  /**
   * Set default configuration values or load them from local storage.
   * @returns {void}
   */
  autoConfig() {
    Object.keys(this.defaults).forEach((setting) => {
      if (this.canOverrideStorage(setting)) this[setting] = this.config[setting];
      else if (this.storage.hasValue(setting)) this[setting] = this.storage.get(setting);
      else this[setting] = this.defaults[setting];
    });
  }

  /**
   * Determines whether localStorage can be overridden for a given setting.
   * If the setting is for the tabs section, always override.
   * @returns {boolean}
   */
  canOverrideStorage(setting) {
    return setting in this.config && (this.config.overrideStorage || setting === "tabs");
  }

  /**
   * Serialise the configuration object for export or storage.
   * @returns {Object}
   */
  toJSON() {
    return {
      ...this,
      defaults: undefined,
    };
  }

  /**
   * Set up keybinding actions for the startpage.
   * @returns {void}
   */
  setKeybindings() {
    document.onkeypress = ({ key }) => {
      if (document.activeElement !== document.body) return;

      if (Object.keys(this.config.keybindings).includes(key)) Actions.activate(this.config.keybindings[key]);
    };
  }

  /**
   * Persist the current configuration to local storage.
   */
  save() {
    this.storage.save(stringify(this));
  }

  /**
   * Export the current configuration as a downloadable file.
   */
  exportSettings() {
    const anchor = document.createElement('a');
    const filename = 'dawn.configuration.json';
    const mimeType = 'data:text/plain;charset=utf-8,';

    anchor.href = mimeType + encodeURIComponent(stringify(this, null, 2));
    anchor.download = filename;

    anchor.click();
  }
}
