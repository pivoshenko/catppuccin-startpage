/**
 * Storage provides a simple wrapper for localStorage access for configuration and state.
 */
class Storage {
  key;

  /**
   * @param {string} key - The localStorage key to use for this storage instance.
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieve a property from the stored object.
   * @param {string} prop
   * @returns {*}
   */
  get(prop) {
    return parse(localStorage[this.key])[prop];
  }

  /**
   * Save a value to localStorage under the configured key.
   * @param {*} value
   */
  save(value) {
    localStorage[this.key] = value;
  }

  /**
   * Check if a value exists in the stored object.
   * @param {string} value
   * @returns {boolean}
   */
  hasValue(value) {
    if (!localStorage[this.key]) return false;
    return value in parse(localStorage[this.key]);
  }
}
