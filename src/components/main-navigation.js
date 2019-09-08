
import {
  getMainNavigationTemplate
} from './main-navigation-template.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing main navigation.
 * @extends AbstractComponent
 */
class MainNavigation extends AbstractComponent {
  /**
   * Create main navigation.
   * @param {array} menuTypes
   */
  constructor(menuTypes) {
    super();
    this._menuTypes = menuTypes;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getMainNavigationTemplate(this._menuTypes);
  }
}

export default MainNavigation;
