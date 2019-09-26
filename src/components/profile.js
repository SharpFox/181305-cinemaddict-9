
import {
  getProfileTemplate
} from './profile-template.js';
import {
  getUserTotalRank
} from '../data.js';
import AbstractComponent from './abstract-component.js';

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
