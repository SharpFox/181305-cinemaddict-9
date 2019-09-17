import PageController from './controllers/page-controller.js';
import Footer from './components/footer.js';
import MainNavigation from './components/main-navigation.js';
import Profile from './components/profile.js';
import Search from './components/search.js';
import Statistic from './components/statistic.js';
import {
  addElementDOM
} from './utils.js';
import {
  menuTypes,
  menuTypesId,
  statisticFilters,
  statisticTextList,
  countFilmCards,
  userTotalRating
} from './data.js';

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const search = header.querySelector(`.search`);
const profile = header.querySelector(`.profile`);
const main = body.querySelector(`.main`);
const mainNavigation = main.querySelector(`.main-navigation`);
const statistic = main.querySelector(`.statistic`);
const sort = main.querySelector(`.sort`);
const films = main.querySelector(`.films`);
const filmsDetails = body.querySelector(`.film-details`);
const footer = body.querySelector(`.footer`);

const searchComponent = new Search();
addElementDOM(search, searchComponent);

const profileComponent = new Profile(userTotalRating);
addElementDOM(profile, profileComponent);

const mainNavigationComponent = new MainNavigation(menuTypes, menuTypesId);
addElementDOM(mainNavigation, mainNavigationComponent);

/**
 * Select films by category.
 * @param {event} evt
 */
mainNavigationComponent.selectFilms = (evt) => {
  const mainNavigationItemContainer = evt.currentTarget;
  if (!mainNavigationItemContainer.classList
      .contains(`main-navigation__item--active`)) {
    const mainNavigationItems =
      mainNavigation.querySelectorAll(`.main-navigation__item`);
    mainNavigationItems.forEach((itemContainer) => {
      if (itemContainer.dataset.id !== menuTypesId.stats) {
        itemContainer.classList.remove(`main-navigation__item--active`);
      }
    });
    mainNavigationItemContainer.classList.add(`main-navigation__item--active`);
  }
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
    statistic.classList.remove(`visually-hidden`);
  } else {
    mainNavigationItemContainer.classList.remove(`main-navigation__item--active`);
    statistic.classList.add(`visually-hidden`);
  }
};

const statisticComponent = new Statistic(userTotalRating, statisticFilters,
    statisticTextList);
addElementDOM(statistic, statisticComponent);

const pageController = new PageController(films, filmsDetails, sort);
pageController.init();

const footerComponent = new Footer(countFilmCards);
addElementDOM(footer, footerComponent);
