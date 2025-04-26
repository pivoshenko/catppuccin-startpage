// Module for registering all startpage components as custom elements.
// Ensures that only enabled components are registered, based on the configuration.

const components = {
  "search-bar": Search,
  "status-bar": Statusbar,
  "current-time": Clock,
  "weather-forecast": Weather,
  "tabs-list": Tabs,
};

Object.keys(components).forEach((componentName) => {
  // Register the component as a custom element if it is not disabled in the configuration.
  if (!CONFIG.disabled.includes(componentName)) customElements.define(componentName, components[componentName]);
});
