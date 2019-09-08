
import {
  getSortTemplate
} from './sort-template.js';
import AbstractComponent from './abstract-component.js';
import {
  KEYS
} from '../utils.js';

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
    return getSortTemplate(this._sortType);
  }

  /**
   * Save the function.
   * @param {function} fn
   */
  set onSort(fn) {
    this._onSort = fn;
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    this._bindOnSortButton(element === null ? this._element : element);
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
   * Add events for close button of element.
   * @param {DocumentFragment} element
   */
  _bindOnSortButton(element) {
    const buttonContainer = element.querySelector(`.sort__button`);
    buttonContainer.addEventListener(`click`, this._onSortButton);
    buttonContainer.addEventListener(`keydown`, this._onSortButton);
  }

  /**
   * Call the fuction.
   * @param {event} evt
   */
  _onSortButton(evt) {
    if ((evt.keyCode !== KEYS.ESC || evt.type !== `click`)
      || (typeof this._onClose !== `function`)) {
      this._onSort();
    }
  }
}

export default Sort;
