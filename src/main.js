import {
  getSearchTemplate
} from './components/search-template.js';
import {
  getProfileTemplate
} from './components/profile-template.js';
import {
  getMainNavigationTemplate
} from './components/main-navigation-template.js';
import {
  getSortTemplate
} from './components/sort-template.js';
import {
  getStatisticTemplate
} from './components/statistic-template.js';
import {
  getFilmsListTemplate
} from './components/film-list-template.js';
import {
  getFilmCardTemplate
} from './components/film-card-template.js';
import {
  getFilmDetailsTemplate
} from './components/film-details-template.js';
import {
  getFooterTemplate
} from './components/footer-template.js';
import {
  createElement
} from './utils.js';
import {
  sortType,
  controlsTypes,
  emojiList,
  menuType,
  statisticFilters,
  statisticTextList,
  filmTitles,
  filmCards,
  countFilmCards,
  randomFilmCard,
  userRating,
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

/**
 * Add cards of film.
 */
const addFilmsCards = () => {
  const filmsCards = films.querySelectorAll(`.film-card`);
  filmsCards.forEach((node) => {
    node.addEventListener(`click`, () => {
      filmsDetails.classList.remove(`visually-hidden`);
    });
  });
};

createElement(filmsDetails, getFilmDetailsTemplate(randomFilmCard, controlsTypes, emojiList));
const filmDetailsCloseBtn = filmsDetails.querySelector(`.film-details__close-btn`);
filmDetailsCloseBtn.addEventListener(`click`, () => {
  filmsDetails.classList.add(`visually-hidden`);
});

createElement(search, getSearchTemplate());
createElement(profile, getProfileTemplate(userRating));
createElement(mainNavigation, getMainNavigationTemplate(menuType));
createElement(statistic, getStatisticTemplate(userRating, statisticFilters, statisticTextList));
createElement(sort, getSortTemplate(sortType));

filmTitles.forEach((obj) => {
  createElement(films, getFilmsListTemplate(obj));
});

addFilmsCards();

const filmsListContainer = films.querySelector(`.films-list`)
  .querySelector(`.films-list__container`);
const filmsListShowMore = films.querySelector(`.films-list__show-more`);

/**
 * Add more card.
 */
const addMoreCards = () => {
  filmCards.slice(5, 10).forEach((obj) => {
    createElement(filmsListContainer, getFilmCardTemplate(obj));
  });
  filmsListShowMore.classList.add(`visually-hidden`);
  filmsListShowMore.removeEventListener(`click`, addMoreCards);
};

filmsListShowMore.addEventListener(`click`, addMoreCards);
createElement(footer, getFooterTemplate(countFilmCards));
