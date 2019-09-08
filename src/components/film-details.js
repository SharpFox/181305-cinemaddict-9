
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
   * @param {object} filmCard
   * @param {object} controlsTypes
   * @param {array} emojiList
   */
  constructor({img, age, title, rating, director, writers,
    actors, year, duration, country, genres, description, comments},
  controlsTypes, emojiList) {
    super();
    this._img = img;
    this._age = age;
    this._title = title;
    this._rating = rating;
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

    this._onClose = null;
    this._onCloseButton = this._onCloseButton.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFilmDetailsTemplate(this);
  }

  /**
   * Save the function.
   * @param {function} fn
   */
  set onClose(fn) {
    this._onClose = fn;
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    this._bindOnCloseButton(element === null ? this._element : element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    this._unbindOnCloseButton(element === null ? this._element : element);
  }

  /**
   * Add events for close button of element.
   * @param {DocumentFragment} element
   */
  _bindOnCloseButton(element) {
    const buttonContainer = element.querySelector(`.film-details__close-btn`);
    buttonContainer.addEventListener(`click`, this._onCloseButton);
    buttonContainer.addEventListener(`keydown`, this._onCloseButton);
  }

  /**
   * Remove events for close button of element.
   * @param {DocumentFragment} element
   */
  _unbindOnCloseButton(element) {
    const buttonContainer = element.querySelector(`.film-details__close-btn`);
    buttonContainer.removeEventListener(`click`, this._onCloseButton);
    buttonContainer.removeEventListener(`keydown`, this._onCloseButton);
  }

  /**
   * Call the fuction.
   * @param {event} evt
   */
  _onCloseButton(evt) {
    if ((evt.keyCode !== KEYS.ESC || evt.type !== `click`)
      || (typeof this._onClose !== `function`)) {
      this._onClose();
    }
  }
}

export default FilmDetails;
