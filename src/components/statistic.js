
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
   * @param {number} userTotalRating
   * @param {array} filters
   * @param {array} textList
   */
  constructor(userTotalRating, filters, textList) {
    super();
    this._userTotalRating = userTotalRating;
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
