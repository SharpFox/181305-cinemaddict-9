
import {
  getSortTemplate
} from './sort-template.js';
import {
  createElement,
  removeElement
} from '../utils.js';

/**
 * Class representaing sort.
 */
class Sort {
  /**
   * Create sort.
   * @param {object} sortType
   */
  constructor(sortType) {
    this._sortType = sortType;
    this._element = null;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getSortTemplate(this._sortType);
  }

  /**
   * Return HTML element.
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
    removeElement(this._element);
  }
}

export default Sort;
