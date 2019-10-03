import AbstractComponent from './abstract-component.js';
import {
  getFilmsListTemplate
} from '../templates/film-list-template.js';

/**
 * Class representaing film list.
 * @extends AbstractComponent
 */
class FilmList extends AbstractComponent {
  /**
   * Create film list.
   * @param {object} filmTitle
   */
  constructor({isExtra, isVisuallyHidden, title, films,
    isButton, id}) {
    super();
    this._isExtra = isExtra;
    this._isVisuallyHidden = isVisuallyHidden;
    this._title = title;
    this._films = films;
    this._isButton = isButton;
    this._id = id;
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFilmsListTemplate(this);
  }
}

export default FilmList;
