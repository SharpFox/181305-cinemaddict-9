import {
  getButtonShowMoreTemplate
} from './button-show-more-template.js';
import {
  getFilmCardTemplate
} from './film-card-template.js';

/**
 * Return template for film list.
 * @param {object} obj
 * @return {string}
 */
const getFilmsListTemplate = (obj) => {
  return `
  <section class="films-list${obj.isExtra ? `--extra` : ``}">
    <h2 class="films-list__title 
      ${obj.isVisuallyHidden ? `visually-hidden` : ``}">
      ${obj.title}
    </h2>
    <div class="films-list__container">
      ${obj.films.map(() => getFilmCardTemplate().trim()).join(``)}
    </div>
    ${obj.isButton ? getButtonShowMoreTemplate() : ``}
  </section>`;
};

export {
  getFilmsListTemplate
};
