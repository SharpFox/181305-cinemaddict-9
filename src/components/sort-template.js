/**
 * Return template for sorting.
 * @param {object} obj
 * @return {string}
 */
const getSortTemplate = (obj) => {
  return Object.keys(obj).map((key) => (
    `<li>
      <a href="#" class="sort__button${obj[key] ? ` sort__button--active` : ``}">
        Sort by ${key}
      </a>
    </li>`).trim()).join(``);
};

export {
  getSortTemplate
};
