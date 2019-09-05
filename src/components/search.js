import {
  getSearchTemplate
} from './search-template.js';
import {
  createElement,
  removeElement
} from '../utils.js';

/**
 * Class representaing profile.
 */
class Search {
  /**
   * Create search.
   */
  constructor() {
    this._element = null;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getSearchTemplate(this);
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

export default Search;
