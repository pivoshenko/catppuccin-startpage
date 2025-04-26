// References to DOM elements for the clock component.
class Clock extends Component {
  refs = {
    clock: ".clock-time",
    icon: ".clock-icon",
  };

  constructor() {
    super();
  }

  // Import required fonts and icons for the clock display.
  imports() {
    return [this.resources.icons.material, this.resources.fonts.roboto];
  }

  // Define the style for the clock component using the current palette.
  style() {
    return `
        .clock-time {
            white-space: nowrap;
            font: 300 9pt 'Roboto', sans-serif;
            color: ${CONFIG.palette.text};
            letter-spacing: .5px;
        }

        .clock-icon {
            font-size: 10pt;
            margin-right: 10px;
        }
    `;
  }

  // Render the clock icon and time.
  template() {
    return `
        <span class="material-icons clock-icon">schedule</span>
        <p class="clock-time"></p>
    `;
  }

  // Set the icon color based on the configuration.
  setIconColor() {
    this.refs.icon.style.color = CONFIG.clock.icon_color;
  }

  // Update the displayed time using the configured format.
  setTime() {
    const date = new Date();
    this.refs.clock = date.strftime(CONFIG.clock.format);
  }

  // Initialise the clock and update every second.
  connectedCallback() {
    this.render().then(() => {
      this.setTime();
      this.setIconColor();
      setInterval(() => this.setTime(), 1000);
    });
  }
}
