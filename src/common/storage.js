/**
 * Storage provides a simple wrapper for localStorage access for configuration and state
 */
class Storage {
  // The localStorage key for this storage instance
  key;

  /**
   * Initialise storage with a specific localStorage key
   * @param {string} key - The localStorage key to use for this storage instance
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieve a property from the stored object
   * @param {string} prop - The property name to retrieve
   * @returns {*} The value of the requested property
   */
  get(prop) {
    return parse(localStorage[this.key])[prop];
  }

  /**
   * Save a value to localStorage under the configured key
   * @param {*} value - The value to store
   * @returns {void}
   */
  save(value) {
    localStorage[this.key] = value;
  }

  /**
   * Check if a value exists in the stored object
   * @param {string} value - The property name to check for existence
   * @returns {boolean} Whether the property exists in storage
   */
  hasValue(value) {
    if (!localStorage[this.key]) return false;
    return value in parse(localStorage[this.key]);
  }
}
