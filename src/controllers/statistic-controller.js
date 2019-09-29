import Statistic from '../components/statistic.js';
import {
  addElementDOM,
  removeContainerChildren
} from '../utils.js';
import {
  statisticFiltersId
} from '../data.js';

/**
 * Class representaing controller of statistic.
 */
class StatisticController {
  /**
   * Create statistic controller.
   * @param {HTMLElement} statisticContainer
   */
  constructor(statisticContainer) {
    this._statisticContainer = statisticContainer;
    this._statisticComponent = null;

    this.onUpdateStatistic = this.onUpdateStatistic.bind(this);
  }

  /**
   * Create statistic.
   */
  init() {
    this._addStatistic(statisticFiltersId.allTime);
  }

  /**
   * Add statistic to DOM and fill handlers.
   * @param {string} filter
   */
  _addStatistic(filter) {
    this._statisticComponent = new Statistic(this._statisticContainer,
        filter, this.onUpdateStatistic);
    addElementDOM(this._statisticContainer, this._statisticComponent);
    this._statisticComponent.renderChart();
  }

  /**
   * Filter statistic.
   * @param {string} newFilter
   */
  onUpdateStatistic(newFilter) {
    removeContainerChildren(this._statisticContainer);
    this._statisticComponent.unrender();
    this._addStatistic(newFilter);
  }
}

export default StatisticController;
