
import AbstractComponent from './abstract-component.js';
import {
  KEYS
} from '../utils.js';
import {
  getSortTemplate
} from './sort-template.js';

/**
 * Class representaing sort.
 * @extends AbstractComponent
 */
class Sort extends AbstractComponent {
  /**
   * Create sort.
   * @param {object} sortType
   */
  constructor(sortType) {
    super();
    this._sortType = sortType;

    this._onSort = null;
    this._onSortButton = this._onSortButton.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getSortTemplate(this);
  }

  /**
   * Save the function.
   * @param {function} fn
   */
  set onSort(fn) {
    this._onSort = fn;
  }

  /**
   * Return sort type of component.
   * @return {string}
   */
  getSortType() {
    const sortButtonContainer = this._element.querySelector(`.sort__button`);
    return sortButtonContainer.dataset.sorttype;
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
    this._bindOnSortButton(element);
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
    this._unbindOnSortButton(element);
  }

  /**
   * Add events for sort button of element.
   * @param {DocumentFragment} element
   */
  _bindOnSortButton(element) {
    const buttonContainer = element.querySelector(`.sort__button`);
    if (buttonContainer !== null) {
      buttonContainer.addEventListener(`click`, this._onSortButton);
      buttonContainer.addEventListener(`keydown`, this._onSortButton);
    }
  }

  /**
   * Remove events for sort button of element.
   * @param {DocumentFragment} element
   */
  _unbindOnSortButton(element) {
    const buttonContainer = element.querySelector(`.sort__button`);
    if (buttonContainer !== null) {
      buttonContainer.removeEventListener(`click`, this._onSortButton);
      buttonContainer.removeEventListener(`keydown`, this._onSortButton);
    }
  }

  /**
   * Call the fuction.
   * @param {event} evt
   */
  _onSortButton(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._onSort === `function`)) {
      this._onSort();
    }
  }
}

export default Sort;
