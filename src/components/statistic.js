
import AbstractComponent from './abstract-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  getStatisticTemplate
} from './statistic-template.js';
import {
  KEYS
} from '../utils.js';
import {
  getUniqueGenres,
  getUserTotalRank
} from '../data.js';

/**
 * Class representaing statistic.
 * @extends AbstractComponent
 */
class Statistic extends AbstractComponent {
  /**
   * Create statistic.
   * @param {HTMLElement} statisticContainer
   * @param {object} statisticParams
   * @param {string} filter
   * @param {function} onUpdateStatistic
   */
  constructor(statisticContainer, {totalWatchedFilms,
    totalDuration, topGenre}, filter, onUpdateStatistic) {
    super();
    this._userTotalRating = getUserTotalRank();
    this._totalWatchedFilms = totalWatchedFilms;
    this._totalDuration = totalDuration;
    this._topGenre = topGenre;
    this._onUpdateStatistic = onUpdateStatistic;
    this._filter = filter;
    this._barHeight = 55;
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
    let uniqueGenres = Object.entries(getUniqueGenres());
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
   * Return setting for chart.
   * @param {object} mainData
   * @return {object}
   */
  _getChartSetting(mainData) {
    return {
      plugins: [ChartDataLabels],
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
