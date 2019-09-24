import MainNavigation from '../components/main-navigation.js';
import {
  addElementDOM,
  removeContainerChildren
} from '../utils.js';
import {
  menuTypesId,
  selectfilmsCardsCurrent,
  doDefaultFilmCardsCurrent,
  changefilmsCardsPortionCount,
  totalDownloadedFilmsCards
} from '../data.js';

/**
 * Class representaing controller of main navigation.
 */
class MainNavigationController {
  /**
   * Create main-navigation controller.
   * @param {object} pageController
   * @param {HTMLElement} mainNavigationContainer
   * @param {HTMLElement} filmsContainer
   * @param {HTMLElement} sortContainer
   * @param {HTMLElement} statisticContainer
   */
  constructor(pageController, mainNavigationContainer, filmsContainer, sortContainer,
      statisticContainer) {
    this._pageController = pageController;
    this._mainNavigationContainer = mainNavigationContainer;
    this._filmsContainer = filmsContainer;
    this._sortContainer = sortContainer;
    this._statisticContainer = statisticContainer;
    this._mainNavigationComponent = new MainNavigation();
  }

  /**
   * Create main navigation.
   */
  init() {
    this._addMainNavigation();
  }

  /**
   * Select films.
   */
  selectFilms() {
    const mainNavigationItems =
      this._mainNavigationContainer
      .querySelectorAll(`.main-navigation__item--active`);
    let currentType = null;
    for (const itemContainer of mainNavigationItems) {
      if ((itemContainer.dataset.id !== menuTypesId.stats)
        && (itemContainer.classList.contains(`main-navigation__item--active`))) {
        currentType = itemContainer.dataset.id;
        break;
      }
    }
    if (currentType === menuTypesId.all) {
      doDefaultFilmCardsCurrent();
      this._rerenderFilmsLists();
      return;
    }
    selectfilmsCardsCurrent(currentType);
    this._rerenderFilmsLists();
  }

  /**
   * Rerender all films lists.
   */
  _rerenderFilmsLists() {
    changefilmsCardsPortionCount(totalDownloadedFilmsCards);
    removeContainerChildren(this._filmsContainer);
    removeContainerChildren(this._sortContainer);
    this._pageController.unrenderFilmsListsComponents();
    this._pageController.unrenderComponentsMoviesControllers();
    this._pageController.init();
  }

  /**
   * Add main navigation to DOM and fill handlers.
   */
  _addMainNavigation() {
    addElementDOM(this._mainNavigationContainer,
        this._mainNavigationComponent);

    /**
     * Select films by category.
     * @param {event} evt
     */
    this._mainNavigationComponent.selectFilms = (evt) => {
      const mainNavigationItemContainer = evt.currentTarget;
      this._activateMainNavigationItem(mainNavigationItemContainer);
      const sortButtonActiveContainer =
        document.querySelector(`.sort__button--active`);
      this.selectFilms();
      this._pageController
        .sortFilmsCards(sortButtonActiveContainer.dataset.sorttype);
      this._filmsContainer.classList.remove(`visually-hidden`);
      this._sortContainer.classList.remove(`visually-hidden`);
      this._statisticContainer.classList.add(`visually-hidden`);
    };

    /**
     * Open/close state
     * @param {event} evt
     */
    this._mainNavigationComponent.openCloseState = (evt) => {
      const mainNavigationItemContainer = evt.currentTarget;
      this._activateMainNavigationItem(mainNavigationItemContainer);
      if (mainNavigationItemContainer.classList
        .contains(`main-navigation__item--active`)) {
        this._statisticContainer.classList.remove(`visually-hidden`);
        this._filmsContainer.classList.add(`visually-hidden`);
        this._sortContainer.classList.add(`visually-hidden`);
      } else {
        this._statisticContainer.classList.add(`visually-hidden`);
        this._filmsContainer.classList.remove(`visually-hidden`);
        this._sortContainer.classList.remove(`visually-hidden`);
      }
    };
  }

  /**
   * Activate item of main menu when you press.
   * @param {HTMLElement} mainNavigationItemContainer
   */
  _activateMainNavigationItem(mainNavigationItemContainer) {
    if (!mainNavigationItemContainer.classList
      .contains(`main-navigation__item--active`)) {
      const mainNavigationItems =
        this._mainNavigationContainer
        .querySelectorAll(`.main-navigation__item`);
      mainNavigationItems.forEach((itemContainer) => {
        itemContainer.classList.remove(`main-navigation__item--active`);
      });
      mainNavigationItemContainer.classList.add(`main-navigation__item--active`);
    }
  }
}

export default MainNavigationController;
