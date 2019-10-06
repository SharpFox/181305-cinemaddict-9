import {
  createElement
} from '../utils.js';

/**
 * Class representaing abstract component.
 */
class AbstractComponent {
  /**
   * Create abstract component.
   */
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  /**
   * Return HTML element.
   * @return {DocumentFragment}
   */
  get element() {
    return this._element;
  }

  /**
   * Get template.
   */
  get template() {
    throw new Error(`You have to define template.`);
  }

  /**
   * Add events for elements.
   */
  bind() { }

  /**
   * Remove events for elements.
   */
  unbind() { }

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
   * Return deep clone of element with listeners.
   * @param {DocumentFragment} element
   * @return {DocumentFragment}
   */
  getCloneElement(element = null) {
    if (element === null) {
      element = this._element;
    }

    const fragment = document.createDocumentFragment();
    for (let node of element.childNodes) {
      fragment.appendChild(node.cloneNode(true));
    }

    return fragment;
  }

  /**
   * Return part of element.
   *
   * @param {string} classCSS
   * @return {DOM}
   */
  getElementPart(classCSS) {
    const cloneElement = this.getCloneElement();
    const elementPart = cloneElement.querySelector(`.${classCSS}`);
    this.bind(elementPart);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(elementPart);

    return fragment;
  }

  /**
   * Return element for binding events.
   * @param {HTMLElement} element
   * @return {element | null}
   */
  _getElementForBinding(element) {
    if (element === null) {
      element = this._element;
    }

    return element;
  }
}

export default AbstractComponent;
