import PageController from './controllers/page-controller.js';
import MainNavigationController
  from './controllers/main-navigation-controller.js';
import StatisticController from './controllers/statistic-controller.js';
import SearchController from './controllers/search-controller.js';
import Footer from './components/footer.js';
import Profile from './components/profile.js';
import FilmDetails from './components/film-details.js';
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
let statisticController = null;

const data = new Data();
const api = new API(data, END_POINT, getAuthorizationValue());

const bodyContainer = document.querySelector(`body`);
const headerContainer = bodyContainer.querySelector(`.header`);
const profileContainer = headerContainer.querySelector(`.profile`);
const mainContainer = bodyContainer.querySelector(`.main`);
const mainNavigationContainer =
  mainContainer.querySelector(`.main-navigation`);
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

  mainNavigationController =
    new MainNavigationController(data, pageController,
        mainNavigationContainer, filmsContainer, sortContainer,
        statisticContainer);
  mainNavigationController.init();

  const searchController = new SearchController(data, pageController,
      mainNavigationController, mainNavigationContainer,
      filmsContainer, sortContainer, statisticContainer);
  searchController.init();

  statisticController = new StatisticController(data,
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
 * Update data of film card. Get as a parameter "activeComponent"
 * - links by object of "FilmCard" and "FilmDetails".
 * @param {object} newData
 * @param {object} activeComponent
 * @param {event} evt
 */
const onDataChange = (newData, activeComponent, evt) => {
  for (const filmCard of data.filmsCardsCurrent) {
    if (filmCard.id === newData.id) {
      updateFilmCard(newData, activeComponent, evt, filmCard);
      getNewComment(newData, activeComponent, evt);
      deleteComment(newData, activeComponent, evt, filmCard.id);

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
    data.clearFilmCardCommentsCurrent();
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
  statisticController.rerender();
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
 * @param {object} activeComponent
 * @param {event} evt
 * @param {object} filmCard
 */
const updateFilmCard = (newData, activeComponent, evt, filmCard) => {
  if (newData.isSendingForm) {
    const modelFilm = getFilledModelFilm(filmCard);
    const newDataEntries = Object.entries(newData);
    for (let [key, value] of newDataEntries) {
      if (key === `userRating`
      || key === `controlsTypes`) {
        modelFilm[key] = value;
      }
    }
    updateFilmCardByServer(modelFilm.toRAW(), activeComponent, evt,
        newData.id);
  }
};

/**
 * Update comment.
 * @param {object} newData
 * @param {object} activeComponent
 * @param {object} evt
 */
const getNewComment = (newData, activeComponent, evt) => {
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
    postCommentToServer(modelComment.toRAW(), activeComponent, evt,
        newData.id);
  }
};

/**
 * Delete comment.
 * @param {object} newData
 * @param {object} activeComponent
 * @param {event} evt
 * @param {number} filmCardId
 */
const deleteComment = (newData, activeComponent, evt, filmCardId) => {
  if (newData.isDeletingComment) {
    deleteCommentToServer(newData.comment.id, activeComponent, evt,
        filmCardId);
  }
};

/**
 * Update film card by server.
 * @param {object} newFilmCard
 * @param {object} activeComponent
 * @param {event} evt
 * @param {number} filmCardId
 */
const updateFilmCardByServer = (newFilmCard, activeComponent, evt,
    filmCardId) => {
  const activeForm = evt.currentTarget;
  activeComponent.deleteErrorBorder(activeForm);
  if (activeComponent.deleteErrorBackground !== undefined) {
    activeComponent.deleteErrorBackground(evt.target);
  }
  activeComponent.blockContainer(activeForm);
  api.updateFilm(newFilmCard, filmCardId)
  .then((modifedFilmCard) => {
    data.updateFilmsCardsMain(modifedFilmCard);
    updateAppContent(modifedFilmCard.id);
    if (activeComponent instanceof FilmDetails) {
      const addComments =
        pageController.getFuncAddCommentsOfMovieController(filmCardId);
      addComments(data.filmCardCommentsCurrent);
    }
  })
  .catch(() => {
    if (activeComponent instanceof FilmDetails) {
      activeComponent.returnPastStateControlType(evt.target);
    }
    if (activeComponent.deleteErrorBackground !== undefined) {
      activeComponent.addErrorBackground(evt.target);
    }
    activeComponent.addErrorBorder(activeForm);
    activeComponent.shake(activeForm);
  })
  .then(() => {
    activeComponent.unblockContainer(activeForm);
  });
};

/**
 * Post comment to server.
 * @param {object} newComment
 * @param {object} activeComponent
 * @param {event} evt
 * @param {number} filmCardId
 */
const postCommentToServer = (newComment, activeComponent, evt,
    filmCardId) => {
  const activeForm = evt.currentTarget;
  activeComponent.deleteErrorBorder(activeForm);
  activeComponent.blockContainer(activeForm);
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
  .catch(() => {
    activeComponent.addErrorBorder(activeForm);
    activeComponent.shake(activeForm);
  })
  .then(() => {
    activeComponent.unblockContainer(activeForm);
  });
};

/**
 * Delete comment by server.
 * @param {number} commentId
 * @param {object} activeComponent
 * @param {event} evt
 * @param {number} filmCardId
 */
const deleteCommentToServer = (commentId, activeComponent, evt,
    filmCardId) => {
  const activeButton = evt.currentTarget;
  activeComponent.blockDeleting(activeButton);
  api.deleteComment(commentId)
  .then(() => {
    data.deleteCommentByFilmsCardsMain(commentId, filmCardId);
    updateAppContent(filmCardId);
    const addComments =
      pageController.getFuncAddCommentsOfMovieController(filmCardId);
    onCommentsLoad(filmCardId, addComments);
  })
  .catch(() => {
    activeComponent.shake(activeButton);
  })
  .then(() => {
    activeComponent.unblockDeleting(activeButton);
  });
};

getFilmsCardsFromServer();
