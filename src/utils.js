const KEYS = {
  'ESC': 27,
  'ENTER': 13
};

/**
 * Add new HTML element.
 * @param {HTMLElement} container
 * @param {HTMLElement} template
 */
const addElement = (container, template) => {
  container.appendChild(template);
};

/**
 * Create new HTML element.
 * @param {string} template
 * @return {HTMLElement}
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement;
};

/**
 * Remove element.
 * @param {HTMLElement} element
 * @return {null}
 */
const removeElement = (element) => {
  element = null;
  return element;
};

/**
 * Return a random number including min and max.
 *
 * @param {number} min
 * @param {number} max
 * @param {number} roundingNumber
 * @return {number}
 */
const getRandomValueMinMax = (min, max, roundingNumber = 0) => {
  return +(Math.random() * (max - min)).toFixed(roundingNumber) + min;
};

/**
 * Return random number of compaire.
 *
 * @return {number}
 */
const compareRandom = () => {
  return Math.random() - 0.5;
};

export {
  KEYS,
  addElement,
  createElement,
  removeElement,
  getRandomValueMinMax,
  compareRandom
};
