import {
  getSearchTemplate
} from './search-template.js';
import AbstractComponent from './abstract-component.js';

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
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getSearchTemplate(this);
  }
}

export default Search;
