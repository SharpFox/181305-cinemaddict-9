
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
   */
  constructor({title, rating, year, duration, genres, img,
    description, countComments}) {
    super();
    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._img = img;
    this._description = description;
    this._countComments = countComments;

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
   * Save the function.
   * @param {function} fn
   */
  set onOpen(fn) {
    this._onOpen = fn;
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    this._bindOnOpenDetails(element === null ? this._element : element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    this._unbindOnOpenDetails(element === null ? this._element : element);
  }

  /**
   * Add events for open details of element.
   * @param {DocumentFragment} element
   */
  _bindOnOpenDetails(element) {
    element.firstElementChild.addEventListener(`click`, this._onOpenDetails);
    element.firstElementChild.addEventListener(`keydown`, this._onOpenDetails);
  }

  /**
   * Remove events for open details of element.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenDetails(element) {
    element.firstElementChild.removeEventListener(`click`, this._onOpenDetails);
    element.firstElementChild.removeEventListener(`keydown`, this._onOpenDetails);
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
