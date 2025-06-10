
// Weather component displays current weather information with temperature and condition icons
class Weather extends Component {
  // DOM element selectors for weather display elements
  refs = {
    temperature: ".weather-temperature-value",
    condition: ".weather-condition-icon",
    scale: ".weather-temperature-scale",
  };

  // Weather condition mappings to Material Design icons and colours
  forecasts = [
    {
      conditions: ["clouds", "mist", "haze", "smoke"],
      icon: "cloud_queue",
      color: "cloudy",
    },
    {
      conditions: ["drizzle", "snow", "rain"],
      icon: "opacity",
      color: "cloudy",
    },
    {
      conditions: ["clear"],
      icon: "wb_sunny",
      color: "sunny",
    },
    {
      conditions: ["thunderstorm"],
      icon: "bolt",
      color: "cloudy",
    },
  ];

  location;

  /**
   * Initialise the weather component
   */
  constructor() {
    super();

    this.setDependencies();
    this.setEvents();
  }

  /**
   * Set up event handlers for the component
   */
  setEvents() {
    // Click handler to swap temperature scale
    this.onclick = this.swapScale;
  }

  /**
   * Configure component dependencies and initial state
   */
  setDependencies() {
    this.location = CONFIG.temperature.location;
    this.temperatureScale = CONFIG.temperature.scale;
    this.weatherForecast = new WeatherForecastClient(this.location);
  }

  /**
   * Define required external resources
   * @returns {Array} Array of resource imports
   */
  imports() {
    return [this.getIconResource('material'), this.getFontResource('roboto')];
  }

  /**
   * Generate CSS styles for the weather component
   * @returns {string} CSS style definitions
   */
  style() {
    return `
      .weather-icon {
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
      }

      .weather-temperature {
          font: 300 9pt 'Roboto', sans-serif;
          color: ${CONFIG.palette.text};
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
      }

      .weather-temperature:hover .weather-temperature-location {
          display: inline-block;
      }

      .weather-temperature-location {
          display: none;
          margin-right: 10px;
      }

      .weather-temperature-location {
          font-weight: 500;
      }

      .weather-temperature-value
      {
          font-weight: bold;
      }

      .weather-condition-icon {
          font-size: 14pt;
          line-height: 0;
      }

      .weather-condition-icon.sunny {
          color: ${CONFIG.palette.yellow};
      }

      .weather-condition-icon.cloudy {
          color: ${CONFIG.palette.blue};
      }
    `;
  }

  /**
   * Generate the HTML template for the weather component
   * @returns {Promise<string>} HTML template string
   */
  async template() {
    return `
        <p class="+ weather-temperature">
            <span class="weather-icon" class="+"><i class="material-icons weather-condition-icon sunny">wb_sunny</i></span>
            <span class="weather-temperature-location">${this.location}</span>
            <span class="weather-temperature-value">1</span>
            º<span class="weather-temperature-scale">${this.temperatureScale}</span>
        </p>`;
  }

  /**
   * Convert Fahrenheit to Celsius
   * @param {number} f Temperature in Fahrenheit
   * @returns {number} Temperature in Celsius
   */
  toC(f) {
    return Math.round(((f - 32) * 5) / 9);
  }

  /**
   * Convert Celsius to Fahrenheit
   * @param {number} c Temperature in Celsius
   * @returns {number} Temperature in Fahrenheit
   */
  toF(c) {
    return Math.round((c * 9) / 5 + 32);
  }

  /**
   * Toggle temperature scale between Celsius and Fahrenheit
   */
  swapScale() {
    // Toggle between C and F
    this.temperatureScale = this.temperatureScale === "C" ? "F" : "C";

    // Update configuration with new scale
    CONFIG.temperature = {
      ...CONFIG.temperature,
      scale: this.temperatureScale,
    };

    // Update displayed temperature with new scale
    this.setTemperature();
  }

  /**
   * Convert temperature to the currently selected scale
   * @param {number} temperature Temperature value in Celsius
   * @returns {number} Temperature in selected scale
   */
  convertScale(temperature) {
    // Convert to Fahrenheit if selected, otherwise return Celsius
    if (this.temperatureScale === "F") return this.toF(temperature);

    return temperature;
  }

  /**
   * Fetch weather data and update display
   */
  async setWeather() {
    this.weather = await this.weatherForecast.getWeather();
    this.setTemperature();
  }

  /**
   * Update temperature and condition display elements
   */
  setTemperature() {
    const { temperature, condition } = this.weather;
    const { icon, color } = this.getForecast(condition);

    // Update DOM elements with weather data
    this.refs.temperature = this.convertScale(temperature);
    this.refs.condition = icon;
    this.refs.scale = this.temperatureScale;
    // Apply colour class for condition icon
    this.refs.condition.classList.add(color);
  }

  /**
   * Find matching forecast configuration for weather condition
   * @param {string} condition Weather condition from API
   * @returns {Object} Forecast configuration with icon and colour
   */
  getForecast(condition) {
    // Find matching forecast or fall back to first (cloudy)
    for (const forecast of this.forecasts) if (forecast.conditions.includes(condition)) return forecast;

    return this.forecasts[0];
  }

  /**
   * Component lifecycle method called when element is connected to DOM
   */
  async connectedCallback() {
    // Render component template
    await this.render();
    // Fetch and display weather data
    await this.setWeather();
  }
}
