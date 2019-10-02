import AbstractComponent from './abstract-component.js';
import {
  KEYS,
  doEscapeHTML,
  MIN_SEARCH_LENGTH
} from '../utils.js';
import {
  getSearchTemplate
} from './search-template.js';

/**
 * Class representaing profile.
 * @extends AbstractComponent
 */
class Search extends AbstractComponent {
  /**
   * Create search.
   */
  constructor() {
    super();

    this._searchFilm = null;
    this._closeSearch = null;
    this._onSearchFilm = this._onSearchFilm.bind(this);
    this._onCloseSearch = this._onCloseSearch.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getSearchTemplate();
  }

  /**
   * Save the function for search of film.
   * @param {function} fn
   */
  set searchFilm(fn) {
    this._searchFilm = fn;
  }

  /**
   * Save the function for close of search.
   * @param {function} fn
   */
  set closeSearch(fn) {
    this._closeSearch = fn;
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
    this._bindOnSearchFilm(element);
    this._bindOnCloseSearch(element);
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
    this._unbindOnSearchFilm(element);
    this._unbindOnCloseSearch(element);
  }

  /**
   * Add events for search film.
   * @param {DocumentFragment} element
   */
  _bindOnSearchFilm(element) {
    const formContainer = element.querySelector(`.header__search`);
    if (formContainer !== null) {
      formContainer.addEventListener(`input`, this._onSearchFilm);
      formContainer.addEventListener(`submit`, this._onSearchFilm);
      formContainer.addEventListener(`keydown`, this._onSearchFilm);
    }
  }

  /**
   * Add events for for close search.
   * @param {DocumentFragment} element
   */
  _bindOnCloseSearch(element) {
    const formContainer = element.querySelector(`.header__search`);
    if (formContainer !== null) {
      formContainer.addEventListener(`reset`, this._onCloseSearch);
      formContainer.addEventListener(`keydown`, this._onCloseSearch);
      formContainer.addEventListener(`input`, this._onCloseSearch);
    }
  }

  /**
   * Remove events for search film.
   * @param {DocumentFragment} element
   */
  _unbindOnSearchFilm(element) {
    const formContainer = element.querySelector(`.header__search`);
    if (formContainer !== null) {
      formContainer.removeEventListener(`input`, this._onSearchFilm);
      formContainer.removeEventListener(`submit`, this._onSearchFilm);
      formContainer.removeEventListener(`keydown`, this._onSearchFilm);
    }
  }

  /**
   * Remove events for close search.
   * @param {DocumentFragment} element
   */
  _unbindOnCloseSearch(element) {
    const formContainer = element.querySelector(`.header__search`);
    if (formContainer !== null) {
      formContainer.removeEventListener(`reset`, this._onCloseSearch);
      formContainer.removeEventListener(`keydown`, this._onCloseSearch);
      formContainer.removeEventListener(`input`, this._onCloseSearch);
    }
  }

  /**
   * Call the function for searching of film.
   * @param {event} evt
   */
  _onSearchFilm(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `submit`) {
      evt.preventDefault();
      return;
    }
    if (evt.type === `input` && typeof this._searchFilm === `function`) {
      evt.preventDefault();
      const searchLine = this._getSearchLine(evt);
      if (searchLine.length >= MIN_SEARCH_LENGTH) {
        this._searchFilm(searchLine);
      }
    }
  }

  /**
   * Call the function for close search.
   * @param {event} evt
   */
  _onCloseSearch(evt) {
    if (evt.keyCode !== undefined) {
      return;
    }
    if ((evt.type === `reset`
      || evt.type === `input`)
      && typeof this._closeSearch === `function`) {
      const searchLine = this._getSearchLine(evt);
      if (!searchLine.length) {
        this._closeSearch(evt);
        this._setFormSearchAfterClosing();
      }
    }
  }

  /**
   * Return prepare line of seach.
   * @param {event} evt
   * @return {string}
   */
  _getSearchLine(evt) {
    const searchLine = evt.target.value;
    if (searchLine === undefined) {
      return ``;
    }
    const regExpTemplate = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
    return doEscapeHTML(searchLine.trim().replace(regExpTemplate, ``));
  }

  /**
   * Set form "Search" adter closing.
   */
  _setFormSearchAfterClosing() {
    const formSearch = document.querySelector(`.header__search`);
    formSearch.reset();
    formSearch.querySelector(`.search__field`).blur();
    formSearch.querySelector(`.search__submit`).focus();
  }
}

export default Search;
