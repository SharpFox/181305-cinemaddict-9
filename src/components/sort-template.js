/**
 * Return template for sorting.
 * @param {object} sortType
 * @return {string}
 */
const getSortTemplate = (sortType) => {
  return Object.keys(sortType).map((type) => (`
    <li>
      <a href="#" class="sort__button
      ${sortType[type] ? ` sort__button--active` : ``}">
        Sort by ${type}
      </a>
    </li>`).trim()).join(``);
};

export {
  getSortTemplate
};
