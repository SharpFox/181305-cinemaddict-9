
import {
  getButtonShowMoreTemplate
} from './button-show-more-template.js';
import {
  KEYS
} from '../utils.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing button "Show more".
 * @extends AbstractComponent
 */
class ButtonShowMore extends AbstractComponent {
  /**
   * Create button "Showe more".
   */
  constructor() {
    super();
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
