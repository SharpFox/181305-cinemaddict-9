import moment from 'moment';

const KEYS = {
  ESC: 27,
  ENTER: 13
};

const METHODS = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const END_POINT = `https://htmlacademy-es-9.appspot.com/cinemaddict`;
const DEFAULT_ID = -1;
const MIN_SEARCH_LENGTH = 3;
const BAR_HEIGHT = 55;
const HOUR_MS = 3600000;
const MINUTE_MS = 60000;
const FILMS_CARDS_STEP = 5;
const ANIMATION_TIMEOUT = 600;
const AUTHORIZATION_VALUE_LENGTH = 15;

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
  return JSON.parse(JSON.stringify(oldObject), restoreDate);
};

/**
 * Return result of restoring date.
 * @param {string} key
 * @param {string} value
 * @return {date}
 */
const restoreDate = (key, value) => {
  if (key === `date`
    || key === `userWatchingDate`
    || key === `year`) {
    return moment(value).toDate();
  }

  return value;
};

/**
 * Return duration.
 * @param {number} duration
 * @return {string}
 */
const getDuration = (duration) => {
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
  const symbols =
    `0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM`;
  const maxPosition = symbols.length - 1;
  let position = 0;
  for (let i = 0; i < AUTHORIZATION_VALUE_LENGTH; i++) {
    position = Math.floor(Math.random() * maxPosition);
    result += symbols.substring(position, position + 1);
  }

  return `Basic ${result}`;
};

/**
 * Remove HTML символы from string.
 * @param {string} HTMLString
 * @return {string}
 */
const doEscapeHTML = (HTMLString) => {
  const newElement = document.createElement(`div`);
  const newTextNode = document.createTextNode(HTMLString);

  return newElement.appendChild(newTextNode).parentNode.innerHTML;
};


/**
 * Add error color for background of container.
 * @param {HTMLElement} container
 */
const addErrorBackground = (container) => {
  container.style.backgroundColor = `#ff0000`;
};

/**
 * Delete error color for background of container.
 * @param {HTMLElement} container
 */
const deleteErrorBackground = (container) => {
  container.style.backgroundColor = ``;
};

/**
 * Add error color for border of container.
 * @param {HTMLElement} currentContainer
 */
const addErrorBorder = (currentContainer) => {
  currentContainer.style.borderColor = `#ff0000`;
  currentContainer.style.borderWidth = `1px`;
  currentContainer.style.borderStyle = `solid`;
};

/**
 * Delete error color for border of container.
 * @param {HTMLElement} currentContainer
 */
const deleteErrorBorder = (currentContainer) => {
  currentContainer.style.borderColor = ``;
  currentContainer.style.borderWidth = `0px`;
  currentContainer.style.borderStyle = ``;
};

/**
 * Block container for posting to server.
 * @param {HTMLElement} currentContainer
 */
const blockContainer = (currentContainer) => {
  currentContainer.disabled = true;
};

/**
 * Unblock container for posting to server.
 * @param {HTMLElement} currentContainer
 */
const unblockContainer = (currentContainer) => {
  currentContainer.disabled = false;
};

/**
 * Draw animation for error from server.
 * @param {string} currentContainer
 */
const shake = (currentContainer) => {
  currentContainer.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

  setTimeout(() => {
    currentContainer.style.animation = ``;
  }, ANIMATION_TIMEOUT);
};

export {
  KEYS,
  METHODS,
  END_POINT,
  DEFAULT_ID,
  MIN_SEARCH_LENGTH,
  BAR_HEIGHT,
  HOUR_MS,
  MINUTE_MS,
  FILMS_CARDS_STEP,
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
  getAuthorizationValue,
  doEscapeHTML,
  addErrorBackground,
  deleteErrorBackground,
  addErrorBorder,
  deleteErrorBorder,
  blockContainer,
  unblockContainer,
  shake
};
