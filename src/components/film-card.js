
import {
  getFilmCardTemplate
} from './film-card-template.js';
import {
  KEYS,
  createElement
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
   * @return {DocumentFragment}
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
    this._element = null;
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
   * Return deep clone of element with listeners.
   * @return {DocumentFragment}
   */
  getCloneElement() {
    const fragment = document.createDocumentFragment();
    for (let node of this._element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }
    return fragment;
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
