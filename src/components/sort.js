
import {
  getSortTemplate
} from './sort-template.js';
import AbstractComponent from './abstract-component.js';

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
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getSortTemplate(this._sortType);
  }
}

export default Sort;
