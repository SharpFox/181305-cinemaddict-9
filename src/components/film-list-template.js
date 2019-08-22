import {
  getButtonShowMoreTemplate
} from './button-show-more-template.js';
import {
  getFilmCardTemplate
} from './film-card-template.js';

/**
 * Return template for film list.
 * @param {object} filmTitle
 * @return {string}
 */
const getFilmsListTemplate = ({isExtra, isVisuallyHidden, title, films,
  isButton}) => {
  return `
    <section class="films-list${isExtra ? `--extra` : ``}">
      <h2 class="films-list__title 
        ${isVisuallyHidden ? `visually-hidden` : ``}">
        ${title}
      </h2>
      <div class="films-list__container">
        ${films.map((film) => getFilmCardTemplate(film).trim()).join(``)}
      </div>
      ${isButton ? getButtonShowMoreTemplate() : ``}
    </section>`;
};

export {
  getFilmsListTemplate
};
