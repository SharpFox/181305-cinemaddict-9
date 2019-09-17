import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {
  emojiList,
  ratingScales,
  filmCardControlsTypes,
  filmDetailsControlsTypes,
  filmControlsTypesId,
  userTotalRating
} from '../data.js';
import {
  addElementDOM,
  updateElementDOM
} from '../utils.js';

/**
 * Class representaing controller of move.+
 */
class MovieController {
  /**
   * Create move controller.
   * @param {object} filmCard
   * @param {HTMLElement} filmsListContainer
   * @param {HTMLElement} filmsListFilmsContainer
   * @param {HTMLElement} filmsDetailsContainer
   * @param {function} onDataChange
   * @param {function} onChangeView
   */
  constructor(filmCard, filmsListContainer, filmsListFilmsContainer,
      filmsDetailsContainer, onDataChange, onChangeView) {
    this._filmCard = filmCard;
    this._filmsListContainer = filmsListContainer;
    this._filmsListFilmsContainer = filmsListFilmsContainer;
    this._filmsDetailsContainer = filmsDetailsContainer;
    this._filmCardComponent = new FilmCard(this._filmCard, filmCardControlsTypes, onDataChange);
    this._filmDetailsComponent = new FilmDetails(this._filmsDetailsContainer,
        this._filmCard, emojiList, ratingScales, filmDetailsControlsTypes,
        filmControlsTypesId, userTotalRating);

    this._onChangeView = onChangeView;
  }

  /**
   * Create card film and film details.
   */
  init() {
    this._addFilmCard();
    this._addFilmDetails();
  }

  /**
   * Add one card of film.
   */
  _addFilmCard() {
    this._filmCard.categoriesId.forEach((category) => {
      if (this._filmsListContainer.dataset.id === category) {
        addElementDOM(this._filmsListFilmsContainer, this._filmCardComponent);
      }
    });
  }

  /**
   * Add one film details of film.
   */
  _addFilmDetails() {
    this._filmCardComponent.onOpen = () => {
      this._filmsDetailsContainer.classList.remove(`visually-hidden`);
      addElementDOM(this._filmsDetailsContainer, this._filmDetailsComponent);
      this._filmsDetailsContainer.firstElementChild.focus();
    };

    /**
     * Close film details.
     */
    this._filmDetailsComponent.onClose = () => {
      this._filmsDetailsContainer.classList.add(`visually-hidden`);
      this._filmsDetailsContainer.firstElementChild.remove();
      this._filmDetailsComponent.unrender();
    };

    /**
     * Open/close ratong of the film.
     */
    this._filmDetailsComponent.openCloseRating = () => {
      const ratingContainer =
        this._filmsDetailsContainer
        .querySelector(`.form-details__middle-container`);
      const watchedContainer = document.getElementById(`watched`);
      if (!watchedContainer.checked) {
        ratingContainer.classList.remove(`visually-hidden`);
      } else {
        ratingContainer.classList.add(`visually-hidden`);
      }
    };

    /**
     * Add emoji for new comment.
     * @param {event} evt
     */
    this._filmDetailsComponent.addEmoji = (evt) => {
      const emojiId = evt.currentTarget.htmlFor;
      this._filmDetailsComponent.addEmojiToElement(emojiId);
      const oldElement =
        this._filmsDetailsContainer
        .querySelector(`.film-details__add-emoji-label`);
      const newElement =
        this._filmDetailsComponent
        .getElementPart(`film-details__add-emoji-label`);
      const replacementСontainer =
        this._filmsDetailsContainer.querySelector(`.film-details__new-comment`);
      updateElementDOM(oldElement, newElement, replacementСontainer,
          this._filmDetailsComponent);
    };

    /**
     * Add new comment.
     * @param {event} evt
     */
    this._filmDetailsComponent.addComment = (evt) => {
      //
    };
  }
}

export default MovieController;
