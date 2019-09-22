
import {
  getFilmDetailsTemplate
} from './film-details-template.js';
import {
  KEYS
} from '../utils.js';
import {
  userTotalRating,
  filmControlsTypesId,
  getEmojiImg
} from '../data.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing film details.
 * @extends AbstractComponent
 */
class FilmDetails extends AbstractComponent {
  /**
   * Create film details.
   * @param {HTMLElement} filmsDetailsContainer
   * @param {object} filmCard
   * @param {function} onDataChange
   */
  constructor(filmsDetailsContainer, {id, img, age, title, rating, userRating,
    director, writers, actors, year, duration, country, genres, description,
    comments, controlsTypes}, onDataChange) {
    super();
    this._id = id;
    this._filmsDetailsContainer = filmsDetailsContainer;
    this._img = img;
    this._age = age;
    this._title = title;
    this._rating = rating;
    this._userRating = userRating;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._year = year;
    this._duration = duration;
    this._country = country;
    this._genres = genres;
    this._description = description;
    this._comments = comments;
    this._controlsTypes = controlsTypes;
    this._onDataChange = onDataChange;

    this._onClose = null;
    this._addEmoji = null;
    this._openCloseRating = null;
    this._onCloseForm = this._onCloseForm.bind(this);
    this._onSendForm = this._onSendForm.bind(this);
    this._onAddEmoji = this._onAddEmoji.bind(this);
    this._onOpenCloseRating = this._onOpenCloseRating.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFilmDetailsTemplate(this);
  }

  /**
   * Save the function for close film details.
   * @param {function} fn
   */
  set onClose(fn) {
    this._onClose = fn;
  }

  /**
   * Save the function for add emoji.
   * @param {function} fn
   */
  set addEmoji(fn) {
    this._addEmoji = fn;
  }

