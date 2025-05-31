// Provides actions for activating startpage components by name
class Actions {
  /**
   * Activate a registered component by its name
   * @param {string} componentName
   * @returns {*}
   */
  static activate(componentName) {
    return RenderedComponents[componentName].activate();
  }
}
