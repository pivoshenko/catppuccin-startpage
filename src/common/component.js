// Global registry of rendered components
const RenderedComponents = {};

// Base class for all startpage components, providing shadow DOM, resource management, and rendering utilities
// Glossary: Component, Resource, Shadow DOM
class Component extends HTMLElement {
  // Element references for DOM manipulation
  refs = {};

  resources = {
    /** Google Fonts and other web fonts */
    fonts: {
      roboto: '<link href="https://fonts.googleapis.com/css?family=Roboto:100,400,700" rel="stylesheet">',
      nunito: '<link href="https://fonts.googleapis.com/css?family=Nunito:200" rel="stylesheet">',
      raleway: '<link href="https://fonts.googleapis.com/css?family=Raleway:600" rel="stylesheet">',
    },
    /** Icon font libraries */
    icons: {
      material:
        '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">',
      cryptofont: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/monzanifabio/cryptofont/cryptofont.css">',
      tabler: '<link rel="stylesheet" href="src/css/tabler-icons.min.css">',
    },
    /** CSS libraries and frameworks */
    libs: {
      awoo: '<link rel="stylesheet" type="text/css" href="src/css/awoo.min.css">',
    },
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
   * Reference an external CSS file for the component
   * Note: External style loading is not fully supported with web components and may cause flickering
   * @param {string} path
   * @returns {void}
   */
  set stylePath(path) {
    this.resources.style = `<link rel="preload" as="style" href="${path}" onload="this.rel='stylesheet'">`;
  }

  /**
   * Return all the imports that a component requested
   * @returns {Array<string>} imports
   */
  get getResources() {
    const imports = this.imports();

    if (this.resources?.style) imports.push(this.resources.style);

    return imports;
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
