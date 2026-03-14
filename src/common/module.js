// Module for registering all startpage components as custom elements
// Ensures that only enabled components are registered, based on the configuration

// Map of component tag names to their corresponding classes
const components = {
  "search-bar": Search,
  "todo-list": Todo,
  "status-bar": Statusbar,
  "crypto-rate": Crypto,
  "crypto-popup": CryptoPopup,
  "crypto-diff": CryptoDiff,
  "current-time": Clock,
  "weather-forecast": Weather,
  "tabs-list": Tabs,
  "modal-popup": Modal,
};

// Register each component as a custom element if it's not disabled
Object.keys(components).forEach((componentName) => {
  if (!CONFIG.disabled.includes(componentName)) customElements.define(componentName, components[componentName]);
});
