// Theme detection utility to switch between light and dark themes based on system preferences
// Export functions to detect and handle system theme changes

/**
 * Detects the user's system colour scheme preference
 * @param {Object} lightTheme - The theme to use when in light mode
 * @param {Object} darkTheme - The theme to use when in dark mode
 * @returns {Object} The appropriate theme based on system preference
 */
function getSystemTheme(lightTheme, darkTheme) {
  // Check if the browser supports prefers-colour-scheme media query
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode detected
    return darkTheme;
  } else {
    // Light mode detected
    return lightTheme;
  }
}

/**
 * Sets up a listener for system theme changes
 * @param {Object} lightTheme - The theme to use when in light mode
 * @param {Object} darkTheme - The theme to use when in dark mode
 * @param {Function} onThemeChange - Callback for when the theme changes
 * @returns {void}
 */
function initThemeListener(lightTheme, darkTheme, onThemeChange) {
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', (e) => {
      const newTheme = e.matches ? darkTheme : lightTheme;
      onThemeChange(newTheme);
    });
  }
}

/**
 * Initialise theme system with auto-updating capabilities
 * @param {Object} lightTheme - The theme to use when in light mode
 * @param {Object} darkTheme - The theme to use when in dark mode
 * @param {Function} onThemeChange - Optional callback for when the theme changes
 * @returns {Object} The current theme based on system preference
 */
function initThemeSystem(lightTheme, darkTheme, onThemeChange = null) {
  // Get initial theme
  const initialTheme = getSystemTheme(lightTheme, darkTheme);

  // Set up listener with default page reload if no callback provided
  if (onThemeChange) {
    initThemeListener(lightTheme, darkTheme, onThemeChange);
  } else {
    // Default to page reload if no callback specified
    initThemeListener(lightTheme, darkTheme, () => {
      window.location.reload();
    });
  }

  return initialTheme;
}
