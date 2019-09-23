import ButtonShowMore from '../components/button-show-more.js';
import FilmList from '../components/film-list.js';
import MovieController from '../controllers/movie-controller.js';
import Sort from '../components/sort.js';
import {
  filmLists,
  filmsCardsCurrent,
  filmsCategoriesId,
  getFilmsCardsPortion,
  sortTypes,
  sortTypesId,
  changefilmsCardsPortionCount,
  updateServerData,
  totalDownloadedFilmsCards,
  setNumberDownloadedFilmsCards
} from '../data.js';
import {
  addElementDOM,
  removeContainerChildren
} from '../utils.js';
import moment from 'moment';

/**
 * Class representaing controller of page.
 */
class PageController {
  /**
   * Create page controller.
   * @param {HTMLElement} filmsContainer
   * @param {HTMLElement} filmsDetailsContainer
   * @param {HTMLElement} sortContainer
   */
  constructor(filmsContainer, filmsDetailsContainer, sortContainer) {
    this._filmsContainer = filmsContainer;
    this._filmsDetailsContainer = filmsDetailsContainer;
    this._sortContainer = sortContainer;
    this._totalFilmPortionNumber = 1;
    this._movieControllers = [];
    this._getFilmsCards = getFilmsCardsPortion();

    this._onDataChange = this._onDataChange.bind(this);
  }

  /**
   * Create lists of films with cards if films.
   */
  init() {
    this._renderSortComponent();
    this._addFilmsLists();
  }

  /**
   * Add film lists from card portion.
   * @param {string} filmCategory
   * @param {string} filmsCards
   */
  addFilmsList(filmCategory, filmsCards) {
    const filmsListComponent = new FilmList(filmLists[filmCategory]);
    addElementDOM(this._filmsContainer, filmsListComponent);
    const filmsListContainer =
      this._getFilmsListContainer(filmsListComponent.element);
    const needButton = filmsCards !== undefined ? true : false;
    if (filmsCards === undefined) {
      filmsCards = filmsCardsCurrent;
    }
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
    const filmCategory = filmsCategoriesId.AllMoviesUpcoming;
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
   * Add films lists.
   */
  _addFilmsLists() {
    this._movieControllers = [];
    this.addFilmsList(filmsCategoriesId.AllMoviesUpcoming,
        this._getFilmsCards());
    this.addFilmsList(filmsCategoriesId.TopRated);
    this.addFilmsList(filmsCategoriesId.MostCommented);
  }

  /**
   * Update data of film card.
   * @param {object} newData
   */
  _onDataChange(newData) {
    updateServerData(newData);
    changefilmsCardsPortionCount(totalDownloadedFilmsCards);
    removeContainerChildren(this._filmsContainer);
    const containerfilmsDetailsHaveChildren =
      this._filmsDetailsContainer.children.length;
    removeContainerChildren(this._filmsDetailsContainer);
    this._addFilmsLists();
    this._renderFilmDetails(newData.id, containerfilmsDetailsHaveChildren);
  }

  /**
   * Render film details.
   * @param {number} id
   * @param {boolean} containerfilmsDetailsHaveChildren
   */
  _renderFilmDetails(id, containerfilmsDetailsHaveChildren) {
    for (const component of this._movieControllers) {
      if ((component.id === id) && containerfilmsDetailsHaveChildren) {
        component.openFilmDetails();
        break;
      }
    }
  }

  /**
   * Render sort component.
   */
  _renderSortComponent() {
    Object.entries(sortTypes).map((sortType) => {
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
      case sortTypesId.date:
        filmsCards.sort((firstFilmCard, secondFilmCard) => {
          return moment(secondFilmCard.year) - moment(firstFilmCard.year);
        });
        break;
      case sortTypesId.rating:
        filmsCards.sort((firstFilmCard, secondFilmCard) => {
          return secondFilmCard.rating - firstFilmCard.rating;
        });
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
    return filmsCardsCurrent.slice(0, currentCountFilmsCards);
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
    const movieController = new MovieController(filmCard, filmsListContainer,
        filmsListFilmsContainer, this._filmsDetailsContainer,
        this._onDataChange);
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
      && totalDownloadedFilmsCards < filmsCardsCurrent.length
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
      setNumberDownloadedFilmsCards();
      this._addMoreCards();
      if (this._totalFilmPortionNumber === 3) {
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
      const filmsListContainer = document.getElementById(filmCardPortion.categoriesId[0]);
      const filmsListFilmsContainer =
        filmsListContainer.querySelector(`.films-list__container`);
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
    });
  }
}

export default PageController;
