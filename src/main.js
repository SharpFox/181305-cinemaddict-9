import PageController from './controllers/page-controller.js';
import MainNavigationController from './controllers/main-navigation-controller.js';
import StatisticController from './controllers/statistic-controller.js';
import SearchController from './controllers/search-controller.js';
import Footer from './components/footer.js';
import Profile from './components/profile.js';
import API from './api.js';
import {
  END_POINT,
  addElementDOM,
  getAuthorizationValue
} from './utils.js';
import {
  filmsCardsMain,
  addFilmCardToFilmCardsMain,
  addCommentToFilmsCardsMain,
  fillFilmsCardsCurrent
} from './data.js';

const api = new API(END_POINT, getAuthorizationValue());

const bodyContainer = document.querySelector(`body`);
const headerContainer = bodyContainer.querySelector(`.header`);
const profileContainer = headerContainer.querySelector(`.profile`);
const mainContainer = bodyContainer.querySelector(`.main`);
const mainNavigationContainer = mainContainer.querySelector(`.main-navigation`);
const statisticContainer = mainContainer.querySelector(`.statistic`);
const sortContainer = mainContainer.querySelector(`.sort`);
const filmsContainer = mainContainer.querySelector(`.films`);
const filmDetailsContainer = bodyContainer.querySelector(`.film-details`);
const footerContainer = bodyContainer.querySelector(`.footer`);

/**
 * Initialization application.
 */
const init = () => {
  fillFilmsCardsCurrent();

  const pageController = new PageController(filmsContainer, filmDetailsContainer,
      sortContainer);
  pageController.init();

  const mainNavigationController = new MainNavigationController(pageController,
      mainNavigationContainer, filmsContainer, sortContainer, statisticContainer);
  mainNavigationController.init();

  const searchController = new SearchController(pageController,
      mainNavigationController, mainNavigationContainer,
      filmsContainer, sortContainer, statisticContainer);
  searchController.init();

  const statisticController = new StatisticController(statisticContainer);
  statisticController.init();

  const profileComponent = new Profile();
  addElementDOM(profileContainer, profileComponent);

  const footerComponent = new Footer();
  addElementDOM(footerContainer, footerComponent);
};

/**
 * Get films cards from server.
 */
const getFilmsCardsFromServer = () => {
  api.getFilms()
  .then((filmsCards) => {
    filmsCards.forEach((filmCard) => {
      addFilmCardToFilmCardsMain(filmCard);
    });
    getComments();
    init();
  })
  .catch();
};

/**
 * Get and add comments to FilmsCardsMain.
 */
const getComments = () => {
  filmsCardsMain.forEach((filmCard) => {
    api.getComments(filmCard.id)
    .then((comments) => {
      addCommentToFilmsCardsMain(comments, filmCard.id);
    });
  });
};

getFilmsCardsFromServer();
