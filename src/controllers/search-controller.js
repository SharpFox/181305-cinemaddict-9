import Search from '../components/search.js';
import {
  addElementDOM,
  removeContainerChildren,
  doEscapeHTML
} from '../utils.js';

/**
 * Class representaing controller of search.
 */
class SearchController {
  /**
   * Create search controller.
   * @param {object} data
   * @param {object} pageController
   * @param {object} mainNavigationController
   * @param {HTMLElement} mainNavigationContainer
   * @param {HTMLElement} filmsContainer
   * @param {HTMLElement} sortContainer
   * @param {HTMLElement} statisticContainer
   * @param {HTMLElement} searchResultContainer
   */
  constructor(data, pageController, mainNavigationController,
      mainNavigationContainer, filmsContainer, sortContainer,
      statisticContainer) {
    this._data = data;
    this._pageController = pageController;
    this._mainNavigationController = mainNavigationController;
    this._searchContainer = document.getElementById(`search`);
    this._mainNavigationContainer = mainNavigationContainer;
    this._filmsContainer = filmsContainer;
    this._sortContainer = sortContainer;
    this._statisticContainer = statisticContainer;
    this._searchResultContainer = document.querySelector(`.result`);
    this._searchComponent = new Search();
  }

  /**
   * Create search.
   */
  init() {
    this._addSearch();
  }

  /**
   * Update data of statistic.
   */
  rerender() {
    this._searchComponent.unrender();
    removeContainerChildren(this._searchContainer);
    this.init();
  }

  /**
   * Add search to DOM and fill handlers.
   */
  _addSearch() {
    addElementDOM(this._searchContainer, this._searchComponent);

    /**
     * Search film.
     * @param {string} searchLine
     */
    this._searchComponent.searchFilm = (searchLine) => {
      this._hideOtherContainers();
      if (!searchLine) {
        removeContainerChildren(this._searchResultContainer);
        this._addSearchResultElement(0);
        this._addNoResultElement();
        return;
      }
      this._data.findFilmsCardsCurrent(searchLine);
      removeContainerChildren(this._searchResultContainer);
      this._addSearchResultElement(this._data.filmsCardsCurrent.length);
      if (!this._data.filmsCardsCurrent.length) {
        this._addNoResultElement();
        return;
      }
      this._pageController.addFilmsList(
          this._data.filmsCategoriesId.AllMoviesUpcoming);
    };

    /**
     * Search film.
     */
    this._searchComponent.closeSearch = () => {
      removeContainerChildren(this._searchResultContainer);
      removeContainerChildren(this._filmsContainer);
      this._searchResultContainer.classList.add(`visually-hidden`);
      this._mainNavigationContainer.classList.remove(`visually-hidden`);
      this._openStatistic();
      this._sortContainer.classList.remove(`visually-hidden`);
      this._data.doDefaultFilmCardsCurrent();
      const sortButtonActiveContainer =
        this._pageController.getActiveSortButton();
      this._mainNavigationController.selectFilms();
      this._pageController
        .sortFilmsCards(sortButtonActiveContainer.dataset.sorttype);
    };
  }

  /**
   * Hide main navigation, sort, stat.
   */
  _hideOtherContainers() {
    removeContainerChildren(this._filmsContainer);
    this._sortContainer.classList.add(`visually-hidden`);
    this._mainNavigationContainer.classList.add(`visually-hidden`);
    this._statisticContainer.classList.add(`visually-hidden`);
  }

  /**
   * Open statistic.
   */
  _openStatistic() {
    const mainNavigationElement =
      this._mainNavigationController.mainNavigationComponent
      .getActiveMainNavigationItem();

    if (mainNavigationElement.dataset.id === this._data.menuTypesId.stats) {
      this._statisticContainer.classList.remove(`visually-hidden`);
    }
  }

  /**
   * Add element result of search.
   * @param {number} totalFilmsFound
   */
  _addSearchResultElement(totalFilmsFound) {
    this._searchResultContainer.classList.remove(`visually-hidden`);
    const searchResultElement = document.createElement(`div`);
    searchResultElement.innerHTML = `<p class="result__text">
        Result
        <span class="result__count">
          ${totalFilmsFound}</span>
       </p>`;
    this._searchResultContainer
      .appendChild(searchResultElement.firstElementChild);
  }

  /**
   * Add no-result container to films container.
   */
  _addNoResultElement() {
    const noResultElement = document.createElement(`div`);
    noResultElement.innerHTML = `<section
        class="films-list">
        <h2 class="films-list__title visually-hidden">
          ${doEscapeHTML(this._data.filmsCategories.AllMoviesUpcoming)}
        </h2>
        <div class="no-result">
          There is no movies for your request.
        </div>
      </section>`;
    this._filmsContainer
      .appendChild(noResultElement.firstElementChild);
  }
}

export default SearchController;
