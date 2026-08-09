/**
 * WeatherForecastClient fetches and parses weather data for a given location
 * from the OpenWeatherMap API
 */
class WeatherForecastClient {
  /**
   * Create a new WeatherForecastClient instance
   * @param {string} location - The location to fetch weather data for
   * @param {string} appId - OpenWeatherMap API key (optional)
   */
  constructor(location, appId) {
    this.appId = appId;
    this.location = location;
    // Construct API URL with location and metric units (only if we have a key)
    this.url = appId
      ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(location)}&units=metric&appid=${appId}`
      : null;
  }

  /**
   * Fetch and return the current weather for the configured location
   * Resolves to null when no API key is configured.
   * @returns {Promise<{temperature: number, condition: string} | null>}
   */
  async getWeather() {
    if (!this.url) return null;

    return await fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        // Round temperature to nearest whole number
        const temperature = Math.round(data.main.temp);
        // Extract and normalise weather condition
        const condition = data.weather[0].main.toLowerCase();

        return {
          temperature,
          condition,
        };
      })
      .catch((err) => {
        console.warn("Weather API returned an error:", err);
        return null;
      });
  }
}
