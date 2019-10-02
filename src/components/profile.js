
import AbstractComponent from './abstract-component.js';
import {
  removeContainerChildren
} from '../utils.js';
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
   * @param {object} data
   * @param {HTMLElement} profileContainer
   */
  constructor(data, profileContainer) {
    super();
    this._profileContainer = profileContainer;
    this._userTotalRating = data.getUserTotalRank();
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getProfileTemplate(this);
  }

  /**
   * Rerender component.
   */
  rerender() {
    this.unrender();
    removeContainerChildren(this._profileContainer);
    this.init();
  }
}

export default Profile;
