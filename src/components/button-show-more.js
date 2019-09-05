
import {
  getButtonShowMoreTemplate
} from './button-show-more-template.js';
import {
  KEYS,
  createElement,
  removeElement
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
   * Add event for element.
   */
  bind() {
    this._element.firstElementChild.addEventListener(`click`, this._onOpenButton);
    this._element.firstElementChild.addEventListener(`keydown`, this._onOpenButton);
  }

  /**
   * Remove event for element.
   */
  unbind() {
    this._element.firstElementChild.removeEventListener(`click`, this._onOpenButton);
    this._element.firstElementChild.removeEventListener(`keydown`, this._onOpenButton);
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
