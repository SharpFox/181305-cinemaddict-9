
import {
  getButtonShowMoreTemplate
} from './button-show-more-template.js';
import {
  KEYS,
  createElement
} from '../utils.js';

/**
 * Class representaing button "Show more".
 */
class ButtonShowMore {
  /**
   * Create button "Showe more".
   */
  constructor() {
    this._element = null;
    this._onOpen = null;
    this._onOpenButton = this._onOpenButton.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getButtonShowMoreTemplate(this);
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
    this._bindOnOpenButton(element === null ? this._element : element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    this._unbindOnOpenButton(element === null ? this._element : element);
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
   * Add events for open button of element.
   * @param {DocumentFragment} element
   */
  _bindOnOpenButton(element) {
    element.firstElementChild.addEventListener(`click`, this._onOpenButton);
    element.firstElementChild.addEventListener(`keydown`, this._onOpenButton);
  }

  /**
   * Remove events for open button of element.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenButton(element) {
    element.firstElementChild.removeEventListener(`click`, this._onOpenButton);
    element.firstElementChild.removeEventListener(`keydown`, this._onOpenButton);
  }

  /**
   * Call the fuction.
   * @param {event} evt
   */
  _onOpenButton(evt) {
    if ((evt.keyCode !== KEYS.ENTER || evt.type !== `click`)
      || (typeof this._onCLose !== `function`)) {
      this._onOpen();
    }
  }
}

export default ButtonShowMore;
