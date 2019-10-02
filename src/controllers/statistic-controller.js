import Statistic from '../components/statistic.js';
import {
  addElementDOM,
  removeContainerChildren
} from '../utils.js';

/**
 * Class representaing controller of statistic.
 */
class StatisticController {
  /**
   * Create statistic controller.
   * @param {object} data
   * @param {HTMLElement} statisticContainer
   */
  constructor(data, statisticContainer) {
    this._data = data;
    this._statisticContainer = statisticContainer;
    this._statisticComponent = null;

    this.onUpdateStatistic = this.onUpdateStatistic.bind(this);
  }

  /**
   * Create statistic.
   */
  init() {
    this._addStatistic(this._data.statisticFiltersId.allTime);
  }

  /**
   * Add statistic to DOM and fill handlers.
   * @param {string} filter
   */
  _addStatistic(filter) {
    this._statisticComponent = new Statistic(this._data, this._statisticContainer,
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
