
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
   * @param {number} userTotalRating
   */
  constructor(userTotalRating) {
    super();
    this._userTotalRating = userTotalRating;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getProfileTemplate(this._userTotalRating);
  }
}

export default Profile;
