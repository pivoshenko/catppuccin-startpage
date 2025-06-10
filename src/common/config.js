class Config {
  // Default configuration values for the startpage - these can be overridden by user configuration or local storage
  defaults = {
    // Whether to override localStorage with config values
    overrideStorage: false,
    temperature: {
      // Default city for weather display
      location: "London",
      // Temperature scale: C for Celsius, F for Fahrenheit
      scale: "C",
    },
    clock: {
      // 12-hour format with AM/PM
      format: "k:i p",
    },
    // Extra clocks to display alongside main clock
    additionalClocks: [
      {
        // Label displayed next to the clock
        label: "UA",
        // IANA timezone name (handles DST automatically)
        timezone: "Europe/Kyiv",
        // 24-hour format
        format: "h:i",
      },
      {
        // Clock label
        label: "Tokyo",
        // IANA timezone name
        timezone: "Asia/Tokyo",
        // 24-hour format without leading zero
        format: "H:i",
        // Locale for localised formatting
        locale: "ja-JP",
      }
    ],
    search: {
      // Search engine shortcuts and their URLs
      engines: {
        p: ["https://www.perplexity.ai/search/?q=", "PerplexityAI"],
        d: ["https://duckduckgo.com/?q=", "DuckDuckGo"],
        g: ["https://google.com/search?q=", "Google"],
      }
    },
    // List of disabled components
    disabled: [],
    // Whether to use local fonts instead of Google Fonts CDN
    localFonts: false,
    // Whether to restore last active tab on load
    openLastVisitedTab: false,
    // User-defined bookmark tabs
    tabs: [],
    // Keyboard shortcuts for actions
    keybindings: {
      // 's' key opens search bar
      "s": "search-bar",
    }
  };

  // User configuration object
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
    document.onkeypress = ({ key }) => {
      if (document.activeElement !== document.body) return;

      if (Object.keys(this.config.keybindings).includes(key)) Actions.activate(this.config.keybindings[key]);
    };
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
