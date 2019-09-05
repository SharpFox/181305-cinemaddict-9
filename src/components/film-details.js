
import {
  getFilmDetailsTemplate
} from './film-details-template.js';
import {
  KEYS,
  createElement,
  removeElement
} from '../utils.js';

/**
 * Class representaing film details.
 */
class FilmDetails {
  /**
   * Create film details.
   * @param {object} filmCard
   * @param {object} controlsTypes
   * @param {array} emojiList
   */
  constructor({img, age, title, rating, director, writers,
    actors, year, duration, country, genres, description, comments},
  controlsTypes, emojiList) {
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

    this._element = null;
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
   * Return HTML element.
   */
  get element() {
    return this._element;
  }

  /**
   * Save the function.
   * @param {function} fn
   */
  set onClose(fn) {
    this._onClose = fn;
  }

  /**
   * Return result of create new element.
   * @return {HTMLElement}
   */
  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  /**
   * Delete element.
   */
  unrender() {
    this.unbind();
    removeElement(this._element);
  }

  /**
   * Add event for element.
   */
  bind() {
    const buttonContainer = this._element.querySelector(`.film-details__close-btn`);
    buttonContainer.addEventListener(`click`, this._onCloseButton);
    buttonContainer.addEventListener(`keydown`, this._onCloseButton);
  }

  /**
   * Remove event for element.
   */
  unbind() {
    const buttonContainer = this._element.querySelector(`.film-details__close-btn`);
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
