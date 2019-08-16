import {
  searchTemplate
} from './components/search-template.js';
import {
  profileTemplate
} from './components/profile-template.js';
import {
  mainNavigationTemplate
} from './components/main-navigation-template.js';
import {
  sortTemplate
} from './components/sort-template.js';
import {
  statisticTemplate
} from './components/statistic-template.js';
import {
  filmListTemplate
} from './components/film-list-template.js';
import {
  filmDetailsTemplate
} from './components/film-details-template.js';
import {
  sortTypeObj,
  filmTitlesArr
} from './components/data.js';

const header = document.body.querySelector(`.header`);
const search = header.querySelector(`.search`);
const profile = header.querySelector(`.profile`);
const main = document.body.querySelector(`.main`);
const mainNavigation = main.querySelector(`.main-navigation`);
const statistic = main.querySelector(`.statistic`);
const sort = main.querySelector(`.sort`);
const films = main.querySelector(`.films`);

const filmsDetails = document.body.querySelector(`.film-details`);
filmsDetails.insertAdjacentHTML(`beforeend`, filmDetailsTemplate());
const filmDetailsCloseBtn = filmsDetails.querySelector(`.film-details__close-btn`);

search.insertAdjacentHTML(`beforeend`, searchTemplate());
profile.insertAdjacentHTML(`beforeend`, profileTemplate());

mainNavigation.insertAdjacentHTML(`beforeend`, mainNavigationTemplate());
statistic.insertAdjacentHTML(`beforeend`, statisticTemplate());
sort.insertAdjacentHTML(`beforeend`, sortTemplate(sortTypeObj));

filmTitlesArr.forEach((obj)=> {
  films.insertAdjacentHTML(`beforeend`, filmListTemplate(obj));
});

const filmCard = films.querySelectorAll(`.film-card`);
filmCard.forEach((node) => {
  node.addEventListener(`click`, () => {
    filmsDetails.classList.remove(`visually-hidden`);
  });
});

filmDetailsCloseBtn.addEventListener(`click`, () => {
  filmsDetails.classList.add(`visually-hidden`);
});
