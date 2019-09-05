
import {
  getMainNavigationTemplate
} from './main-navigation-template.js';
import {
  createElement,
  removeElement
} from '../utils.js';

/**
 * Class representaing main navigation.
 */
class MainNavigation {
  /**
   * Create main navigation.
   * @param {array} menuTypes
   */
  constructor(menuTypes) {
    this._menuTypes = menuTypes;
    this._element = null;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getMainNavigationTemplate(this._menuTypes);
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

export default MainNavigation;
