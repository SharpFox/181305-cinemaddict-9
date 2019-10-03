import PageController from './controllers/page-controller.js';
import MainNavigationController from './controllers/main-navigation-controller.js';
import StatisticController from './controllers/statistic-controller.js';
import SearchController from './controllers/search-controller.js';
import Footer from './components/footer.js';
import Profile from './components/profile.js';
import API from './api.js';
import Data from './data.js';
import ModelFilm from './models/model-film.js';
import ModelComment from './models/model-comment.js';
import {
  END_POINT,
  addElementDOM,
  getAuthorizationValue,
  removeContainerChildren
} from './utils.js';

let pageController = null;
let mainNavigationController = null;
let profileComponent = null;

const data = new Data();
const api = new API(data, END_POINT, getAuthorizationValue());

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
 * Initialization contollers and components.
 */
const init = () => {
  pageController = new PageController(data, filmsContainer,
      filmDetailsContainer, sortContainer, onDataChange, onCommentsLoad);
  pageController.init();

  mainNavigationController = new MainNavigationController(data, pageController,
      mainNavigationContainer, filmsContainer, sortContainer,
      statisticContainer);
  mainNavigationController.init();

  const searchController = new SearchController(data, pageController,
      mainNavigationController, mainNavigationContainer,
      filmsContainer, sortContainer, statisticContainer);
  searchController.init();

  const statisticController = new StatisticController(data,
      statisticContainer);
  statisticController.init();

  initProfile();

  const footerComponent = new Footer(data);
  addElementDOM(footerContainer, footerComponent);
};

/**
 * Initialization profile.
 */
const initProfile = () => {
  profileComponent = new Profile(data, profileContainer);
  addElementDOM(profileContainer, profileComponent);
};

/**
 * Get films cards from server.
 */
const getFilmsCardsFromServer = () => {
  api.getFilms()
  .then((filmsCards) => {
    data.clearFilmCardsMain();
    filmsCards.forEach((filmCard) => {
      data.addFilmCardToFilmCardsMain(filmCard);
    });
    data.fillFilmsCardsCurrent();
    init();
  })
  .catch();
};

/**
 * Update data of film card.
 * @param {object} newData
 */
const onDataChange = (newData) => {
  for (const filmCard of data.filmsCardsCurrent) {
    if (filmCard.id === newData.id) {
      updateFilmCard(newData, filmCard);
      getNewComment(newData);
      deleteComment(newData, filmCard.id);

      break;
    }
  }
};

/**
 * Load comments to details of film.
 * @param {number} filmId
 * @param {function} addComments
 */
const onCommentsLoad = (filmId, addComments) => {
  api.getComments(filmId)
  .then((comments) => {
    addComments(comments);
  })
  .catch();
};

/**
 * Обновляем содержимое кеша и страницы.
 * @param {number} filmCardId
 */
const updateAppContent = (filmCardId) => {
  data.updateFilmCardsCurrent();
  profileComponent.unrender();
  removeContainerChildren(profileContainer);
  initProfile();
  mainNavigationController.rerender();
  pageController.rerender(filmCardId);
};

/**
 * Return filled model of film based newData.
 * @param {object} filmCard
 * @return {object}
 */
const getFilledModelFilm = (filmCard) => {
  const modelFilm = new ModelFilm(data, ModelFilm.getTemplateData());
  const filmCardEntries = Object.entries(filmCard);
  for (let [key, value] of filmCardEntries) {
    modelFilm[key] = value;
  }

  return modelFilm;
};

/**
 * Update film card.
 * @param {object} newData
 * @param {object} filmCard
 */
const updateFilmCard = (newData, filmCard) => {
  if (newData.isSendingForm) {
    const modelFilm = getFilledModelFilm(filmCard);
    const newDataEntries = Object.entries(newData);
    for (let [key, value] of newDataEntries) {
      if (key === `userRating`
      || key === `controlsTypes`) {
        modelFilm[key] = value;
      }
    }
    updateFilmCardByServer(modelFilm.toRAW(), newData.id);
  }
};

/**
 * Update comment.
 * @param {object} newData
 */
const getNewComment = (newData) => {
  if (newData.isSendingComment) {
    const modelComment =
      new ModelComment(data, ModelComment.getTemplateData());
    const newDataEntries = Object.entries(newData);
    for (let [newDataKey, newDataValue] of newDataEntries) {
      if (newDataKey === `comment`) {
        const commentEntries = Object.entries(newDataValue);
        for (let [commentKey, commentValue] of commentEntries) {
          modelComment[commentKey] = commentValue;
        }
      }
    }
    postCommentToServer(modelComment.toRAW(), newData.id);
  }
};

/**
 * Delete comment.
 * @param {object} newData
 * @param {number} filmCardId
 */
const deleteComment = (newData, filmCardId) => {
  if (newData.isDeletingComment) {
    deleteCommentToServer(newData.comment.id, filmCardId);
  }
};

/**
 * Update film card by server.
 * @param {object} newFilmCard
 * @param {number} filmCardId
 */
const updateFilmCardByServer = (newFilmCard, filmCardId) => {
  api.updateFilm(newFilmCard, filmCardId)
  .then((modifedFilmCard) => {
    data.updateFilmsCardsMain(modifedFilmCard);
    updateAppContent(modifedFilmCard.id);
    const addComments =
      pageController.getFuncAddCommentsOfMovieController(filmCardId);
    onCommentsLoad(filmCardId, addComments);
  })
  .catch();
};

/**
 * Post comment to server.
 * @param {object} newComment
 * @param {number} filmCardId
 */
const postCommentToServer = (newComment, filmCardId) => {
  api.postComment(newComment, filmCardId)
  .then((responce) => {
    const modelFilm = new ModelFilm(data, responce.movie);
    data.updateFilmsCardsMain(modelFilm);
    updateAppContent(modelFilm.id);
    const addComments =
      pageController.getFuncAddCommentsOfMovieController(filmCardId);
    const comments = ModelComment.parseComments(data, responce.comments);
    addComments(comments);
  })
  .catch();
};

/**
 * Delete comment by server.
 * @param {number} commentId
 * @param {number} filmCardId
 */
const deleteCommentToServer = (commentId, filmCardId) => {
  api.deleteComment(commentId)
  .then(() => {
    data.deleteCommentByFilmsCardsMain(commentId, filmCardId);
    updateAppContent(filmCardId);
    const addComments =
      pageController.getFuncAddCommentsOfMovieController(filmCardId);
    onCommentsLoad(filmCardId, addComments);
  })
  .catch();
};

getFilmsCardsFromServer();
