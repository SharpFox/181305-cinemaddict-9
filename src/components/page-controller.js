import ButtonShowMore from './button-show-more.js';
import FilmCard from './film-card.js';
import FilmDetails from './film-details.js';
import FilmList from './film-list.js';
import {
  controlsTypes,
  emojiList,
  filmLists,
  filmsCards,
  filmsCategoriesId,
  getFilmsCardsPortion
} from '../data.js';
import {
  addElementDOM
} from '../utils.js';

/**
 * Class representaing controller of page.
 */
class PageController {
  /**
   * Create page controller.
   * @param {HTMLElement} films
   * @param {HTMLElement} filmsDetails
   */
  constructor(films, filmsDetails) {
    this._films = films;
    this._filmsDetails = filmsDetails;
    this._totalFilmPortionNumber = 1;
    this._getFilmsCards = getFilmsCardsPortion();
  }

  /**
   * Create lists of films with cards if films.
   */
  init() {
    this._addFilmList(filmsCategoriesId.AllMoviesUpcoming);
    this._addFilmList(filmsCategoriesId.TopRated);
    this._addFilmList(filmsCategoriesId.MostCommented);
  }

  /**
    * Add film lists.
    * @param {string} filmCategory
    */
  _addFilmList(filmCategory) {
    const filmsListComponent = new FilmList(filmLists[filmCategory]);
    addElementDOM(this._films, filmsListComponent);

    const filmsListElement = filmsListComponent.element;
    const filmsListContainer = this._getFilmsListContainer(filmsListElement);
    const filmsListFilmsContainer = this._getFilmsListFilmsContainer(filmsListContainer);

    this._addFilmsCards(filmCategory, filmsListContainer, filmsListFilmsContainer);

    if (filmsListElement.firstElementChild.dataset.isbutton) {
      this._createButtonShowMore(filmsListContainer);
    }
  }

  /**
   * Add one card of film.
   * @param {HTMLElement} filmsListContainer
   * @param {HTMLElement} filmsListFilmsContainer
   * @param {object} filmCard
   */
  _addFilmCard(filmsListContainer, filmsListFilmsContainer,
      filmCard) {
    const filmCardComponent = new FilmCard(filmCard);
    const filmDetailsComponent = new FilmDetails(filmCard, controlsTypes,
        emojiList);

    filmCard.categoriesId.forEach((category) => {
      if (filmsListContainer.dataset.id === category) {
        addElementDOM(filmsListFilmsContainer, filmCardComponent);
      }
    });

    filmCardComponent.onOpen = () => {
      this._filmsDetails.classList.remove(`visually-hidden`);
      addElementDOM(this._filmsDetails, filmDetailsComponent);
    };

    filmDetailsComponent.onClose = () => {
      this._filmsDetails.classList.add(`visually-hidden`);
      this._filmsDetails.firstElementChild.remove();
      filmDetailsComponent.unrender();
    };
  }

  /**
    * Add cards of film.
    * @param {string} filmCategory
    * @param {HTMLElement} filmsListContainer
    * @param {HTMLElement} filmsListFilmsContainer
    */
  _addFilmsCards(filmCategory, filmsListContainer,
      filmsListFilmsContainer) {
    const filmsCardsPortion = filmCategory === filmsCategoriesId.AllMoviesUpcoming
      ? this._getFilmsCards() : filmsCards;
    filmsCardsPortion.forEach((filmCard) => {
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCard);
    });
  }

  /**
    * Add more cards of films.
    */
  _addMoreCards() {
    const filmsCardsPortion = this._getFilmsCards();
    this._totalFilmPortionNumber += 1;
    filmsCardsPortion.forEach((filmCardPortion) => {
      const filmsListContainer = document.getElementById(filmCardPortion.categoriesId[0]);
      const filmsListFilmsContainer =
        filmsListContainer.querySelector(`.films-list__container`);
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
    });
  }

  /**
    * Create button "ShowMore".
    * @param {HTMLElement} filmsListContainer
    */
  _createButtonShowMore(filmsListContainer) {
    const buttonShowMoreComponent = new ButtonShowMore();
    addElementDOM(filmsListContainer, buttonShowMoreComponent);

    buttonShowMoreComponent.onOpen = () => {
      this._addMoreCards();
      if (this._totalFilmPortionNumber === 3) {
        document.querySelector(`.films-list__show-more`).remove();
        buttonShowMoreComponent.unrender();
      }
    };
  }

  /**
    * Return html container for list of films.
    * @param {HTMLElement} filmsListElement
    * @return {HTMLElement}
    */
  _getFilmsListContainer(filmsListElement) {
    return document.getElementById(filmsListElement.firstElementChild.dataset.id);
  }

  /**
    * Return html container for films in list of films.
    * @param {HTMLElement} filmsListContainer
    * @return {HTMLElement}
    */
  _getFilmsListFilmsContainer(filmsListContainer) {
    return filmsListContainer.querySelector(`.films-list__container`);
  }
}

export default PageController;
