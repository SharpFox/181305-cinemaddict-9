/**
 * Return template for main-navigation.
 * @param {array} arr
 * @return {string}
 */
const getMainNavigationTemplate = (arr) => {
  return arr.map((obj) => (`
    <a href="#${obj.href}"
      class="main-navigation__item
      ${obj.modifiers.map((value) => (
      `main-navigation__item--` + value
    ).trim()).join(` `)}">
      ${obj.title}
      ${obj.count ? `<span class="main-navigation__item-count">`
      + obj.count + `</span>` : ``}
    </a>`).trim()).join(``);
};

export {
  getMainNavigationTemplate
};
