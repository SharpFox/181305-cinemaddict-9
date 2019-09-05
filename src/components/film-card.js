
import {
  getFilmCardTemplate
} from './film-card-template.js';
import {
  KEYS,
  createElement,
  removeElement
} from '../utils.js';

/**
 * Class representaing film card.
 */
class FilmCard {
  /**
   * Create film card.
   * @param {object} filmCard
   */
  constructor({title, rating, year, duration, genres, img,
    description, countComments}) {
    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._img = img;
    this._description = description;
    this._countComments = countComments;

    this._element = null;
    this._onOpen = null;
    this._onOpenDetails = this._onOpenDetails.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFilmCardTemplate(this);
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
  set onOpen(fn) {
    this._onOpen = fn;
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
    this._element.firstElementChild.addEventListener(`click`, this._onOpenDetails);
    this._element.firstElementChild.addEventListener(`keydown`, this._onOpenDetails);
  }

  /**
   * Remove event for element.
   */
  unbind() {
    this._element.firstElementChild.removeElement(`click`, this._onOpenDetails);
    this._element.firstElementChild.removeElement(`keydown`, this._onOpenDetails);
  }

  /**
   * Call the fuction.
   * @param {event} evt
   */
  _onOpenDetails(evt) {
    if ((evt.keyCode !== KEYS.ENTER || evt.type !== `click`)
      || (typeof this._onOpen !== `function`)) {
      this._onOpen();
    }
  }
}

export default FilmCard;
