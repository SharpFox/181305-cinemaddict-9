/**
 * Return template for sorting.
 * @param {object} sortType
 * @return {string}
 */
const getSortTemplate = ([sortType, isActive]) => {
  return `
    <li>
      <a href="#" data-sorttype="${sortType}" class="sort__button
      ${isActive ? ` sort__button--active` : ``}">
        Sort by ${sortType}
      </a>
    </li>`;
};

export {
  getSortTemplate
};
