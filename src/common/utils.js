const { parse, stringify } = JSON;

/**
 * Utility for querying DOM elements using document.querySelector(All).
 * Returns a single element or an array, depending on the options provided.
 * @returns {HTMLElement | Array<HTMLElement>}
 */
const $ = (e, options) => {
  const elems = document.querySelectorAll(e);
  if (options?.includeAll || elems.length > 1) return elems;
  return elems[0];
};

/**
 * Return all child elements of a parent node as an array.
 * @returns {Array<HTMLElement>}
 */
Element.prototype.nodes = function () {
  return Array.prototype.slice.call(this.children);
};
