// Search component, supports multiple search engines
class Search extends Component {
  // References to DOM elements for the search component
  refs = {
    search: '#search',
    input: '#search input[type="text"]',
    engines: '.search-engines',
    close: '.close',
  };

  /**
   * Initialise the search component with configured engines
   */
  constructor() {
    super();

    this.engines = CONFIG.search.engines;
  }

  /**
   * Define the style for the search component using the current palette
   * @returns {string} CSS styles for the search component
   */
  style() {
    return `
      #search {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(100% - 2px);
          height: 100%;
          background: ${CONFIG.palette.mantle}cc;
          z-index: 99;
          visibility: hidden;
          top: -100%;
          backdrop-filter: blur(5px);
          transition: all .2s ease-in-out;
      }

      #search.active {
          top: 0;
          visibility: visible;
      }

      #search div {
          position: relative;
          width: 100%;
      }

      #search input {
          border: 0;
          outline: 0;
          width: 100%;
          box-shadow: inset 0 -2px ${CONFIG.palette.crust};
          padding: .5em 0;
          background: none;
          font: 500 22px 'Roboto', sans-serif;
          letter-spacing: 1px;
          color: ${CONFIG.palette.lavender};
      }

      #search input:focus {
          box-shadow: inset 0 -2px ${CONFIG.palette.lavender};
      }

      #search input::selection {
          background: ${CONFIG.palette.overlay2};
          color: ${CONFIG.palette.base};
      }

      #search .close {
          background: 0;
          border: 0;
          outline: 0;
          color: ${CONFIG.palette.lavender};
          position: absolute;
          right: 0;
          cursor: pointer;
          top: 15px;
      }

      #search .close:hover {
          filter: opacity(.5);
      }

      .search-engines {
          list-style: none;
          color: ${CONFIG.palette.overlay1};
          display: flex;
          padding: 0;
          top: 50px;
          left: 0;
          margin: 1em 0 0 0;
      }

      .search-engines li p {
          cursor: default;
          transition: all .2s;
          font-size: 12px;
          font-family: 'Roboto', sans-serif;
      }

      .search-engines li {
          margin: 0 1em 0 0;
      }

      .search-engines li.active {
          color: ${CONFIG.palette.lavender};
          font-weight: 700;
      }
    `;
  }

  /**
   * Import required fonts and icons for the search display
   * @returns {Array<string>} Array of resource imports
   */
  imports() {
    return [
      this.getResource('fonts', 'roboto'),
      this.getResource('icons', 'material'),
    ];
  }

  /**
   * Render the search overlay template
   * @returns {string} HTML template for the search component
   */
  template() {
    return `
        <div id="search">
          <div>
            <input type="text" spellcheck="false" placeholder="search">
            <button class="close"><i class="material-icons">&#xE5CD;</i></button>
            <ul class="search-engines"></ul>
          </div>
        </div>
    `;
  }

  /**
   * Load available search engines into the interface
   * @returns {void}
   */
  loadEngines() {
    const html = Object.keys(this.engines)
      .map((key) => `<li><p title="${this.engines[key][1]}">!${key}</p></li>`)
      .join('');
    this.refs.engines.innerHTML = html;
  }

  /**
   * Activate the search overlay
   * @returns {void}
   */
  activate() {
    this.refs.search.classList.add('active');
    this.refs.input.scrollIntoView();
    setTimeout(() => this.refs.input.focus(), 100);
  }

  /**
   * Deactivate the search overlay
   * @returns {void}
   */
  deactivate() {
    this.refs.search.classList.remove('active');
  }

  /**
   * Check if the input is a valid URL
   * @param {string} input - The input string to check
   * @returns {boolean} True if the input is a valid URL
   */
  isValidUrl(input) {
    const urlPatterns = [
      // Domain with TLD (e.g., google.com, github.com)
      /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/,
      // Full URLs with protocol
      /^https?:\/\/.+/,
      // URLs with www prefix
      /^www\..+/,
      // IP addresses
      /^(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/.*)?$/,
      // localhost with optional port
      /^localhost(:\d+)?(\/.*)?$/
    ];

    return urlPatterns.some(pattern => pattern.test(input.trim()));
  }

  /**
   * Format URL for navigation
   * @param {string} url - The URL to format
   * @returns {string} Properly formatted URL with protocol
   */
  formatUrl(url) {
    url = url.trim();

    if (/^https?:\/\//.test(url)) {
      return url;
    }

    if (/^www\./.test(url)) {
      return `https://${url}`;
    }

    if (/^localhost/.test(url) || /^(\d{1,3}\.){3}\d{1,3}/.test(url)) {
      return `http://${url}`;
    }

    return `https://${url}`;
  }

  /**
   * Handle search input and engine selection
   * @param {KeyboardEvent} event - The keyboard event from user input
   * @returns {void}
   */
  handleSearch(event) {
    const { target, key } = event;

    let args = target.value.split(' ');
    let prefix = args[0];

    const defaultEngineKey = CONFIG.search.default || 'd';
    let engine = this.engines[defaultEngineKey]?.[0] || this.engines['d'][0];

    if (key === 'Escape') {
      this.deactivate();
      return;
    }

    // Highlight active engine based on prefix
    this.refs.engines.childNodes.forEach((node) => {
      if (prefix === node.firstChild.innerHTML)
        node.classList.add('active');
      else
        node.classList.remove('active');
    });

    if (key === 'Enter') {
      const fullInput = target.value.trim();

      if (this.isValidUrl(fullInput)) {
        window.location = this.formatUrl(fullInput);
        return;
      }

      // Check for engine prefix (e.g., !g for Google)
      if (prefix.indexOf('!') === 0) {
        engine = this.engines[prefix.substr(1)][0];
        args = args.slice(1);
      }

      window.location = engine + encodeURI(args.join(' '));
    }
  }

  /**
   * Set up event listeners for search interactions
   * @returns {void}
   */
  setEvents() {
    this.refs.search.onkeyup = (e) => this.handleSearch(e);
    this.refs.close.onclick = () => this.deactivate();
  }

  /**
   * Initialise the search component when connected to DOM
   * @returns {void}
   */
  connectedCallback() {
    this.render().then(() => {
      this.loadEngines();
      this.setEvents();
    });
  }
}
