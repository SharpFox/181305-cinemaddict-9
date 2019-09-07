
import {
  getFilmsListTemplate
} from './film-list-template.js';
import {
  createElement
} from '../utils.js';

/**
 * Class representaing film list.
 */
class FilmList {
  /**
   * Create film list.
   * @param {object} filmTitle
   */
  constructor({isExtra, isVisuallyHidden, title, films,
    isButton, id}) {
    this._isExtra = isExtra;
    this._isVisuallyHidden = isVisuallyHidden;
    this._title = title;
    this._films = films;
    this._isButton = isButton;
    this._id = id;

    this._element = null;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFilmsListTemplate(this);
  }

  /**
   * Return HTML element.
   * @return {DocumentFragment}
   */
  get element() {
    return this._element;
  }

  /**
   * Return result of create new element.
   * @return {HTMLElement}
   */
  render() {
    this._element = createElement(this.template);
    return this._element;
  }

  /**
   * Delete element.
   */
  unrender() {
    this._element = null;
  }

  /**
   * Add events for element.
   */
  bind() {}

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
}

export default FilmList;
