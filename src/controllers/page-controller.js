import ButtonShowMore from '../components/button-show-more.js';
import FilmList from '../components/film-list.js';
import MovieController from '../controllers/movie-controller.js';
import Sort from '../components/sort.js';
import {
  addElementDOM,
  removeContainerChildren,
  createElement
} from '../utils.js';

/**
 * Class representaing controller of page.
 */
class PageController {
  /**
   * Create page controller.
   * @param {object} data
   * @param {HTMLElement} filmsContainer
   * @param {HTMLElement} filmDetailsContainer
   * @param {HTMLElement} sortContainer
   * @param {fuction} onDataChange
   * @param {function} onCommentsLoad
   */
  constructor(data, filmsContainer, filmDetailsContainer, sortContainer,
      onDataChange, onCommentsLoad) {
    this._data = data;
    this._filmsContainer = filmsContainer;
    this._filmDetailsContainer = filmDetailsContainer;
    this._sortContainer = sortContainer;
    this._totalFilmPortionNumber = 1;
    this._movieControllers = [];
    this._filmsListsComponents = [];
    this._getFilmsCards = this._data.getFilmsCardsPortion();

    this._onDataChange = onDataChange;
    this._onCommentsLoad = onCommentsLoad;
  }

  /**
   * Create lists of films with cards if films.
   */
  init() {
    if (!this._data.filmsCardsCurrent.length) {
      this._renderStringOfAbsenceFilms();
      return;
    }
    this._renderSortComponent();
    this._addFilmsLists();
  }

  /**
   * Add film lists from card portion.
   * @param {string} filmCategory
   * @param {string} filmsCards
   */
  addFilmsList(filmCategory, filmsCards) {
    if (filmsCards === undefined) {
      filmsCards = this._data.filmsCardsCurrent;
    }
    if (!filmsCards.length) {
      return;
    }
    const filmsListComponent = new FilmList(this._data.filmLists[filmCategory]);
    this._filmsListsComponents.push(filmsListComponent);
    addElementDOM(this._filmsContainer, filmsListComponent);
    const filmsListContainer =
      this._getFilmsListContainer(filmsListComponent.element);
    const needButton = filmsCards !== undefined ? true : false;
    this._addFilmsCards(filmsCards, filmsListContainer,
        this._getFilmsListFilmsContainer(filmsListContainer));
    this._createButtonForFilmsList(filmsListComponent.element,
        filmsListContainer, needButton);
  }

  /**
   * Sort film cards.
   * @param {string} currentSortType
   */
  sortFilmsCards(currentSortType) {
    const filmCategory = this._data.filmsCategoriesId.AllMoviesUpcoming;
    const filmsListContainer = document.getElementById(filmCategory);
    const filmsListFilmsContainer = this._getFilmsListFilmsContainer(filmsListContainer);
    const currentCountFilmsCards = filmsListFilmsContainer.children.length;
    const filmsCardsForSort = this._getFilmsCardsForSort(currentCountFilmsCards);

    removeContainerChildren(filmsListFilmsContainer);
    this._chooseSortFilmsCards(filmsCardsForSort, currentSortType);
    this._addFilmsCards(filmsCardsForSort, filmsListContainer, filmsListFilmsContainer);
    this._changeActiveSort(currentSortType);
  }

  /**
   * Unrender FilmCardComponent and FilmDetailsComponent.
   */
  unrenderComponentsMoviesControllers() {
    this._movieControllers.forEach((movieController) => {
      movieController.unrenderComponents();
    });
  }

  /**
   * Unrender films lists components.
   */
  unrenderFilmsListsComponents() {
    this._filmsListsComponents.forEach((filmListComponent) => {
      filmListComponent.unrender();
    });
  }

  /**
   * Update data of film card.
   * @param {number} filmId
   */
  rerender(filmId) {
    this.unrenderFilmsListsComponents();
    this.unrenderComponentsMoviesControllers();
    this._data.changefilmsCardsPortionCount(
        this._data.totalDownloadedFilmsCards);

    removeContainerChildren(this._filmsContainer);
    const containerfilmsDetailsHaveChildren =
      this._filmDetailsContainer.children.length;
    removeContainerChildren(this._filmDetailsContainer);

    this._addFilmsLists();
    if (filmId !== undefined) {
      this.renderFilmDetails(filmId, containerfilmsDetailsHaveChildren);
    }
  }

  /**
   * Render film details.
   * @param {number} id
   * @param {boolean} containerfilmsDetailsHaveChildren
   */
  renderFilmDetails(id, containerfilmsDetailsHaveChildren) {
    for (const component of this._movieControllers) {
      if ((component.id === id) && containerfilmsDetailsHaveChildren) {
        component.openFilmDetails();
        break;
      }
    }
  }

  /**
   * Return function "AddComment" of specific сomponent
   * of film card.
   * @param {number} filmCardId
   * @return {function}
   */
  getFuncAddCommentsOfMovieController(filmCardId) {
    let addComments = null;
    for (let movieController of this._movieControllers) {
      if (movieController.id === filmCardId) {
        addComments = movieController.addComments;
        break;
      }
    }

    return addComments;
  }

