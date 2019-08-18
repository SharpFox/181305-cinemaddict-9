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
  getFilmDetailsTemplate
} from './components/film-details-template.js';
import {
  createElement
} from './utils.js';
import {
  sortType,
  filmTitles
} from './data.js';

const header = document.body.querySelector(`.header`);
const search = header.querySelector(`.search`);
const profile = header.querySelector(`.profile`);
const main = document.body.querySelector(`.main`);
const mainNavigation = main.querySelector(`.main-navigation`);
const statistic = main.querySelector(`.statistic`);
const sort = main.querySelector(`.sort`);
const films = main.querySelector(`.films`);
const filmsDetails = document.body.querySelector(`.film-details`);

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

createElement(filmsDetails, getFilmDetailsTemplate());
const filmDetailsCloseBtn = filmsDetails.querySelector(`.film-details__close-btn`);
filmDetailsCloseBtn.addEventListener(`click`, () => {
  filmsDetails.classList.add(`visually-hidden`);
});

createElement(search, getSearchTemplate());
createElement(profile, getProfileTemplate());
createElement(mainNavigation, getMainNavigationTemplate());
createElement(statistic, getStatisticTemplate());
createElement(sort, getSortTemplate(sortType));

filmTitles.forEach((obj) => {
  createElement(films, getFilmsListTemplate(obj));
});

addFilmsCards();
