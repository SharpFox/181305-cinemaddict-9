/**
 * Return template for sorting.
 * @param {object} sort
 * @return {string}
 */
const getSortTemplate = ({_sortType}) => {
  const [sortType, isActive] = _sortType;
  return `
    <li>
      <a data-sorttype="${sortType}" class="sort__button
      ${isActive ? ` sort__button--active` : ``}">
        Sort by ${sortType}
      </a>
    </li>`;
};

export {
  getSortTemplate
};
