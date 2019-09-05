import ButtonShowMore from './components/button-show-more.js';
import FilmCard from './components/film-card.js';
import FilmDetails from './components/film-details.js';
import FilmList from './components/film-list.js';
import Footer from './components/footer.js';
import MainNavigation from './components/main-navigation.js';
import Profile from './components/profile.js';
import Search from './components/search.js';
import Sort from './components/sort.js';
import Statistic from './components/statistic.js';
import {
  addElement
} from './utils.js';
import {
  sortTypes,
  controlsTypes,
  emojiList,
  filmLists,
  menuTypes,
  statisticFilters,
  statisticTextList,
  filmsCards,
  countFilmCards,
  userRating,
  filmsCategoriesId,
  getFilmsCardsPortion,
} from './data.js';

let totalFilmPortionNumber = 1;
const getFilmsCards = getFilmsCardsPortion();

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
addElement(search, searchComponent.render());

const profileComponent = new Profile(userRating);
addElement(profile, profileComponent.render());

const mainNavigationComponent = new MainNavigation(menuTypes);
addElement(mainNavigation, mainNavigationComponent.render());

const statisticComponent = new Statistic(userRating, statisticFilters,
    statisticTextList);
addElement(statistic, statisticComponent.render());

const sortComponent = new Sort(sortTypes);
addElement(sort, sortComponent.render());

/**
 * Add one card of film.
 * @param {HTMLElement} filmsListContainer
 * @param {HTMLElement} filmsListFilmsContainer
 * @param {object} filmCard
 */
const addFilmCard = (filmsListContainer, filmsListFilmsContainer,
    filmCard) => {
  const filmCardComponent = new FilmCard(filmCard);
  const filmDetailsComponent = new FilmDetails(filmCard, controlsTypes,
      emojiList);

  filmCard.categoriesId.forEach((category) => {
    if (filmsListContainer.dataset.id === category) {
      addElement(filmsListFilmsContainer, filmCardComponent.render());
    }
  });

  filmCardComponent.onOpen = () => {
    filmsDetails.classList.remove(`visually-hidden`);
    addElement(filmsDetails, filmDetailsComponent.render());
  };

  filmDetailsComponent.onClose = () => {
    filmsDetails.classList.add(`visually-hidden`);
    filmsDetails.removeChild(filmDetailsComponent.element);
    filmDetailsComponent.unrender();
  };
};

/**
 * Add cards of film.
 * @param {string} filmCategory
 * @param {HTMLElement} filmsListContainer
 * @param {HTMLElement} filmsListFilmsContainer
 */
const addFilmsCards = (filmCategory, filmsListContainer,
    filmsListFilmsContainer) => {
  const filmsCardsPortion = filmCategory === filmsCategoriesId.AllMoviesUpcoming
    ? getFilmsCards() : filmsCards;
  filmsCardsPortion.forEach((filmCard) => {
    addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCard);
  });
};

/**
 * Add more cards of films.
 */
const addMoreCards = () => {
  const filmsCardsPortion = getFilmsCards();
  totalFilmPortionNumber += 1;
  filmsCardsPortion.forEach((filmCardPortion) => {
    const filmsListContainer = document.getElementById(filmCardPortion.categoriesId[0]);
    const filmsListFilmsContainer =
      filmsListContainer.querySelector(`.films-list__container`);
    addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
  });
};

/**
 * Add film list.
 * @param {string} filmCategory
 */
const addFilmList = (filmCategory) => {
  const filmsListComponent = new FilmList(filmLists[filmCategory]);
  addElement(films, filmsListComponent.render());
  const filmsListElement = filmsListComponent.element.firstElementChild;
  const filmsListContainer =
    document.getElementById(filmsListElement.dataset.id);
  const filmsListFilmsContainer =
    filmsListContainer.querySelector(`.films-list__container`);
  addFilmsCards(filmCategory, filmsListContainer, filmsListFilmsContainer);

  if (filmsListElement.dataset.isbutton === `true`) {
    const buttonShowMoreComponent = new ButtonShowMore();
    addElement(filmsListContainer, buttonShowMoreComponent.render());

    buttonShowMoreComponent.onOpen = () => {
      addMoreCards();
      if (totalFilmPortionNumber === 3) {
        document.querySelector(`.films-list__show-more`).remove();
        buttonShowMoreComponent.unrender();
      }
    };
  }
};

addFilmList(filmsCategoriesId.AllMoviesUpcoming);
addFilmList(filmsCategoriesId.TopRated);
addFilmList(filmsCategoriesId.MostCommented);

const footerComponent = new Footer(countFilmCards);
addElement(footer, footerComponent.render());
