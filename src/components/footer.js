
import AbstractComponent from './abstract-component.js';
import {
  getTotalFilmsCards
} from '../data.js';
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
   */
  constructor() {
    super();
    this._countFilmCards = getTotalFilmsCards();
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
