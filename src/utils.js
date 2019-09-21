import moment from 'moment';

const KEYS = {
  'ESC': 27,
  'ENTER': 13
};

/**
 * Add cloned of component element to DOM.
 * @param {HTMLElement} container
 * @param {class} component
 */
const addElementDOM = (container, component) => {
  component.render();
  const cloneElement = component.getCloneElement();
  component.bind(cloneElement);
  container.append(cloneElement);
};

/**
 * Update element in DOM.
 * @param {HTMLElement} oldElement
 * @param {HTMLElement} newElement
 * @param {HTMLElement} container
 * @param {class} component
 */
const updateElementDOM = (oldElement, newElement, container, component) => {
  const cloneElement = component.getCloneElement(newElement);
  component.bind(cloneElement);
  container.replaceChild(cloneElement, oldElement);
};

/**
 * Remove element in DOM.
 * @param {HTMLElement} container
 */
const removeElementDOM = (container) => {
  container.remove();
};

/**
 * Create new HTML element.
 * @param {string} template
 * @return {HTMLElement}
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  const fragment = document.createDocumentFragment();
  const childrenCount = newElement.childNodes.length;
  for (let i = 0; i < childrenCount; i++) {
    fragment.appendChild(newElement.childNodes[0]);
  }
  return fragment;
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

/**
  * Remove children in container.
  * @param {HTMLElement} container
  */
const removeContainerChildren = (container) => {
  const children = container.childNodes;
  const totalChildren = children.length;
  for (let i = 0; i < totalChildren; i++) {
    children[0].remove();
  }
};

/**
 * Return clone of object.
 * @param {object} oldObject
 * @return {object}
 */
const cloneDeep = (oldObject) => {
  return JSON.parse(JSON.stringify(oldObject));
};

/**
 * Return duration.
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 */
const getDuration = (startDate, endDate) => {
  const duration = moment(endDate) - moment(startDate);
  const durationFormat = moment(duration).utcOffset(0).format(`H[h] m[m]`);
  for (let char of durationFormat) {
    if (char === `0`) {
      return durationFormat.substring(2, durationFormat.length);
    }
    break;
  }
  return durationFormat;
};

export {
  KEYS,
  createElement,
  getRandomValueMinMax,
  compareRandom,
  addElementDOM,
  removeElementDOM,
  updateElementDOM,
  removeContainerChildren,
  cloneDeep,
  getDuration
};
