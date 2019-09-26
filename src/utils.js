import moment from 'moment';

const KEYS = {
  'ESC': 27,
  'ENTER': 13
};

const METHODS = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
const ANIMATION_TIMEOUT = 600;
const DEFAULT_FILM_ID = -1;

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

/**
 * Return response, if code >= 200 or < 300, else
 * throws error.
 * @param {ArrayBuffer|Blob|Document} response
 * @return {ArrayBuffer|Blob|Document}
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

/**
 * Return json from responce of request.
 * @param {ArrayBuffer|Blob|Document} response
 * @return {json}
 */
const toJSON = (response) => {
  return response.json();
};

/**
 * Return value of authorization by server.
 * @return {string}
 */
const getAuthorizationValue = () => {
  let result = ``;
  const words = `0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM`;
  const maxPosition = words.length - 1;
  let position = 0;
  for (let i = 0; i < 15; i++) {
    position = Math.floor(Math.random() * maxPosition);
    result += words.substring(position, position + 1);
  }

  return `Basic ${result}`;
};

export {
  KEYS,
  METHODS,
  END_POINT,
  ANIMATION_TIMEOUT,
  DEFAULT_FILM_ID,
  createElement,
  getRandomValueMinMax,
  compareRandom,
  addElementDOM,
  removeElementDOM,
  updateElementDOM,
  removeContainerChildren,
  cloneDeep,
  getDuration,
  checkStatus,
  toJSON,
  getAuthorizationValue
};
