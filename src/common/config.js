class Config {
  // Default configuration values for the startpage - these can be overridden by user configuration or local storage
  defaults = {
    overrideStorage: false,
    temperature: {
      location: "London",
      // Temperature scale: C for Celsius, F for Fahrenheit
      scale: "C",
      // OpenWeatherMap API key, leave empty to disable the weather widget
      appId: "",
    },
    clock: {
      // 12-hour format with AM/PM
      format: "k:i p",
    },
    additionalClocks: [
      {
        label: "UA",
        // IANA timezone name (handles DST automatically)
        timezone: "Europe/Kyiv",
        // 24-hour format
        format: "h:i",
      },
      {
        label: "Tokyo",
        timezone: "Asia/Tokyo",
        // 24-hour format without leading zero
        format: "H:i",
        locale: "ja-JP",
      }
    ],
    search: {
      engines: {
        p: ["https://www.perplexity.ai/search/?q=", "PerplexityAI"],
        d: ["https://duckduckgo.com/?q=", "DuckDuckGo"],
        g: ["https://google.com/search?q=", "Google"],
      }
    },
    // List of disabled components
    disabled: [],
    // URL to open when clicking the fastlink button in the statusbar
    fastlink: "",
    // Whether to use local fonts instead of Google Fonts CDN
    localFonts: false,
    openLastVisitedTab: false,
    // User-defined bookmark tabs
    tabs: [],
    keybindings: {
      "s": "search-bar",
    }
  };

  config;

  /**
   * Initialise the configuration with user settings and palette
   * @param {Object} configuration - User configuration object
   * @param {Object} palette - Colour palette for the startpage
   */
  constructor(configuration, palette) {
    this.config = configuration;
    this.palette = palette;
    this.storage = new Storage("configuration");

    this.autoConfig();
    this.setKeybindings();
    this.save();

    // Use a Proxy to automatically persist configuration changes
    return new Proxy(this, {
      ...this,
      __proto__: this.__proto__,
      set: (target, prop, value) => this.settingUpdatedCallback(target, prop, value),
    });
  }

  /**
   * Automatically save whenever a configuration property is updated
   * @param {Object} target - The proxy target object
   * @param {string} prop - The property being set
   * @param {*} val - The new value for the property
   * @returns {boolean} Whether the operation was successful
   */
  settingUpdatedCallback(target, prop, val) {
    if (!(prop in target)) return false;

    Reflect.set(target, prop, val);
    Object.assign(this, target);

    this.save();

    return true;
  }

  /**
   * Set default configuration values or load them from local storage
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
   * Determines whether localStorage can be overridden for a given setting
   * If the setting is for the tabs section, always override
   * @param {string} setting - The setting name to check
   * @returns {boolean} Whether the setting can override storage
   */
  canOverrideStorage(setting) {
    return setting in this.config && (this.config.overrideStorage || setting === "tabs");
  }

  /**
   * Serialise the configuration object for export or storage
   * @returns {Object} Serialised configuration object
   */
  toJSON() {
    return {
      ...this,
      defaults: undefined,
    };
  }

  /**
   * Set up keybinding actions for the startpage
   * @returns {void}
   */
  setKeybindings() {
    document.addEventListener("keydown", ({ key }) => {
      if (document.activeElement !== document.body) return;

      if (key in this.config.keybindings) Actions.activate(this.config.keybindings[key]);
    });
  }

  /**
   * Persist the current configuration to local storage
   * @returns {void}
   */
  save() {
    this.storage.save(stringify(this));
  }

  /**
   * Export the current configuration as a downloadable file
   * @returns {void}
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
