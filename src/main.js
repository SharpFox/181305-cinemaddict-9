import PageController from './components/page-controller.js';
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
  statisticFilters,
  statisticTextList,
  countFilmCards,
  userRating
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

const profileComponent = new Profile(userRating);
addElementDOM(profile, profileComponent);

const mainNavigationComponent = new MainNavigation(menuTypes);
addElementDOM(mainNavigation, mainNavigationComponent);

const statisticComponent = new Statistic(userRating, statisticFilters,
    statisticTextList);
addElementDOM(statistic, statisticComponent);

const pageController = new PageController(films, filmsDetails, sort);
pageController.init();

const footerComponent = new Footer(countFilmCards);
addElementDOM(footer, footerComponent);