  /**
   * Save the function for open rating.
   * @param {function} fn
   */
  set openCloseRating(fn) {
    this._openCloseRating = fn;
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    if (element === null) {
      element = this._element;
    }
    this._bindOnCloseForm(element);
    this._bindOnSendForm(element);
    this._bindOnAddEmoji(element);
    this._bindOnOpenCloseRating(element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    if (element === null) {
      element = this._element;
    }
    this._unbindOnCloseForm(element);
    this._unbindOnSendForm(element);
    this._unbindOnAddEmoji(element);
    this._unbindOnOpenCloseRating(element);
  }

  /**
   * Add events for close from.
   * @param {DocumentFragment} element
   */
  _bindOnCloseForm(element) {
    const closeBtnContainer = element.querySelector(`.film-details__close-btn`);
    if (closeBtnContainer !== null) {
      closeBtnContainer.addEventListener(`click`, this._onCloseForm);
      closeBtnContainer.addEventListener(`keydown`, this._onCloseForm);
    }

    const formContainer = element.querySelector(`.film-details__inner`);
    if (formContainer !== null) {
      formContainer.addEventListener(`keydown`, this._onCloseForm);
    }
  }

  /**
   * Add events for send form.
   * @param {DocumentFragment} element
   */
  _bindOnSendForm(element) {
    const formContainer = element.querySelector(`.film-details__inner`);
    if (formContainer !== null) {
      formContainer.addEventListener(`change`, this._onSendForm);
      formContainer.addEventListener(`keydown`, this._onSendForm);
    }
  }

  /**
   * Add events for adding emoji.
   * @param {DocumentFragment} element
   */
  _bindOnAddEmoji(element) {
    const emojiListContainer = element.querySelector(`.film-details__emoji-list`);
    if (emojiListContainer !== null) {
      const emojesContainer = emojiListContainer.querySelectorAll(`.film-details__emoji-label`);
      for (let emoji of emojesContainer) {
        emoji.addEventListener(`click`, this._onAddEmoji);
        emoji.addEventListener(`keydown`, this._onAddEmoji);
      }
    }
  }

  /**
   * Add events for open/close rating.
   * @param {DocumentFragment} element
   */
  _bindOnOpenCloseRating(element) {
    const ratingContainer =
      element.querySelector(`.film-details__control-label--watched`);
    if (ratingContainer !== null) {
      ratingContainer.addEventListener(`click`, this._onOpenCloseRating);
      ratingContainer.addEventListener(`keydown`, this._onOpenCloseRating);
    }
  }

  /**
   * Remove events for close form.
   * @param {DocumentFragment} element
   */
  _unbindOnCloseForm(element) {
    const closeBtnContainer = element.querySelector(`.film-details__close-btn`);
    if (closeBtnContainer !== null) {
      closeBtnContainer.removeEventListener(`click`, this._onCloseForm);
      closeBtnContainer.removeEventListener(`keydown`, this._onCloseForm);
    }

    const formContainer = element.querySelector(`.film-details__inner`);
    if (formContainer !== null) {
      formContainer.removeEventListener(`keydown`, this._onCloseForm);
    }
  }

  /**
   * Remove events for send form.
   * @param {DocumentFragment} element
   */
  _unbindOnSendForm(element) {
    const formContainer = element.querySelector(`.film-details__inner`);
    if (formContainer !== null) {
      formContainer.removeEventListener(`change`, this._onSendForm);
      formContainer.removeEventListener(`keydown`, this._onSendForm);
      formContainer.removeEventListener(`submit`, this._onSendForm);
    }
  }

  /**
   * Remove events for button emoji.
   * @param {DocumentFragment} element
   */
  _unbindOnAddEmoji(element) {
    const emojiListContainer = element.querySelector(`.film-details__emoji-list`);
    if (emojiListContainer !== null) {
      const emojesContainer = emojiListContainer.querySelectorAll(`.film-details__emoji-label`);
      for (let emoji of emojesContainer) {
        emoji.removeEventListener(`click`, this._onAddEmoji);
        emoji.removeEventListener(`keydown`, this._onAddEmoji);
      }
    }
  }

  /**
   * Remove events for open/close rating.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenCloseRating(element) {
    const ratingContainer =
      element.querySelector(`.film-details__control-label--watched`);
    if (ratingContainer !== null) {
      ratingContainer.removeEventListener(`click`, this._onOpenCloseRating);
      ratingContainer.removeEventListener(`keydown`, this._onOpenCloseRating);
    }
  }

  /**
   * Call the fuction for close details of film.
   * @param {event} evt
   */
  _onCloseForm(evt) {
    if ((evt.keyCode === KEYS.ESC || evt.type === `click`)
      && typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  /**
   * Call the function for add new smile.
   * @param {event} evt
   */
  _onAddEmoji(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._addEmoji === `function`)) {
      this._addEmoji(evt);
    }
  }

  /**
   * Call the function for open/close rating.
   * @param {event} evt
   */
  _onOpenCloseRating(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._openCloseRating === `function`)) {
      this._openCloseRating();
    }
  }

  /**
   * Call the fuction for send form.
   * @param {event} evt
   */
  _onSendForm(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `change`) {
      const newData = this._getNewDataForm();
      if (!this._isNecessarySendingDataToServer(evt.keyCode, newData, evt.target)) {
        return;
      }

      this._resetUserRating(newData);
      this._resetComment(evt.keyCode, newData, evt.target);
      this._onDataChange(newData);
    }
  }

  /**
   * Returns the fact of the need to send data to the server.
   * @param {number} keyCode
   * @param {object} newData
   * @param {HTMLElement} target
   * @return {boolean}
   */
  _isNecessarySendingDataToServer(keyCode, newData, target) {
    if ((keyCode !== KEYS.ENTER)
      && target.classList.contains(`film-details__comment-input`)) {
      return false;
    }

    if ((target.classList.contains(`film-details__comment-input`)
      || target.classList.contains(`film-details__inner`))
      && (newData.comment.img === null
        || newData.comment.text === null)) {
      return false;
    }

    if (target.classList.contains(`film-details__emoji-label`)) {
      return false;
    }

    return true;
  }

  /**
   * Reset comment in newData.
   * @param {number} keyCode
   * @param {object} newData
   * @param {HTMLElement} target
   */
  _resetComment(keyCode, newData, target) {
    if (keyCode !== KEYS.ENTER) {
      newData.comment = this._getEmptyComment();
      return;
    }

    if (newData.comment.img === null
      || newData.comment.text === null) {
      newData.comment = this._getEmptyComment();
      return;
    }

    if (target.classList.contains(`film-details__emoji-label`)) {
      newData.comment = this._getEmptyComment();
    }
  }

  /**
   * Return empty object "comment".
   * @return {object}
   */
  _getEmptyComment() {
    return {
      id: null,
      img: null,
      text: null,
      author: null,
      date: null,
    };
  }

  /**
   * Reset userRating in newData.
   * @param {object} newData
   */
  _resetUserRating(newData) {
    let isContolTypeWatched = false;
    newData.controlsTypes.forEach((contolType) => {
      if (contolType === filmControlsTypesId.watched) {
        isContolTypeWatched = true;
      }
    });

    if (!isContolTypeWatched) {
      newData.userRating = 0;
    }
  }

  /**
   * Return new data from form.
   * @return {object}
   */
  _getNewDataForm() {
    const formData = new FormData(document.querySelector(`.film-details__inner`));
    return this._processForm(formData, this._id);
  }

  /**
   * Return new data object.
   *
   * @param {FormData} formData
   * @param {number} filmCardId
   * @return {object}
   */
  _processForm(formData, filmCardId) {
    const newData = {
      id: filmCardId,
      userRating: 0,
      comment: {
        id: null,
        img: null,
        text: null,
        author: null,
        date: null,
      },
      controlsTypes: []
    };

    const filmCardMapper = this._createMapper(newData);
    for (const [key, value] of formData) {
      if (filmCardMapper[key]) {
        filmCardMapper[key](value);
      }
    }

    return newData;
  }

  /**
   * Create map of object.
   *
   * @param {DOM} newData
   * @return {object}
   */
  _createMapper(newData) {
    return {
      'watchlist': (value) => {
        newData.controlsTypes.push(value);
      },
      'watched': (value) => {
        newData.controlsTypes.push(value);
      },
      'favorite': (value) => {
        newData.controlsTypes.push(value);
      },
      'score': (value) => {
        newData.userRating = Number(value);
      },
      'comment': (value) => {
        newData.comment.text = value.trim();
        newData.comment.author = userTotalRating;
        newData.comment.date = new Date();
      },
      'comment-emoji': (value) => {
        newData.comment.img = getEmojiImg(value);
      }
    };
  }
}

export default FilmDetails;
