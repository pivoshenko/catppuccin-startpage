// Clock component for displaying main time and additional timezone clocks
class Clock extends Component {
  refs = {
    clockContainer: ".clock-container",
    icon: ".clock-icon",
    mainClockTime: "#main-clock .clock-time",
  };

  /**
   * Initialise the clock component
   */
  constructor() {
    super();
  }

  /**
   * Import required fonts and icons for the clock display
   * @returns {Array<string>} Array of resource imports
   */
  imports() {
    return [this.getResource('icons', 'material'), this.getResource('fonts', 'roboto')];
  }

  /**
   * Define the style for the clock component using the current palette
   * @returns {string} CSS styles for the clock component
   */
  style() {
    return `
        .clock-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            height: 100%;
            min-height: 32px;
        }

        .clock-time {
            white-space: nowrap;
            font: 300 9pt 'Roboto', sans-serif;
            color: ${CONFIG.palette.text};
            letter-spacing: .5px;
            margin: 0;
        }

        .clock-label {
            font: 300 9pt 'Roboto', sans-serif;
            color: ${CONFIG.palette.text};
            margin-right: 2px;
            letter-spacing: .5px;
            white-space: nowrap;
        }

        .clock-wrapper {
            display: flex;
            align-items: center;
            position: relative;
            height: 100%;
        }

        .clock-icon {
            font-size: 10pt;
            margin-right: 5px;
            transform: translateY(-0.5px);
        }

        .clock-item {
            display: flex;
            align-items: center;
            height: 100%;
        }
    `;
  }

  /**
   * Render the clock icon and time template
   * @returns {string} HTML template for the clock component
   */
  template() {
    return `
        <div class="clock-container">
            <div class="clock-wrapper">
                <span class="material-icons clock-icon">schedule</span>
                <div id="main-clock" class="clock-item">
                    <p class="clock-time"></p>
                </div>
            </div>
            ${this.renderAdditionalClocks()}
        </div>
    `;
  }

  /**
   * Render additional clocks if configured
   * @returns {string} HTML for additional timezone clocks
   */
  renderAdditionalClocks() {
    if (!CONFIG.additionalClocks || !CONFIG.additionalClocks.length) {
      return '';
    }

    return CONFIG.additionalClocks.map((clock, index) => {
      return `
        <div class="clock-wrapper">
            <span class="material-icons clock-icon additional-icon-${index}">public</span>
            <div id="additional-clock-${index}" class="clock-item">
                <span class="clock-label">${clock.label || clock.timezone}</span>
                <p class="clock-time"></p>
            </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Set the icon colour based on the configuration
   * @returns {void}
   */
  setIconColor() {
    if (this.shadow) {
      const mainIcon = this.shadow.querySelector('.clock-icon:not([class*="additional-icon"])');
      if (mainIcon) {
        mainIcon.style.color = CONFIG.clock.icon_color;
      }

      if (CONFIG.additionalClocks && CONFIG.additionalClocks.length) {
        CONFIG.additionalClocks.forEach((clock, index) => {
          const additionalIcon = this.shadow.querySelector(`.additional-icon-${index}`);
          if (additionalIcon) {
            additionalIcon.style.color = clock.icon_color || CONFIG.clock.icon_color;
          }
        });
      }
    }
  }

  /**
   * Update the displayed time using the configured format
   * @returns {void}
   */
  setTime() {
    if (this.shadow) {
      const mainClockElement = this.shadow.querySelector('#main-clock .clock-time');
      const date = new Date();
      if (mainClockElement) {
        mainClockElement.textContent = date.strftime(CONFIG.clock.format, CONFIG.clock.locale);
      }

      if (CONFIG.additionalClocks && CONFIG.additionalClocks.length) {
        CONFIG.additionalClocks.forEach((clock, index) => {
          const clockElement = this.shadow.querySelector(`#additional-clock-${index} .clock-time`);
          if (clockElement) {
            let timezoneDate;

            // Use IANA timezone name when provided; otherwise fall back to local time
            if (clock.timezone) {
              timezoneDate = Date.createWithTimezone(clock.timezone);
            } else {
              timezoneDate = new Date();
            }

            clockElement.textContent = timezoneDate.strftime(clock.format || CONFIG.clock.format, clock.locale || CONFIG.clock.locale);
          }
        });
      }
    }
  }

  /**
   * Initialise the clock and update every second
   * @returns {void}
   */
  /**
   * Schedule the next tick aligned to the start of the next full second
   * to avoid drift from setInterval slop.
   * @returns {void}
   */
  scheduleNextTick() {
    const delay = 1000 - (Date.now() % 1000);
    setTimeout(() => {
      this.setTime();
      this.scheduleNextTick();
    }, delay);
  }

  connectedCallback() {
    this.render().then(() => {
      setTimeout(() => {
        this.setTime();
        this.setIconColor();
        this.scheduleNextTick();
      }, 100);
    });
  }
}
