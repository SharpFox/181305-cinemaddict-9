
import AbstractComponent from './abstract-component.js';
import {
  getUserTotalRank
} from '../data.js';
import {
  getProfileTemplate
} from './profile-template.js';

/**
 * Class representaing profile.
 * @extends AbstractComponent
 */
class Profile extends AbstractComponent {
  /**
   * Create profile.
   */
  constructor() {
    super();
    this._userTotalRating = getUserTotalRank();
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getProfileTemplate(this);
  }
}

export default Profile;
