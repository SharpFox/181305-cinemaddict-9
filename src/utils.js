/**
 * Create new HTML element.
 * @param {HTMLElement} container
 * @param {string} template
 * @param {string} position
 */
const createElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

export {
  createElement
};
