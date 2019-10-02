/**
 * Return template for main-navigation.
 * @param {object} mainNavigation
 * @return {string}
 */
const getMainNavigationTemplate = ({_data}) => {
  const menuTypes = _data.getMenuTypes();
  return menuTypes.map(({id, modifiers, title, isActive, filmsCount}) => (`
    <a href="#${id}" data-id="${id}"
      class="main-navigation__item
      ${modifiers.map((modifier) => (
      `main-navigation__item--` + modifier
    ).trim()).join(` `)}
      ${isActive ? `main-navigation__item--active` : ``}">
      ${title}
      ${filmsCount ? `
        <span class="main-navigation__item-count">
          ${filmsCount}
        </span>` : ``}      
    </a>`).trim()).join(``);
};

export {
  getMainNavigationTemplate
};
