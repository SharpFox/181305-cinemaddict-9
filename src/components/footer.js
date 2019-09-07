
import {
  getFooterTemplate
} from './footer-template.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing footer.
 * @extends AbstractComponent
 */
class Footer extends AbstractComponent {
  /**
   * Create footer.
   * @param {number} countFilmCards
   */
  constructor(countFilmCards) {
    super();
    this._countFilmCards = countFilmCards;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFooterTemplate(this._countFilmCards);
  }
}

export default Footer;