  /**
   * Add films lists.
   */
  _addFilmsLists() {
    this._movieControllers = [];
    this._filmsListsComponents = [];

    this.addFilmsList(this._data.filmsCategoriesId.AllMoviesUpcoming,
        this._getFilmsCards());
    this.addFilmsList(this._data.filmsCategoriesId.TopRated,
        this._data.getExtraFilmsTopRated());
    this.addFilmsList(this._data.filmsCategoriesId.MostCommented,
        this._data.getExtraFilmsMostCommented());
  }

  /**
   * Render string of absence films.
   */
  _renderStringOfAbsenceFilms() {
    const element =
      createElement(`<p>There are no movies in our database</p>`);
    this._filmsContainer.appendChild(element);
  }

  /**
   * Render sort component.
   */
  _renderSortComponent() {
    Object.entries(this._data.sortTypes).map((sortType) => {
      const sortComponent = new Sort(sortType);
      addElementDOM(this._sortContainer, sortComponent);

      sortComponent.onSort = () => {
        this.sortFilmsCards(sortComponent.getSortType());
      };
    });
  }

  /**
   * Sort films card.
   * @param {array} filmsCards
   * @param {string} currentSortType
   */
  _chooseSortFilmsCards(filmsCards, currentSortType) {
    switch (currentSortType) {
      case this._data.sortTypesId.date:
        filmsCards.sort(this._data.getSortFunctionForFilmByDate);
        break;
      case this._data.sortTypesId.rating:
        filmsCards.sort(this._data.getSortFunctionForFilmByRating);
        break;
      default:
        break;
    }
  }

  /**
   * Сhange the display of active sorting.
   * @param {string} currentSortType
   */
  _changeActiveSort(currentSortType) {
    const sortButtonActiveContainer =
      document.querySelector(`.sort__button--active`);
    sortButtonActiveContainer.classList.remove(`sort__button--active`);
    const sorts = this._sortContainer.children;
    for (let sort of sorts) {
      if (sort.firstElementChild.dataset.sorttype === currentSortType) {
        sort.firstElementChild.classList.add(`sort__button--active`);
      }
    }
  }

  /**
   * Return array film cards for sorting.
   * @param {number} currentCountFilmsCards
   * @return {array}
   */
  _getFilmsCardsForSort(currentCountFilmsCards) {
    return this._data.filmsCardsCurrent.slice(0, currentCountFilmsCards);
  }

  /**
   * Add cards of film.
   * @param {array} filmsCards
   * @param {HTMLElement} filmsListContainer
   * @param {HTMLElement} filmsListFilmsContainer
   */
  _addFilmsCards(filmsCards, filmsListContainer,
      filmsListFilmsContainer) {
    filmsCards.forEach((filmCard) => {
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCard);
    });
  }

  /**
   * Add one card of film.
   * @param {HTMLElement} filmsListContainer
   * @param {HTMLElement} filmsListFilmsContainer
   * @param {object} filmCard
   */
  _addFilmCard(filmsListContainer, filmsListFilmsContainer,
      filmCard) {
    const movieController = new MovieController(this._data, filmCard, filmsListContainer,
        filmsListFilmsContainer, this._filmDetailsContainer,
        this._onDataChange, this._onCommentsLoad);
    movieController.init();
    this._movieControllers.push(movieController);
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

  /**
   * Solves the need to create a button "Show more".
   * @param {HTMLElement} filmsListElement
   * @param {HTMLElement} filmsListContainer
   * @param {boolean} needButton
   */
  _createButtonForFilmsList(filmsListElement, filmsListContainer, needButton) {
    if ((filmsListElement.firstElementChild.dataset.isbutton)
      && this._data.totalDownloadedFilmsCards < this._data.filmsCardsCurrent.length
      && needButton) {
      this._createButtonShowMore(filmsListContainer);
    }
  }

  /**
    * Create button "ShowMore".
    * @param {HTMLElement} filmsListContainer
    */
  _createButtonShowMore(filmsListContainer) {
    const buttonShowMoreComponent = new ButtonShowMore();
    addElementDOM(filmsListContainer, buttonShowMoreComponent);

    buttonShowMoreComponent.onOpen = () => {
      this._data.setNumberDownloadedFilmsCards();
      this._addMoreCards();
      if (this._totalFilmPortionNumber === this._data.getMaxFilmPortionNumber()) {
        document.querySelector(`.films-list__show-more`).remove();
        buttonShowMoreComponent.unrender();
      }
    };
  }

  /**
   * Add more cards of films.
   */
  _addMoreCards() {
    const filmsCardsPortion = this._getFilmsCards();
    this._totalFilmPortionNumber += 1;
    filmsCardsPortion.forEach((filmCardPortion) => {
      const filmsListContainer = document.getElementById(this._data.filmsCategoriesId.AllMoviesUpcoming);
      const filmsListFilmsContainer =
        filmsListContainer.querySelector(`.films-list__container`);
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
    });
  }
}

export default PageController;
