
import {
  getStatisticTemplate
} from './statistic-template.js';
import {
  createElement
} from '../utils.js';

/**
 * Class representaing statistic.
 */
class Statistic {
  /**
   * Create statistic.
   * @param {number} userRating
   * @param {array} filters
   * @param {array} textList
   */
  constructor(userRating, filters, textList) {
    this._userRating = userRating;
    this._filters = filters;
    this._textList = textList;

    this._element = null;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getStatisticTemplate(this);
  }

  /**
   * Return HTML element.
   * @return {DocumentFragment}
   */
  get element() {
    return this._element;
  }

  /**
   * Return result of create new element.
   * @return {HTMLElement}
   */
  render() {
    this._element = createElement(this.template);
    return this._element;
  }

  /**
   * Delete element.
   */
  unrender() {
    this._element = null;
  }

  /**
   * Add events for element.
   */
  bind() {}

  /**
   * Return deep clone of element with listeners.
   * @return {DocumentFragment}
   */
  getCloneElement() {
    const fragment = document.createDocumentFragment();
    for (let node of this._element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }
    return fragment;
  }
}

export default Statistic;
