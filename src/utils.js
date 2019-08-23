/**
 * Create new HTML element.
 * @param {HTMLElement} container
 * @param {string} template
 * @param {string} position
 */
const createElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
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
  createElement,
  getRandomValueMinMax,
  compareRandom
};
