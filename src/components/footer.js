
import {
  getFooterTemplate
} from './footer-template.js';
import {
  createElement,
  removeElement
} from '../utils.js';

/**
 * Class representaing footer.
 */
class Footer {
  /**
   * Create footer.
   * @param {number} countFilmCards
   */
  constructor(countFilmCards) {
    this._countFilmCards = countFilmCards;
    this._element = null;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFooterTemplate(this._countFilmCards);
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

export default Footer;
