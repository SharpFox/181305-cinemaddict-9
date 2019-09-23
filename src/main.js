import PageController from './controllers/page-controller.js';
import MainNavigationController from './controllers/main-navigation-controller.js';
import SearchController from './controllers/search-controller.js';
import Footer from './components/footer.js';
import Profile from './components/profile.js';
import Statistic from './components/statistic.js';
import {
  addElementDOM
} from './utils.js';
import {
  statisticFilters,
  statisticTextList,
  countFilmCards,
  userTotalRating
} from './data.js';

const bodyContainer = document.querySelector(`body`);
const headerContainer = bodyContainer.querySelector(`.header`);
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

const mainNavigationController = new MainNavigationController(pageController,
    mainNavigationContainer, filmsContainer, sortContainer, statisticContainer);
mainNavigationController.init();

const searchController = new SearchController(pageController,
    mainNavigationController, mainNavigationContainer,
    filmsContainer, sortContainer, statisticContainer);
searchController.init();

const profileComponent = new Profile(userTotalRating);
addElementDOM(profileContainer, profileComponent);

const statisticComponent = new Statistic(userTotalRating, statisticFilters,
    statisticTextList);
addElementDOM(statisticContainer, statisticComponent);

const footerComponent = new Footer(countFilmCards);
addElementDOM(footerContainer, footerComponent);
