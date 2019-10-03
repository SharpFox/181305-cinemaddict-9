
import AbstractComponent from './abstract-component.js';
import {
  KEYS
} from '../utils.js';
import {
  getButtonShowMoreTemplate
} from '../templates/button-show-more-template.js';

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
    return getButtonShowMoreTemplate();
  }

  /**
   * Save the function for showing cards of film.
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
    if (element === null) {
      element = this._element;
    }
    if (element === null) {
      return;
    }
    this._bindOnOpenButton(element);
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
    this._unbindOnOpenButton(element);
  }

  /**
   * Add events for open button of element.
   * @param {DocumentFragment} element
   */
  _bindOnOpenButton(element) {
    const buttonContainer = element.firstElementChild;
    if (buttonContainer !== null) {
      buttonContainer.addEventListener(`click`, this._onOpenButton);
      buttonContainer.addEventListener(`keydown`, this._onOpenButton);
    }
  }

  /**
   * Remove events for open button of element.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenButton(element) {
    const buttonContainer = element.firstElementChild;
    if (buttonContainer !== null) {
      buttonContainer.removeEventListener(`click`, this._onOpenButton);
      buttonContainer.removeEventListener(`keydown`, this._onOpenButton);
    }
  }

  /**
   * Call the fuction.
   * @param {event} evt
   */
  _onOpenButton(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._onCLose !== `function`)) {
      this._onOpen();
    }
  }
}

export default ButtonShowMore;
