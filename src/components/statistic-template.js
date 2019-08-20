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
    </p>${filters.map((obj) => (`<input type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-${obj.attribute}"
        value="${obj.attribute}"
        ${obj.checked ? `checked` : ``}
      >
      <label for="statistic-${obj.attribute}"
        class="statistic__filters-label">
        ${obj.title}
      </label>`).trim()).join(``)} 
  </form>

  <ul class="statistic__text-list">${textList.map((obj) => (
    `<li class="statistic__text-item">
      <h4 class="statistic__item-title">${obj.title}</h4>
      <p class="statistic__item-text">
      ${obj.texts.map((textObj) => (
      textObj.isDescription ? `<span class="statistic__item-description">
        ${textObj.title}</span>` : `${textObj.title}`).trim()).join(``)}
      </p>
    </li>`).trim()).join(``)}
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
  `;
};

export {
  getStatisticTemplate
};
