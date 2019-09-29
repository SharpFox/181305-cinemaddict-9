import moment from 'moment';
import {
  getDuration
} from '../utils.js';
import {
  filmCardControlsTypes
} from '../data.js';

/**
 * Return description for card of film by limit for symbols
 * (139 symbols).
 * @param {string} description
 * @return {string}
 */
const getFilmCardDescription = (description) => {
  let limitDescription = ``;
  let currentNumber = 1;
  for (let char of description) {
    limitDescription += char;
    if (currentNumber === 139) {
      limitDescription += `...`;
      break;
    }
    currentNumber += 1;
  }

  return limitDescription;
};

/**
 * Return template for card of film.
 * @param {object} filmCard
 * @return {string}
 */
const getFilmCardTemplate = ({_id, _title, _rating, _year, _duration, _genres, _img,
  _description, _comments, _controlsTypes}) => {
  return `
    <article class="film-card">
      <h3 class="film-card__title">
        ${_title}
      </h3>
      <p class="film-card__rating">
        ${_rating}
      </p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(_year).format(`YYYY`)}</span>
        <span class="film-card__duration">
          ${getDuration(_duration)}
        </span>
        ${_genres.length ? `<span class="film-card__genre">${_genres[0]}</span>` : ``}
      </p>
      <img src="${_img}"
        alt="" class="film-card__poster"
      >
      <p class="film-card__description">
        ${getFilmCardDescription(_description)}
      </p>
      <a class="film-card__comments">
        ${_comments.length} comment${_comments.length === 1 ? `` : `s`}   
      </a>      
      <form class="film-card__controls"
        id="form-film-card-controls-${_id}">          
        ${Object.keys(filmCardControlsTypes).map((type) => (`<button
          name="${type}"
          value="${type}"
          data-id="${type}"
          class="film-card__controls-item button
          film-card__controls-item--${filmCardControlsTypes[type]}
          ${_controlsTypes.map((currentType) => (`
            ${currentType === type ? ` film-card__controls-item--active` : ``}`).trim())
            .join(``)}">
          ${filmCardControlsTypes[type]}
        </button>`).trim()).join(``)}
      </form>
    </article>`;
};

export {
  getFilmCardTemplate
};
