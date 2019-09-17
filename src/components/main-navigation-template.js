/**
 * Return template for main-navigation.
 * @param {array} _menuTypes
 * @param {array} _menuTypesId
 * @return {string}
 */
const getMainNavigationTemplate = ({_menuTypes, _menuTypesId}) => {
  return _menuTypes.map(({id, modifiers, title, isActive, filmsCount}) => (`
    <a href="#${id}" data-id="${id}"
      class="main-navigation__item
      ${modifiers.map((modifier) => (
      `main-navigation__item--` + modifier
    ).trim()).join(` `)}
      ${isActive ? `main-navigation__item--active` : ``}">
      ${title}
      ${id !== _menuTypesId.stats ? `${filmsCount ? `
        <span class="main-navigation__item-count">`
        + filmsCount + `</span>` : ``}` : ``}
      
    </a>`).trim()).join(``);
};

export {
  getMainNavigationTemplate
};
