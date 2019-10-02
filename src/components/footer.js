
import AbstractComponent from './abstract-component.js';
import {
  getFooterTemplate
} from './footer-template.js';

/**
 * Class representaing footer.
 * @extends AbstractComponent
 */
class Footer extends AbstractComponent {
  /**
   * Create footer.
   * @param {object} data
   */
  constructor(data) {
    super();
    this._countFilmCards = data.getTotalFilmsCards();
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFooterTemplate(this);
  }
}

export default Footer;
