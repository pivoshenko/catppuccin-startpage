// Registers all startpage components as custom elements
// Components listed as disabled in the configuration are skipped

const components = {
  "search-bar": Search,
  "status-bar": Statusbar,
  "current-time": Clock,
  "weather-forecast": Weather,
  "tabs-list": Tabs,
};

Object.keys(components).forEach((componentName) => {
  if (!CONFIG.disabled.includes(componentName)) customElements.define(componentName, components[componentName]);
});
