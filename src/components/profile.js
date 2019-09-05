
import {
  getProfileTemplate
} from './profile-template.js';
import {
  createElement,
  removeElement
} from '../utils.js';

/**
 * Class representaing profile.
 */
class Profile {
  /**
   * Create profile.
   * @param {number} userRating
   */
  constructor(userRating) {
    this._userRating = userRating;
    this._element = null;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getProfileTemplate(this._userRating);
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

export default Profile;
