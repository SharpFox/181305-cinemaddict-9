import {
  getStatisticList,
  getStatisticFilters
} from '../data.js';

/**
 * Return termplate for statistic text list.
 * @param {number} statisticParams
 * @return {string}
 */
const getStatList = ({totalWatchedFilms, totalDuration,
  topGenre}) => {
  const statisticList =
    getStatisticList(totalWatchedFilms, totalDuration, topGenre);
  return `${statisticList.map(({title, texts}) => (`
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">
        ${title}
      </h4>
      <p class="statistic__item-text">
        ${texts.map(({isDescription, textTitle}) => (
      isDescription ? `<span class="statistic__item-description">
          ${textTitle}</span>` : `${textTitle}`).trim()).join(``)}
      </p>
    </li>`).trim()).join(``)}`;
};

/**
 * Return template for statistic filters.
 * @param {string} filter
 * @return {string}
 */
const getStatFilters = (filter) => {
  const statisticFilters = getStatisticFilters(filter);
  return `${statisticFilters.map(({id, isChecked, title}) => (`<input
      type="radio"
      class="statistic__filters-input visually-hidden"
      name="statistic-filter"
      id="statistic-${id}"
      value="${id}"
      data-id="${id}"
      ${isChecked ? `checked` : ``}
    >
    <label for="statistic-${id}"
      class="statistic__filters-label">
      ${title}
    </label>`).trim()).join(``)}
  `;
};

/**
 * Return template for statistic.
 * @param {object} statistic
 * @return {string}
 */
const getStatisticTemplate = ({_userTotalRating, _statisticParams,
  _totalDuration, _topGenre, _filter}) => {
  return `
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img"
        src="images/bitmap@2x.png"
        alt="Avatar"
        width="35" height="35">
      <span class="statistic__rank-label">
        ${_userTotalRating}
      </span>
    </p>
    <form action="https://echo.htmlacademy.ru/"
      method="get"
      class="statistic__filters">
      <p class="statistic__filters-description">
        Show stats:
      </p>
      ${getStatFilters(_filter)}
    </form>
    <ul class="statistic__text-list">
      ${getStatList(_statisticParams)}
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`;
};

export {
  getStatisticTemplate
};
