
import {
  getFilmDetailsTemplate
} from './film-details-template.js';
import {
  KEYS
} from '../utils.js';
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
   * @param {array} emojiList
   * @param {array} ratingScales
   * @param {object} filmDetailsControlsTypes
   * @param {object} filmControlsTypesId
   * @param {object} userTotalRating
   */
  constructor(filmsDetailsContainer, {img, age, title, rating, userRating,
    director, writers, actors, year, duration, country, genres, description,
    comments, controlsTypes}, emojiList, ratingScales,
  filmDetailsControlsTypes, filmControlsTypesId, userTotalRating) {
    super();
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

    this._emojiList = emojiList;
    this._ratingScales = ratingScales;
    this._filmDetailsControlsTypes = filmDetailsControlsTypes;
    this._filmControlsTypesId = filmControlsTypesId;
    this._userTotalRating = userTotalRating;

    this._onClose = null;
    this._addEmoji = null;
    this._addComment = null;
    this._openCloseRating = null;
    this._onCloseButton = this._onCloseButton.bind(this);
    this._onCloseForm = this._onCloseForm.bind(this);
    this._onAddToWatchlist = this._onAddToWatchlist.bind(this);
    this._onMarkAsWatched = this._onMarkAsWatched.bind(this);
    this._onAddToFavorite = this._onAddToFavorite.bind(this);
    this._onAddEmoji = this._onAddEmoji.bind(this);
    this._onAddComment = this._onAddComment.bind(this);
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
   * Save the function for add comment.
   * @param {function} fn
   */
  set addComment(fn) {
    this._addComment = fn;
  }

  /**
   * Save the function for open rating.
   * @param {function} fn
   */
  set openCloseRating(fn) {
    this._openCloseRating = fn;
  }

  /**
   * Add emoji to element.
   * @param {string} emojiId
   */
  addEmojiToElement(emojiId) {
    let emojiPath = null;
    this._emojiList.forEach((emoji) => {
      if (emojiId === emoji.id) {
        emojiPath = emoji.img;
      }
    });
    const addEmojiLabelContainer =
      this._element.querySelector(`.film-details__add-emoji-label`);
    const imgElement = document.createElement(`img`);
    imgElement.src = emojiPath;
    imgElement.width = 55;
    imgElement.height = 55;
    imgElement.alt = `emoji`;
    if (addEmojiLabelContainer.firstElementChild !== null) {
      addEmojiLabelContainer.firstElementChild.remove();
    }
    addEmojiLabelContainer.appendChild(imgElement);
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    if (element === null) {
      element = this._element;
    }
    this._bindOnCloseButton(element);
    this._bindOnAddToWatchlist(element);
    this._bindOnMarkAsWatched(element);
    this._bindOnAddToFavorite(element);
    this._bindOnAddEmoji(element);
    this._bindOnAddComment(element);
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
    this._unbindOnCloseButton(element);
    this._unbindOnAddToWatchlist(element);
    this._unbindOnMarkAsWatched(element);
    this._unbindOnAddToFavorite(element);
    this._unbindOnAddEmoji(element);
    this._unbindOnAddComment(element);
    this._unbindOnOpenCloseRating(element);
  }

  /**
   * Add events for close button of element.
   * @param {DocumentFragment} element
   */
  _bindOnCloseButton(element) {
    const buttonContainer = element.querySelector(`.film-details__close-btn`);
    if (buttonContainer === null) {
      return;
    }
    buttonContainer.addEventListener(`click`, this._onCloseButton);
    buttonContainer.addEventListener(`keydown`, this._onCloseButton);
    element.firstElementChild.addEventListener(`keydown`, this._onCloseForm);
  }

  /**
   * Add events for button "Add to watchlist".
   * @param {DocumentFragment} element
   */
  _bindOnAddToWatchlist(element) {
    const watchlistContainer =
      element.querySelector(`.film-details__control-label--watchlist`);
    if (watchlistContainer === null) {
      return;
    }
    watchlistContainer.addEventListener(`click`, this._onAddToWatchlist);
    watchlistContainer.addEventListener(`keydown`, this._onAddToWatchlist);
  }

  /**
   * Add events for button "Mark as watched".
   * @param {DocumentFragment} element
   */
  _bindOnMarkAsWatched(element) {
    const watchedContainer =
      element.querySelector(`.film-details__control-label--watched`);
    if (watchedContainer === null) {
      return;
    }
    watchedContainer.addEventListener(`click`, this._onMarkAsWatched);
    watchedContainer.addEventListener(`keydown`, this._onMarkAsWatched);
  }

  /**
   * Add events for button "Favorite".
   * @param {DocumentFragment} element
   */
  _bindOnAddToFavorite(element) {
    const favoriteContainer =
      element.querySelector(`.film-details__control-label--favorite`);
    if (favoriteContainer === null) {
      return;
    }
    favoriteContainer.addEventListener(`click`, this._onAddToFavorite);
    favoriteContainer.addEventListener(`keydown`, this._onAddToFavorite);
  }

  /**
   * Add events for adding emoji.
   * @param {DocumentFragment} element
   */
  _bindOnAddEmoji(element) {
    const emojiListContainer = element.querySelector(`.film-details__emoji-list`);
    if (emojiListContainer === null) {
      return;
    }
    const emojesContainer = emojiListContainer.querySelectorAll(`.film-details__emoji-label`);
    for (let emoji of emojesContainer) {
      emoji.addEventListener(`click`, this._onAddEmoji);
      emoji.addEventListener(`keydown`, this._onAddEmoji);
    }
  }

  /**
   * Add events for adding new comment.
   * @param {DocumentFragment} element
   */
  _bindOnAddComment(element) {
    const commentContainer = element.querySelector(`.film-details__add-emoji-label`);
    if (commentContainer === null) {
      return;
    }
    commentContainer.addEventListener(`click`, this._onAddComment);
    commentContainer.addEventListener(`keydown`, this._onAddComment);
  }

  /**
   * Add events for open/close rating.
   * @param {DocumentFragment} element
   */
  _bindOnOpenCloseRating(element) {
    const ratingContainer = element.querySelector(`.film-details__control-label--watched`);
    if (ratingContainer === null) {
      return;
    }
    ratingContainer.addEventListener(`click`, this._onOpenCloseRating);
    ratingContainer.addEventListener(`keydown`, this._onOpenCloseRating);
  }

  /**
   * Remove events for close button of element.
   * @param {DocumentFragment} element
   */
  _unbindOnCloseButton(element) {
    const buttonContainer = element.querySelector(`.film-details__close-btn`);
    if (buttonContainer === null) {
      return;
    }
    buttonContainer.removeEventListener(`click`, this._onCloseButton);
    buttonContainer.removeEventListener(`keydown`, this._onCloseButton);
  }

  /**
   * Remove events for button "Add to watchlist".
   * @param {DocumentFragment} element
   */
  _unbindOnAddToWatchlist(element) {
    const watchlistContainer =
      element.querySelector(`.film-details__control-label--watchlist`);
    if (watchlistContainer === null) {
      return;
    }
    watchlistContainer.removeEventListener(`click`, this._onAddToWatchlist);
    watchlistContainer.removeEventListener(`keydown`, this._onAddToWatchlist);
  }

  /**
   * Remove events for button "Mark as watched".
   * @param {DocumentFragment} element
   */
  _unbindOnMarkAsWatched(element) {
    const watchedContainer =
      element.querySelector(`.film-details__control-label--watched`);
    if (watchedContainer === null) {
      return;
    }
    watchedContainer.removeEventListener(`click`, this._onMarkAsWatched);
    watchedContainer.removeEventListener(`keydown`, this._onMarkAsWatched);
  }

  /**
   * Remove events for button "Favorite".
   * @param {DocumentFragment} element
   */
  _unbindOnAddToFavorite(element) {
    const favoriteContainer =
      element.querySelector(`.film-details__control-label--favorite`);
    if (favoriteContainer === null) {
      return;
    }
    favoriteContainer.removeEventListener(`click`, this._onAddToFavorite);
    favoriteContainer.removeEventListener(`keydown`, this._onAddToFavorite);
  }

  /**
   * Remove events for button emoji.
   * @param {DocumentFragment} element
   */
  _unbindOnAddEmoji(element) {
    const emojiListContainer = element.querySelector(`.film-details__emoji-list`);
    if (emojiListContainer === null) {
      return;
    }
    const emojesContainer = emojiListContainer.querySelectorAll(`.film-details__emoji-label`);
    for (let emoji of emojesContainer) {
      emoji.removeEventListener(`click`, this._onAddEmoji);
      emoji.removeEventListener(`keydown`, this._onAddEmoji);
    }
  }

  /**
   * Remove events for adding new comment.
   * @param {DocumentFragment} element
   */
  _unbindOnAddComment(element) {
    const commentContainer = element.querySelector(`.film-details__add-emoji-label`);
    if (commentContainer === null) {
      return;
    }
    commentContainer.removeEventListener(`click`, this._onAddComment);
    commentContainer.removeEventListener(`keydown`, this._onAddComment);
  }

  /**
   * Remove events for open/close rating.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenCloseRating(element) {
    const ratingContainer = element.querySelector(`.film-details__control-label--watched`);
    if (ratingContainer === null) {
      return;
    }
    ratingContainer.removeEventListener(`click`, this._onOpenCloseRating);
    ratingContainer.removeEventListener(`keydown`, this._onOpenCloseRating);
  }

  /**
   * Call the fuction for close details of film.
   * @param {event} evt
   */
  _onCloseButton(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._onClose === `function`)) {
      this._onClose();
    }
  }

  /**
   * Call the fuction for close details of film.
   * @param {event} evt
   */
  _onCloseForm(evt) {
    if (evt.keyCode === KEYS.ESC
      && typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  /**
   * Call the fuction for add to watchlist.
   * @param {event} evt
   */
  _onAddToWatchlist(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      //
    }
  }

  /**
   * Call the fuction for mark as watched.
   * @param {event} evt
   */
  _onMarkAsWatched(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      //
    }
  }

  /**
   * Call the function for add to favorite.
   * @param {event} evt
   */
  _onAddToFavorite(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      //
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
   * Call the function for add new comment.
   * @param {event} evt
   */
  _onAddComment(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._addComment === `function`)) {
      this._addComment(evt);
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
}

export default FilmDetails;
