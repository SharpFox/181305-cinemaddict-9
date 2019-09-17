
import {
  getFilmCardTemplate
} from './film-card-template.js';
import {
  KEYS
} from '../utils.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing film card.
 * @extends AbstractComponent
 */
class FilmCard extends AbstractComponent {
  /**
   * Create film card.
   * @param {object} filmCard
   * @param {object} filmCardControlsTypes
   * @param {function} onDataChange
   */
  constructor({title, rating, year, duration, genres, img,
    description, comments, controlsTypes}, filmCardControlsTypes,
  onDataChange) {
    super();
    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._img = img;
    this._description = description;
    this._comments = comments;
    this._controlsTypes = controlsTypes;
    this._filmCardControlsTypes = filmCardControlsTypes;
    this._onDataChange = onDataChange.bind(this);

    this._onOpen = null;
    this._onOpenDetails = this._onOpenDetails.bind(this);
    this._onAddToWatchlist = this._onAddToWatchlist.bind(this);
    this._onMarkAsWatched = this._onMarkAsWatched.bind(this);
    this._onAddToFavorite = this._onAddToFavorite.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFilmCardTemplate(this);
  }

  /**
   * Save the function.
   * @param {function} fn
   */
  set onOpen(fn) {
    this._onOpen = fn;
  }

  /**
   * UpdateCurrentComponent
   * @param {object} newData
   */
  update(newData) {
    //
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    if (element === null) {
      element = this._element;
    }
    this._bindOnOpenDetails(element);
    this._bindOnAddToWatchlist(element);
    this._bindOnMarkAsWatched(element);
    this._bindOnAddToFavorite(element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    if (element === null) {
      element = this._element;
    }
    this._unbindOnOpenDetails(element);
    this._unbindOnAddToWatchlist(element);
    this._unbindOnMarkAsWatched(element);
    this._unbindOnAddToFavorite(element);
  }

  /**
   * Add events for open details of element.
   * @param {DocumentFragment} element
   */
  _bindOnOpenDetails(element) {
    const filmCardContainer = element.firstElementChild;
    if (filmCardContainer === null) {
      return;
    }
    filmCardContainer.addEventListener(`click`, this._onOpenDetails);
    filmCardContainer.addEventListener(`keydown`, this._onOpenDetails);
  }

  /**
   * Add events for button "Add to watchlist".
   * @param {DocumentFragment} element
   */
  _bindOnAddToWatchlist(element) {
    const addToWatchlistContainer =
      element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    if (addToWatchlistContainer === null) {
      return;
    }
    addToWatchlistContainer.addEventListener(`click`, this._onAddToWatchlist);
    addToWatchlistContainer.addEventListener(`keydown`, this._onAddToWatchlist);
  }

  /**
   * Add events for button "Mark as watched".
   * @param {DocumentFragment} element
   */
  _bindOnMarkAsWatched(element) {
    const markAsWatchedContainer =
      element.querySelector(`.film-card__controls-item--mark-as-watched`);
    if (markAsWatchedContainer === null) {
      return;
    }
    markAsWatchedContainer.addEventListener(`click`, this._onMarkAsWatched);
    markAsWatchedContainer.addEventListener(`keydown`, this._onMarkAsWatched);
  }

  /**
   * Add events for button "Favorite".
   * @param {DocumentFragment} element
   */
  _bindOnAddToFavorite(element) {
    const favoriteContainer =
      element.querySelector(`.film-card__controls-item--favorite`);
    if (favoriteContainer === null) {
      return;
    }
    favoriteContainer.addEventListener(`click`, this._onAddToFavorite);
    favoriteContainer.addEventListener(`keydown`, this._onAddToFavorite);
  }

  /**
   * Remove events for open details of element.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenDetails(element) {
    const filmCardContainer = element.firstElementChild;
    if (filmCardContainer === null) {
      return;
    }
    filmCardContainer.removeEventListener(`click`, this._onOpenDetails);
    filmCardContainer.removeEventListener(`keydown`, this._onOpenDetails);
  }

  /**
   * Remove events for button "Add to watchlist".
   * @param {DocumentFragment} element
   */
  _unbindOnAddToWatchlist(element) {
    const addToWatchlistContainer =
      element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    if (addToWatchlistContainer === null) {
      return;
    }
    addToWatchlistContainer.removeEventListener(`click`, this._onAddToWatchlist);
    addToWatchlistContainer.removeEventListener(`keydown`, this._onAddToWatchlist);
  }

  /**
   * Remove events for button "Mark as watched".
   * @param {DocumentFragment} element
   */
  _unbindOnMarkAsWatched(element) {
    const markAsWatchedContainer =
      element.querySelector(`.film-card__controls-item--mark-as-watched`);
    if (markAsWatchedContainer === null) {
      return;
    }
    markAsWatchedContainer.removeEventListener(`click`, this._onMarkAsWatched);
    markAsWatchedContainer.removeEventListener(`keydown`, this._onMarkAsWatched);
  }

  /**
   * Remove events for button "Favorite".
   * @param {DocumentFragment} element
   */
  _unbindOnAddToFavorite(element) {
    const favoriteContainer =
      element.querySelector(`.film-card__controls-item--favorite`);
    if (favoriteContainer === null) {
      return;
    }
    favoriteContainer.removeEventListener(`click`, this._onAddToFavorite);
    favoriteContainer.removeEventListener(`keydown`, this._onAddToFavorite);
  }

  /**
   * Call the fuction for open details about film.
   * @param {event} evt
   */
  _onOpenDetails(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._onOpen === `function`)) {
      this._onOpen();
    }
  }

  /**
   * Call the fuction for add to watchlist.
   * @param {event} evt
   */
  _onAddToWatchlist(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      const newData = this._getNewDataForm(`film-card__controls`);
      this.update(newData);
      this._onDataChange(newData);
    }
  }

  /**
   * Call the fuction for mark as watched.
   * @param {event} evt
   */
  _onMarkAsWatched(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      const newData = this._getNewDataForm(`film-card__controls`);
      this.update(newData);
      this._onDataChange(newData);
    }
  }

  /**
   * Call the fuction for add to favorite.
   * @param {event} evt
   */
  _onAddToFavorite(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      const newData = this._getNewDataForm(`film-card__controls`);
      this.update(newData);
      this._onDataChange(newData);
    }
  }

  /**
   * Return new data from form.
   * @param {string} cssClass
   * @return {object}
   */
  _getNewDataForm(cssClass) {
    const formData = new FormData(this._element.querySelector(`.${cssClass}`));
    return FilmCard.processForm(formData);
  }

  /**
   * Return modified object.
   *
   * @param {FormData} formData
   * @return {object}
   */
  static processForm(formData) {
    //
  }

  /**
   * Create map of object.
   *
   * @param {DOM} target
   * @return {object}
   */
  static createMapper(target) {
    //
  }
}

export default FilmCard;
