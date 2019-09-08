
import {
  getStatisticTemplate
} from './statistic-template.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing statistic.
 * @extends AbstractComponent
 */
class Statistic extends AbstractComponent {
  /**
   * Create statistic.
   * @param {number} userRating
   * @param {array} filters
   * @param {array} textList
   */
  constructor(userRating, filters, textList) {
    super();
    this._userRating = userRating;
    this._filters = filters;
    this._textList = textList;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getStatisticTemplate(this);
  }
}

export default Statistic;
