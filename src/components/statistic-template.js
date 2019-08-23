/**
 * Return template for statistic.
 * @param {number} userRating
 * @param {array} filters
 * @param {array} textList
 * @return {string}
 */
const getStatisticTemplate = (userRating, filters, textList) => {
  return `
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img"
        src="images/bitmap@2x.png"
        alt="Avatar"
        width="35" height="35">
      <span class="statistic__rank-label">
        ${userRating}
      </span>
    </p>
    <form action="https://echo.htmlacademy.ru/"
      method="get"
      class="statistic__filters">
      <p class="statistic__filters-description">
        Show stats:
      </p>
      ${filters.map(({attribute, isChecked, title}) => (`<input
        type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-${attribute}"
        value="${attribute}"
        ${isChecked ? `checked` : ``}
      >
      <label for="statistic-${attribute}"
        class="statistic__filters-label">
        ${title}
      </label>`).trim()).join(``)} 
    </form>
    <ul class="statistic__text-list">${textList.map(({title, texts}) => (`
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">${title}</h4>
        <p class="statistic__item-text">
        ${texts.map(({isDescription, textTitle}) => (
      isDescription ? `<span class="statistic__item-description">
          ${textTitle}</span>` : `${textTitle}`).trim()).join(``)}
        </p>
      </li>`).trim()).join(``)}
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>`;
};

export {
  getStatisticTemplate
};
