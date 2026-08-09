const RenderedComponents = {};

// Base class for all startpage components: shadow DOM, resource management, rendering
class Component extends HTMLElement {
  refs = {};

  resources = {
    fonts: {
      roboto: '<link href="https://fonts.googleapis.com/css?family=Roboto:100,400,700" rel="stylesheet">',
      nunito: '<link href="https://fonts.googleapis.com/css?family=Nunito:200" rel="stylesheet">',
      raleway: '<link href="https://fonts.googleapis.com/css?family=Raleway:600" rel="stylesheet">',
    },
    localFonts: {
      roboto: '<link rel="stylesheet" href="src/fonts/roboto-local.css">',
      nunito: '<link rel="stylesheet" href="src/fonts/nunito-local.css">',
      raleway: '<link rel="stylesheet" href="src/fonts/raleway-local.css">',
    },
    icons: {
      material:
        '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">',
      materialLocal: '<link rel="stylesheet" href="src/fonts/material-icons-local.css">',
      tabler: '<link rel="stylesheet" href="src/css/tabler-icons.min.css">',
    },
    libs: {
      awoo: '<link rel="stylesheet" type="text/css" href="src/css/awoo.min.css">',
      awooLocal: '<link rel="stylesheet" type="text/css" href="src/css/awoo-local.min.css">',
    },
  };

  // Map of (category, name) -> local-variant key, applied when CONFIG.localFonts is true
  static localOverrides = {
    "fonts.roboto": ["localFonts", "roboto"],
    "fonts.nunito": ["localFonts", "nunito"],
    "fonts.raleway": ["localFonts", "raleway"],
    "icons.material": ["icons", "materialLocal"],
    "libs.awoo": ["libs", "awooLocal"],
  };

  /**
   * Initialise the component with shadow DOM
   * Creates an open shadow root for style encapsulation
   */
  constructor() {
    super();

    this.shadow = this.attachShadow({
      mode: "open",
    });
  }

  /**
   * Resolve a resource link for the given category/name, honouring CONFIG.localFonts.
   * @param {string} category - One of "fonts", "icons", "libs".
   * @param {string} name - Resource name within the category.
   * @returns {string} HTML <link> tag for the resource.
   */
  getResource(category, name) {
    if (typeof CONFIG !== "undefined" && CONFIG.localFonts) {
      const override = Component.localOverrides[`${category}.${name}`];
      if (override) {
        const [cat, key] = override;
        return this.resources[cat][key];
      }
    }
    return this.resources[category][name];
  }

  /**
   * Returns custom styles for the component
   * @returns {string|null} CSS styles or null
   */
  style() {
    return null;
  }

  /**
   * Returns the HTML template for the component
   * @returns {string|null} HTML template or null
   */
  template() {
    return null;
  }

  /**
   * Returns array of external resources to import
   * @returns {Array<string>} Array of resource imports
   */
  imports() {
    return [];
  }

  /**
   * Return all the imports that a component requested
   * @returns {Array<string>} imports
   */
  get getResources() {
    return this.imports();
  }

  /**
   * Return inline style tag
   * @returns {string}
   */
  async loadStyles() {
    let html = this.getResources.join("\n");

    if (this.style()) html += `<style>${this.style()}</style>`;

    return html;
  }

  /**
   * Build the component's HTML body
   * @returns {string} html
   */
  async buildHTML() {
    return (await this.loadStyles()) + (await this.template());
  }

  /**
   * Create a reference proxy for manipulating DOM elements within the component's shadow DOM
   * @returns {Proxy<HTMLElement | boolean>}
   */
  createRef() {
    return new Proxy(this.refs, {
      get: (target, prop) => {
        const ref = target[prop];
        const elems = this.shadow.querySelectorAll(ref);

        if (elems.length > 1) return elems;

        const element = elems[0];

        if (!element) return ref;

        return element;
      },
      set: (target, prop, value) => {
        this.shadow.querySelector(target[prop]).innerHTML = value;
        return true;
      },
    });
  }

  /**
   * Render the component's HTML and update references
   * @returns {Promise<void>}
   */
  async render() {
    this.shadow.innerHTML = await this.buildHTML();
    this.refs = this.createRef();
    RenderedComponents[this.localName] = this;
  }
}
