import PageController from './controllers/page-controller.js';
import Footer from './components/footer.js';
import MainNavigation from './components/main-navigation.js';
import Profile from './components/profile.js';
import Search from './components/search.js';
import Statistic from './components/statistic.js';
import {
  addElementDOM,
  removeContainerChildren
} from './utils.js';
import {
  menuTypes,
  menuTypesId,
  statisticFilters,
  statisticTextList,
  countFilmCards,
  userTotalRating,
  selectfilmsCardsCurrent,
  doDefaultFilmCardsCurrent,
  changefilmsCardsPortionCount,
  totalDownloadedFilmsCards
} from './data.js';

const bodyContainer = document.querySelector(`body`);
const headerContainer = bodyContainer.querySelector(`.header`);
const searchContainer = headerContainer.querySelector(`.search`);
const profileContainer = headerContainer.querySelector(`.profile`);
const mainContainer = bodyContainer.querySelector(`.main`);
const mainNavigationContainer = mainContainer.querySelector(`.main-navigation`);
const statisticContainer = mainContainer.querySelector(`.statistic`);
const sortContainer = mainContainer.querySelector(`.sort`);
const filmsContainer = mainContainer.querySelector(`.films`);
const filmsDetailsContainer = bodyContainer.querySelector(`.film-details`);
const footerContainer = bodyContainer.querySelector(`.footer`);

const pageController = new PageController(filmsContainer, filmsDetailsContainer,
    sortContainer);
pageController.init();

const searchComponent = new Search();
addElementDOM(searchContainer, searchComponent);

const profileComponent = new Profile(userTotalRating);
addElementDOM(profileContainer, profileComponent);

const mainNavigationComponent = new MainNavigation(menuTypes, menuTypesId);
addElementDOM(mainNavigationContainer, mainNavigationComponent);

/**
 * Activate item of main menu when you press.
 * @param {HTMLElement} mainNavigationItemContainer
 */
const activateMainNavigationItem = (mainNavigationItemContainer) => {
  if (!mainNavigationItemContainer.classList
    .contains(`main-navigation__item--active`)) {
    const mainNavigationItems =
      mainNavigationContainer.querySelectorAll(`.main-navigation__item`);
    mainNavigationItems.forEach((itemContainer) => {
      if (itemContainer.dataset.id !== menuTypesId.stats) {
        itemContainer.classList.remove(`main-navigation__item--active`);
      }
    });

    mainNavigationItemContainer.classList.add(`main-navigation__item--active`);
  }
};

/**
 * Select films.
 */
const selectFilms = () => {
  const mainNavigationItems =
    mainNavigationContainer.querySelectorAll(`.main-navigation__item--active`);
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
    changefilmsCardsPortionCount(totalDownloadedFilmsCards);
    removeContainerChildren(filmsContainer);
    removeContainerChildren(sortContainer);
    pageController.init();

    return;
  }
  selectfilmsCardsCurrent(currentType);
  changefilmsCardsPortionCount(totalDownloadedFilmsCards);
  removeContainerChildren(filmsContainer);
  removeContainerChildren(sortContainer);
  pageController.init();
};

/**
 * Select films by category.
 * @param {event} evt
 */
mainNavigationComponent.selectFilms = (evt) => {
  const mainNavigationItemContainer = evt.currentTarget;
  activateMainNavigationItem(mainNavigationItemContainer);
  selectFilms(mainNavigationItemContainer);
};

/**
 * Open/close state
 * @param {event} evt
 */
mainNavigationComponent.openCloseState = (evt) => {
  const mainNavigationItemContainer = evt.currentTarget;
  if (!mainNavigationItemContainer.classList
    .contains(`main-navigation__item--active`)) {
    mainNavigationItemContainer.classList.add(`main-navigation__item--active`);
    statisticContainer.classList.remove(`visually-hidden`);
  } else {
    mainNavigationItemContainer.classList.remove(`main-navigation__item--active`);
    statisticContainer.classList.add(`visually-hidden`);
  }
};

const statisticComponent = new Statistic(userTotalRating, statisticFilters,
    statisticTextList);
addElementDOM(statisticContainer, statisticComponent);

const footerComponent = new Footer(countFilmCards);
addElementDOM(footerContainer, footerComponent);
