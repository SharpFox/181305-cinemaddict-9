import Search from '../components/search.js';
import {
  addElementDOM,
  removeContainerChildren
} from '../utils.js';
import {
  filmsCategories,
  filmsCategoriesId,
  filmsCardsCurrent,
  findFilmsCardsCurrent,
  menuTypesId,
  doDefaultFilmCardsCurrent
} from '../data.js';

/**
 * Class representaing controller of search.
 */
class SearchController {
  /**
   * Create search controller.
   * @param {object} pageController
   * @param {object} mainNavigationController
   * @param {HTMLElement} mainNavigationContainer
   * @param {HTMLElement} filmsContainer
   * @param {HTMLElement} sortContainer
   * @param {HTMLElement} statisticContainer
   * @param {HTMLElement} searchResultContainer
   */
  constructor(pageController, mainNavigationController, mainNavigationContainer,
      filmsContainer, sortContainer, statisticContainer) {
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
      findFilmsCardsCurrent(searchLine);
      removeContainerChildren(this._searchResultContainer);
      this._addSearchResultElement(filmsCardsCurrent.length);
      if (!filmsCardsCurrent.length) {
        this._addNoResultElement();
        return;
      }
      this._pageController.addFilmsList(filmsCategoriesId.AllMoviesUpcoming);
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
      doDefaultFilmCardsCurrent();
      const sortButtonActiveContainer =
        document.querySelector(`.sort__button--active`);
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
      this._mainNavigationContainer
      .querySelector(`.main-navigation__item--active`);

    if (mainNavigationElement.dataset.id === menuTypesId.stats) {
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
          ${filmsCategories.AllMoviesUpcoming}
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
