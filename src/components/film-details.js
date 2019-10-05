
import moment from 'moment';
import AbstractComponent from './abstract-component.js';
import {
  KEYS,
  doEscapeHTML,
  addErrorBackground,
  deleteErrorBackground,
  addErrorBorder,
  deleteErrorBorder,
  blockContainer,
  unblockContainer,
  shake
} from '../utils.js';
import {
  getFilmDetailsTemplate
} from '../templates/film-details-template.js';

/**
 * Class representaing film details.
 * @extends AbstractComponent
 */
class FilmDetails extends AbstractComponent {
  /**
   * Create film details.
   * @param {object} data
   * @param {HTMLElement} filmsDetailsContainer
   * @param {object} filmCard
   * @param {function} onDataChange
   * @param {function} onCommentsLoad
   */
  constructor(data, filmsDetailsContainer, {id, img, age, title, alternativeTitle,
    rating, userRating, director, writers, actors, year, duration, country,
    genres, description, comments, controlsTypes}, onDataChange, onCommentsLoad) {
    super();
    this._data = data;
    this._id = id;
    this._filmsDetailsContainer = filmsDetailsContainer;
    this._img = img;
    this._age = age;
    this._title = title;
    this._alternativeTitle = alternativeTitle;
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
    this._onCommentsLoad = onCommentsLoad;

    this._onClose = null;
    this._addEmoji = null;
    this._openCloseRating = null;
    this._onUndoUserRating = this._onUndoUserRating.bind(this);
    this._onCloseForm = this._onCloseForm.bind(this);
    this._onSendForm = this._onSendForm.bind(this);
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
   * Return id of film.
   * @return {number}
   */
  get id() {
    return this._id;
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
   * Add error color for border of form.
   * @param {HTMLElement} currentContainer
   */
  addErrorBorder(currentContainer) {
    addErrorBorder(currentContainer);
  }

  /**
   * Delete error color for border of form.
   * @param {HTMLElement} currentContainer
   */
  deleteErrorBorder(currentContainer) {
    deleteErrorBorder(currentContainer);
  }

  /**
   * Draw animation for error from server.
   * @param {HTMLElement} currentContainer
   */
  shake(currentContainer) {
    shake(currentContainer);
  }

  /**
   * Block form for posting to server.
   * @param {HTMLElement} currentContainer
   */
  blockContainer(currentContainer) {
    blockContainer(currentContainer);
  }

  /**
   * Unblock form for posting to server.
   * @param {HTMLElement} currentContainer
   */
  unblockContainer(currentContainer) {
    unblockContainer(currentContainer);
  }

  /**
   * Add error color for background of user rating.
   * @param {HTMLElement} currentContainer
   */
  addErrorBackground(currentContainer) {
    if (currentContainer.classList
    .contains(`film-details__user-rating-input`)) {
      const userRatingContainer = currentContainer.labels[0];
      addErrorBackground(userRatingContainer);
    }
  }

  /**
   * Delete error color for background of user rating.
   * @param {HTMLElement} currentContainer
   */
  deleteErrorBackground(currentContainer) {
    if (currentContainer.classList
      .contains(`film-details__user-rating-input`)) {
      const userRatingContainer = currentContainer.labels[0];
      deleteErrorBackground(userRatingContainer);
    }
  }

  /**
   * Return paste state for control type (input).
   * @param {HTMLElement} activeControl
   */
  returnPastStateControlType(activeControl) {
    activeControl.checked = !activeControl.checked;

    const ratingContainer =
      document.querySelector(`.form-details__middle-container`);
    const watchedContainer = document.getElementById(`watched`);
    if (watchedContainer !== null) {
      if (!watchedContainer.checked) {
        ratingContainer.classList.add(`visually-hidden`);
      } else {
        ratingContainer.classList.remove(`visually-hidden`);
      }
    }
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    if (element === null) {
      element = this._element;
    }
    if (element === null) {
      return;
    }
    this._bindOnCloseForm(element);
    this._bindOnSendForm(element);
    this._bindOnOpenCloseRating(element);
    this._bindOnUndoUserRating(element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    if (element === null) {
      element = this._element;
    }
    if (element === null) {
      return;
    }
    this._unbindOnCloseForm(element);
    this._unbindOnSendForm(element);
    this._unbindOnOpenCloseRating(element);
    this._unbindOnUndoUserRating(element);
  }

  /**
   * Add events for close from.
   * @param {DocumentFragment} element
   */
  _bindOnCloseForm(element) {
    const closeBtnContainer =
      element.querySelector(`.film-details__close-btn`);
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
   * Add events for undo of user rating.
   * @param {DocumentFragment} element
   */
  _bindOnUndoUserRating(element) {
    const watchedResetContainer =
      element.querySelector(`.film-details__watched-reset`);
    if (watchedResetContainer !== null) {
      watchedResetContainer.addEventListener(`click`, this._onUndoUserRating);
      watchedResetContainer.addEventListener(`keydown`, this._onUndoUserRating);
    }
  }

  /**
   * Remove events for close form.
   * @param {DocumentFragment} element
   */
  _unbindOnCloseForm(element) {
    const closeBtnContainer =
      element.querySelector(`.film-details__close-btn`);
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
   * Remove events for undo of user rating.
   * @param {DocumentFragment} element
   */
  _unbindOnUndoUserRating(element) {
    const watchedResetContainer =
      element.querySelector(`.film-details__watched-reset`);
    if (watchedResetContainer !== null) {
      watchedResetContainer.removeEventListener(`click`, this._onUndoUserRating);
      watchedResetContainer.removeEventListener(`keydown`, this._onUndoUserRating);
    }
  }

  /**
   * Return fact of selecting a image.
   * @param {event} evt
   * @return {boolean}
   */
  _isImageSelection(evt) {
    if (evt.keyCode === KEYS.ENTER
      && evt.target.classList.contains(`film-details__emoji-label`)) {
      return true;
    } else if (evt.type === `change`
      && evt.target.classList.contains(`film-details__emoji-item`)) {
      return true;
    }

    return false;
  }

  /**
   * Return fact of leaving textarea.
   * @param {event} evt
   * @return {boolean}
   */
  _isLeavingTexarea(evt) {
    if (evt.type === `change`
      && evt.target.classList.contains(`film-details__comment-input`)) {
      return true;
    }

    return false;
  }

  /**
   * Returns the fact of the need to send data to the server.
   * @param {event} evt
   * @param {object} newData
   * @return {boolean}
   */
  _isNecessarySendingDataToServer(evt, newData) {
    if ((evt.target.classList.contains(`film-details__comment-input`)
      || evt.target.classList.contains(`film-details__inner`)
      || evt.target.classList.contains(`film-details__emoji-label`))
      && (newData.comment.type === null || newData.comment.text === null)) {
      return false;
    }

    return true;
  }

  /**
   * Reset userRating in newData.
   * @param {object} newData
   */
  _resetUserRating(newData) {
    let isContolTypeWatched = false;
    newData.controlsTypes.forEach((contolType) => {
      if (contolType === this._data.filmControlsTypesId.watched) {
        isContolTypeWatched = true;
      }
    });

    if (!isContolTypeWatched) {
      newData.userRating = 0;
    }
  }

  /**
   * Reset comment in newData.
   * @param {event} evt
   * @param {object} newData
   */
  _resetComment(evt, newData) {
    if (evt.keyCode !== KEYS.ENTER
      || (evt.keyCode === KEYS.ENTER
      && !evt.ctrlKey && !evt.metaKey)) {
      newData.comment = FilmDetails.getEmptyComment();
    }
  }

  /**
   * Return new data from form.
   * @return {object}
   */
  _getNewDataForm() {
    const formData =
      new FormData(document.querySelector(`.film-details__inner`));
    return this._processForm(formData, this._id);
  }

  /**
   * Return new data object.
   * @param {FormData} formData
   * @param {number} filmCardId
   * @return {object}
   */
  _processForm(formData, filmCardId) {
    const newData = FilmDetails.getEmptyNewData();
    newData.id = filmCardId;

    const filmCardMapper = this._createMapper(newData);
    for (const [key, value] of formData) {
      if (filmCardMapper[key]) {
        filmCardMapper[key](value);
      }
    }

    if (newData.comment.text === null
      || newData.comment.type === null) {
      newData.isSendingForm = true;
    } else {
      newData.isSendingComment = true;
    }

    return newData;
  }

  /**
   * Create map of object.
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
        const newText = doEscapeHTML(value.trim());
        newData.comment.text = newText === `` ? null : newText;
        newData.comment.date = moment().toDate();
      },
      'comment-emoji': (value) => {
        newData.comment.type = value;
      }
    };
  }

  /**
   * Call the fuction for close details of film.
   * @param {event} evt
   */
  _onCloseForm(evt) {
    if ((evt.keyCode === KEYS.ESC || evt.type === `click`)
      && typeof this._onClose === `function`) {
      this._onClose(evt);
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
   * Call the function for undo of user rating.
   * @param {event} evt
   */
  _onUndoUserRating(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      const newData = FilmDetails.getEmptyNewData();
      newData.isSendingForm = true;
      newData.id = this._id;
      newData.userRating = 0;
      newData.controlsTypes =
        this._data.getControlTypesFromFilmsCardsCurrent(this._id);

      this._onDataChange(newData, this, evt);
    }
  }

  /**
   * Call the fuction for send form.
   * @param {event} evt
   */
  _onSendForm(evt) {
    if (((evt.keyCode === KEYS.ENTER && !evt.ctrlKey && !evt.metaKey)
      || evt.type === `change`)
      && typeof this._addEmoji === `function`
      && this._isImageSelection(evt)) {
      this._addEmoji(evt);
      return;
    }

    if (this._isLeavingTexarea(evt)) {
      return;
    }

    if ((evt.keyCode === KEYS.ENTER && (evt.ctrlKey || evt.metaKey))
      || evt.type === `change`) {
      const newData = this._getNewDataForm();

      if (!this._isNecessarySendingDataToServer(evt, newData)) {
        return;
      }
      this._resetUserRating(newData);
      this._resetComment(evt, newData);
      this._onDataChange(newData, this, evt);
    }
  }

  /**
   * Return object newData for id comment.
   * @param {number} commentId
   * @param {number} filmId
   * @return {object}
   * @static
   */
  static getNewComment(commentId, filmId) {
    const newData = FilmDetails.getEmptyNewData();
    newData.isDeletingComment = true;
    newData.id = filmId;
    newData.comment.id = commentId;

    return newData;
  }

  /**
   * Return empty NewData.
   * @return {object}
   * @static
   */
  static getEmptyNewData() {
    return {
      isSendingForm: false,
      isSendingComment: false,
      isDeletingComment: false,
      id: null,
      userRating: 0,
      comment: FilmDetails.getEmptyComment(),
      controlsTypes: []
    };
  }

  /**
   * Return empty object "comment".
   * @return {object}
   * @static
   */
  static getEmptyComment() {
    return {
      id: null,
      type: null,
      text: null,
      date: null
    };
  }
}

export default FilmDetails;
