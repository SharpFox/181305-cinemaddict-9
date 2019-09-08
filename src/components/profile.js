
import {
  getProfileTemplate
} from './profile-template.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing profile.
 * @extends AbstractComponent
 */
class Profile extends AbstractComponent {
  /**
   * Create profile.
   * @param {number} userRating
   */
  constructor(userRating) {
    super();
    this._userRating = userRating;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getProfileTemplate(this._userRating);
  }
}

export default Profile;
