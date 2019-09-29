
import moment from 'moment';
import Chart from 'chart.js';
import chartDataLabels from 'chartjs-plugin-datalabels';
import AbstractComponent from './abstract-component.js';
import {
  KEYS,
  BAR_HEIGHT
} from '../utils.js';
import {
  getUniqueGenres,
  getUserTotalRank,
  getWatchedFilmsAmount,
  getTotalDuration,
  getTopGenre,
  statisticFiltersId
} from '../data.js';
import {
  getStatisticTemplate
} from './statistic-template.js';

/**
 * Class representaing statistic.
 * @extends AbstractComponent
 */
class Statistic extends AbstractComponent {
  /**
   * Create statistic.
   * @param {HTMLElement} statisticContainer
   * @param {string} filter
   * @param {function} onUpdateStatistic
   */
  constructor(statisticContainer, filter, onUpdateStatistic) {
    super();
    this._userTotalRating = getUserTotalRank();
    this._statisticParams = this._getStatisticParams(filter);
    this._onUpdateStatistic = onUpdateStatistic;
    this._filter = filter;
    this._barHeight = BAR_HEIGHT;
    this._statisticContainer = statisticContainer;

    this._filterStatistic = null;
    this._onFilterStatistic = this._onFilterStatistic.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getStatisticTemplate(this);
  }

  /**
   * Save the function for selecting of films.
   * @param {function} fn
   */
  set filterStatistic(fn) {
    this._filterStatistic = fn;
  }

  /**
   * Render chart.
   * @return {object}
   */
  renderChart() {
    const boundaryUserDate = this._getBoundaryUserDate(this._filter);
    let uniqueGenres = Object.entries(getUniqueGenres(boundaryUserDate));
    const statisticChartContainer =
      this._statisticContainer
      .querySelector(`.statistic__chart`);
    statisticChartContainer.height =
      this._barHeight * uniqueGenres.length;
    uniqueGenres = uniqueGenres.sort(([, b], [, d]) => d - b);
    const mainData = {
      genres: uniqueGenres.map((genre) => `${genre[0]}  ${genre[1]} `),
      filmsAmount: uniqueGenres.map((genre) => genre[1])
    };

    return new Chart(statisticChartContainer,
        this._getChartSetting(mainData));
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    if (element === null) {
      element = this._element;
    }
    if (element === null) {
      return;
    }
    this._bindOnFilterStatistic(element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    if (element === null) {
      element = this._element;
    }
    if (element === null) {
      return;
    }
    this._unbindOnFilterStatistic(element);
  }

  /**
   * Add events for filter statistic.
   * @param {DocumentFragment} element
   */
  _bindOnFilterStatistic(element) {
    const formContainer = element.querySelector(`.statistic__filters`);
    if (formContainer !== null) {
      formContainer.addEventListener(`change`, this._onFilterStatistic);
      formContainer.addEventListener(`keydown`, this._onFilterStatistic);
    }
  }

  /**
   * Remove events for filter statistic.
   * @param {DocumentFragment} element
   */
  _unbindOnFilterStatistic(element) {
    const formContainer = element.querySelector(`.statistic__filters`);
    if (formContainer !== null) {
      formContainer.removeEventListener(`change`, this._onFilterStatistic);
      formContainer.removeEventListener(`keydown`, this._onFilterStatistic);
    }
  }

  /**
   * Call the function for selecting films.
   * @param {event} evt
   */
  _onFilterStatistic(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `change`) {
      this._onUpdateStatistic(this._getNewFilterForm());
    }
  }

  /**
   * Return statistic params.
   * @param {string} filter
   * @return {object}
   */
  _getStatisticParams(filter) {
    const boundaryUserDate = this._getBoundaryUserDate(filter);
    return {
      totalWatchedFilms: getWatchedFilmsAmount(boundaryUserDate),
      totalDuration: getTotalDuration(boundaryUserDate),
      topGenre: getTopGenre(boundaryUserDate)
    };
  }

  /**
   * Return boundary date for render statistic
   * by filter.
   * @param {string} filter
   * @return {date}
   */
  _getBoundaryUserDate(filter) {
    let boundaryUserDate = null;
    if (filter === statisticFiltersId.today) {
      boundaryUserDate = moment().startOf(`day`).toDate();
    } else if (filter === statisticFiltersId.week) {
      boundaryUserDate = moment().startOf(`isoWeek`).toDate();
    } else if (filter === statisticFiltersId.month) {
      boundaryUserDate = moment().startOf(`month`).toDate();
    } else if (filter === statisticFiltersId.year) {
      boundaryUserDate = moment().startOf(`year`).toDate();
    }

    return boundaryUserDate;
  }

  /**
   * Return setting for chart.
   * @param {object} mainData
   * @return {object}
   */
  _getChartSetting(mainData) {
    return {
      plugins: [chartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: mainData.genres,
        datasets: [{
          data: mainData.filmsAmount,
          backgroundColor: `#FFE800`,
          hoverBackgroundColor: `#FFE800`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 0
            },
            color: `#000000`
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#FFFFFF`,
              padding: 5,
              fontSize: 17,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 30
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    };
  }

  /**
   * Return new filter from form.
   * @return {object}
   */
  _getNewFilterForm() {
    const formData = new FormData(document.querySelector(`.statistic__filters`));
    return this._processForm(formData);
  }

  /**
   * Return new filter.
   * @param {FormData} formData
   * @return {object}
   */
  _processForm(formData) {
    const newFilter = {
      type: null
    };

    const filmCardMapper = this._createMapper(newFilter);
    for (const [key, value] of formData) {
      if (filmCardMapper[key]) {
        filmCardMapper[key](value);
      }
    }

    return newFilter.type;
  }

  /**
   * Create map of object.
   * @param {string} newFilter
   * @return {object}
   */
  _createMapper(newFilter) {
    return {
      'statistic-filter': (value) => {
        newFilter.type = value;
      }
    };
  }
}

export default Statistic;
