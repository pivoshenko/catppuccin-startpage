const { parse, stringify } = JSON;

/**
 * Utility for querying DOM elements using document.querySelector(All)
 * Returns a single element or an array, depending on the options provided
 * @param {string} e - CSS selector string
 * @param {Object} options - Query options object
 * @param {boolean} options.includeAll - Whether to return all matching elements
 * @returns {HTMLElement | Array<HTMLElement>} Single element or array of elements
 */
const $ = (e, options) => {
  const elems = document.querySelectorAll(e);
  if (options?.includeAll || elems.length > 1) return elems;
  return elems[0];
};

