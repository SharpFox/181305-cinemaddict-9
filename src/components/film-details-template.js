import {
  filmDetailsControlsTypes,
  filmControlsTypesId,
  ratingScales,
  emojiList,
  getImgPathEmoji
} from '../data.js';
import {
  getDuration
} from '../utils.js';
import moment from 'moment';

/**
 * Return of rating activity.
 * @param {array} controlsTypes
 * @return {boolean}
 */
const ratingIsActive = (controlsTypes) => {
  for (let type of controlsTypes) {
    if (type === filmControlsTypesId.watched) {
      return true;
    }
  }
  return false;
};

/**
 * Return template emoji list.
 * @param {string} img
 * @param {string} title
 * @param {number} userRating
 * @return {string}
 */
const getFilmRatingTemplate = (img, title, userRating) => {
  return `
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset"
          type="button">
          Undo
        </button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="${img}"
            alt="film-poster"
            class="film-details__user-rating-img"
          >
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">
            ${title}
          </h3>

          <p class="film-details__user-rating-feelings">
            How you feel it?
          </p>

          <div class="film-details__user-rating-score">
            ${ratingScales.map((scale) => (`<input type="radio"
                name="score"
                class="film-details__user-rating-input visually-hidden"
                value="${scale}"
                id="rating-${scale}"
                ${Math.ceil(userRating) === scale ? `checked` : ``}
              >
              <label class="film-details__user-rating-label"
                for="rating-${scale}">
                ${scale}
              </label>`).trim()).join(``)}       
          </div>
        </section>
      </div>
    </section>`;
};

/**
 * Return template emoji list.
 * @return {string}
 */
const getEmojiListTemplate = () => {
  return `
    <div class="film-details__emoji-list">
      ${emojiList.map(({id, img}) => (`<input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="${id}"
        value="${id}"
      >
      <label class="film-details__emoji-label"
        tabindex="6"
        for="${id}">
        <img src="${img}"
          width="30"
          height="30"
          alt="emoji"
        >
      </label>`)).join(``)}
    </div>`;
};

/**
 * Return comment list.
 * @param {array} comments
 * @return {string}
 */
const getCommentsListTemplate = (comments) => {
  return `
    <ul class="film-details__comments-list">
      ${comments.map(({id, type, text, author, date}) => (`<li
        class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${getImgPathEmoji(type)}"
            width="55"
            height="55"
            alt="emoji"
          >
        </span>
        <div>
          <p class="film-details__comment-text">
            ${text}
          </p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">
              ${author}
            </span>
            <span class="film-details__comment-day">
              ${moment(date).fromNow()}
            </span>
            <button class="film-details__comment-delete"
              tabindex="4"
              data-id="${id}">
              Delete
            </button>
          </p>
        </div>
      </li>`)).join(``)}
    </ul>`;
};

/**
 * Return template for details of film.
 * @param {object} filmDetails
 * @return {string}
 */
const getFilmDetailsTemplate = ({_img, _age, _title, _rating, _userRating,
  _director, _writers, _actors, _year, _duration, _country, _genres,
  _description, _comments, _controlsTypes}) => {
  return `
    <form class="film-details__inner"
      tabindex="1"
      >
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn"
            tabindex="2"
            type="button">
            close
          </button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img"
              src="${_img}"
              alt=""
            >
            <p class="film-details__age">${_age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">
                  ${_title}
                </h3>
                <p class="film-details__title-original">
                  Original: ${_title}
                </p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${_rating}</p>
                <p class="film-details__user-rating">Your rate ${_userRating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${_director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Writers
                </td>
                <td class="film-details__cell">
                  ${_writers.map((writer) => writer).join(`, `)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Actors
                </td>
                <td class="film-details__cell">
                  ${_actors.map((actor) => actor).join(`, `)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Release Date
                </td>
                <td class="film-details__cell">
                ${moment(_year).format(`YYYY`)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Runtime
                </td>
                <td class="film-details__cell">
                  ${getDuration(_duration.start, _duration.end)}               
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Country
                </td>
                <td class="film-details__cell">
                  ${_country}  
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Genres
                </td>
                <td class="film-details__cell">
                  ${_genres.map((genre) => (`<span class="film-details__genre">
                    ${genre}</span>`)).join(``)}
                </td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${_description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          ${Object.keys(filmDetailsControlsTypes).map((type) => (`<input type="checkbox"
            class="film-details__control-input visually-hidden"
            tabindex="3"
            value="${type}"
            id="${type}"
            name="${type}"            
            ${_controlsTypes.map((currentType) => (`${currentType === type ? `checked` : ``}`).trim())
            .join(``)}
          >
          <label for="${type}"
            class="film-details__control-label
              film-details__control-label--${type}">
              ${filmDetailsControlsTypes[type]}
          </label>`)).join(``)}    
        </section>
      </div>
      <div class="form-details__middle-container
        ${ratingIsActive(_controlsTypes, filmControlsTypesId) ? `` : ` visually-hidden`}">
        ${getFilmRatingTemplate(_img, _title, _userRating, ratingScales)}
      </div>
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap"> 
          <h3 class="film-details__comments-title">
            Comments
            <span class="film-details__comments-count">
              ${_comments.length}
            </span>
          </h3>
          ${getCommentsListTemplate(_comments)}
          <div class="film-details__new-comment"> 
            <div for="add-emoji"
              class="film-details__add-emoji-label">
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input"
                tabindex="5"
                placeholder="Select reaction below and write comment here" 
                name="comment"></textarea>
            </label> 
            ${getEmojiListTemplate()}         
          </div>
        </section>
      </div>
    </form>`;
};

export {
  getFilmDetailsTemplate
};
