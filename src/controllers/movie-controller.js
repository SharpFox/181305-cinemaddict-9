import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {
  addElementDOM,
  updateElementDOM
} from '../utils.js';
import {
  emojiList,
} from '../data.js';

/**
 * Class representaing controller of move.+
 */
class MovieController {
  /**
   * Create move controller.
   * @param {object} filmCard
   * @param {HTMLElement} filmsListContainer
   * @param {HTMLElement} filmsListFilmsContainer
   * @param {HTMLElement} filmDetailsContainer
   * @param {function} onDataChange
   */
  constructor(filmCard, filmsListContainer, filmsListFilmsContainer,
      filmDetailsContainer, onDataChange) {
    this._id = filmCard.id;
    this._filmCard = filmCard;
    this._filmsListContainer = filmsListContainer;
    this._filmsListFilmsContainer = filmsListFilmsContainer;
    this._filmDetailsContainer = filmDetailsContainer;
    this._filmCardComponent = new FilmCard(this._filmCard, onDataChange);
    this._filmDetailsComponent = new FilmDetails(this._filmDetailsContainer,
        this._filmCard, onDataChange);
  }

  /**
   * Return id of film card.
   * @return {number}
   */
  get id() {
    return this._id;
  }

  /**
   * Create card film and film details.
   */
  init() {
    this._addFilmCard();
    this._addFilmDetails();
  }

  /**
   * Open film details.
   */
  openFilmDetails() {
    this._filmDetailsContainer.classList.remove(`visually-hidden`);
    addElementDOM(this._filmDetailsContainer, this._filmDetailsComponent);
    this._filmDetailsContainer.firstElementChild.focus();
  }

  /**
   * Delete elements of FilmCardComponent and FilmDetailsComponent.
   */
  unrenderComponents() {
    this._filmCardComponent.unrender();
    this._filmDetailsComponent.unrender();
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
      if (document.body.querySelector(`.film-details__inner`) === null) {
        this.openFilmDetails();
      }
    };

    /**
     * Close film details.
     */
    this._filmDetailsComponent.onClose = () => {
      this._filmDetailsContainer.classList.add(`visually-hidden`);
      this._filmDetailsContainer.firstElementChild.remove();
    };

    /**
     * Open/close ratong of the film.
     */
    this._filmDetailsComponent.openCloseRating = () => {
      const ratingContainer =
        this._filmDetailsContainer
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
      this._addEmojiToFilmDetailsElement(evt.currentTarget.htmlFor);
      this._updateEmojiInFilmDetailsContainer();
      evt.currentTarget.control.checked = true;
      evt.currentTarget.focus();
    };
  }

  /**
   * Add emoji to element of film details component.
   * @param {string} emojiId
   */
  _addEmojiToFilmDetailsElement(emojiId) {
    let emojiPath = null;
    emojiList.forEach((emoji) => {
      if (emojiId === emoji.id) {
        emojiPath = emoji.img;
      }
    });
    const addEmojiLabelContainer =
      this._filmDetailsComponent.element
      .querySelector(`.film-details__add-emoji-label`);
    const imgElement = document.createElement(`img`);
    imgElement.src = emojiPath;
    imgElement.width = 55;
    imgElement.height = 55;
    imgElement.alt = `emoji`;
    imgElement.id = `add-emoji`;
    if (addEmojiLabelContainer.firstElementChild !== null) {
      addEmojiLabelContainer.firstElementChild.remove();
    }
    addEmojiLabelContainer.appendChild(imgElement);
  }

  /**
   * Update emoji in film details container.
   */
  _updateEmojiInFilmDetailsContainer() {
    const oldElement =
    this._filmDetailsContainer
    .querySelector(`.film-details__add-emoji-label`);
    const newElement =
      this._filmDetailsComponent
      .getElementPart(`film-details__add-emoji-label`);
    const replacementСontainer =
      this._filmDetailsContainer.querySelector(`.film-details__new-comment`);
    updateElementDOM(oldElement, newElement, replacementСontainer,
        this._filmDetailsComponent);
  }
}

export default MovieController;
