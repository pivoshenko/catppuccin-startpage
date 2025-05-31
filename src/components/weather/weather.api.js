/**
 * WeatherForecastClient provides weather data for the startpage using OpenWeatherMap API
 * Handles fetching and parsing weather information for a given location
 */
class WeatherForecastClient {
  /**
   * Create a new WeatherForecastClient instance
   * @param {string} location - The location to fetch weather data for
   */
  constructor(location) {
    // OpenWeatherMap API key for authentication
    this.appId = "50a34e070dd5c09a99554b57ab7ea7e2";
    // Construct API URL with location and metric units
    this.url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(location)}&units=metric&appid=${this.appId
      }`;
  }

  /**
   * Fetch and return the current weather for the configured location
   * @returns {Promise<{temperature: number, condition: string}>} Weather data with temperature and condition
   */
  async getWeather() {
    return await fetch(this.url)
      .then((res) => res.json())
      // Convert to string and back to ensure proper JSON parsing
      .then((json) => JSON.stringify(json))
      .then((json) => JSON.parse(json))
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
      .catch((err) => console.warn("Weather API returned an error:", err));
  }
}
