import AbstractComponent from './abstract-component.js';
import FilmDetails from './film-details.js';
import {
  KEYS,
  addErrorBorder,
  deleteErrorBorder,
  blockContainer,
  unblockContainer,
  shake
} from '../utils.js';
import {
  getFilmCardTemplate
} from '../templates/film-card-template.js';

/**
 * Class representaing film card.
 * @extends AbstractComponent
 */
class FilmCard extends AbstractComponent {
  /**
   * Create film card.
   * @param {object} data
   * @param {object} filmCard
   * @param {function} onDataChange
   */
  constructor(data, {id, title, rating, year, duration, genres, img,
    description, comments, controlsTypes}, onDataChange) {
    super();
    this._data = data;
    this._id = id;
    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._img = img;
    this._description = description;
    this._comments = comments;
    this._controlsTypes = controlsTypes;
    this._onDataChange = onDataChange;

    this._onOpen = null;
    this._onOpenDetails = this._onOpenDetails.bind(this);
    this._onSendForm = this._onSendForm.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getFilmCardTemplate(this);
  }

  /**
   * Save the function for open film details.
   * @param {function} fn
   */
  set onOpen(fn) {
    this._onOpen = fn;
  }

  /**
   * Add error color for border of form.
   * @param {HTMLElement} currentContainer
   */
  addErrorBorder(currentContainer) {
    addErrorBorder(currentContainer);
  }

  /**
   * Delete error color for border of form.
   * @param {HTMLElement} currentContainer
   */
  deleteErrorBorder(currentContainer) {
    deleteErrorBorder(currentContainer);
  }

  /**
   * Draw animation for error from server.
   * @param {HTMLElement} currentContainer
   */
  shake(currentContainer) {
    shake(currentContainer);
  }

  /**
   * Block form for posting to server.
   * @param {HTMLElement} currentContainer
   */
  blockContainer(currentContainer) {
    blockContainer(currentContainer);
  }

  /**
   * Unblock form for posting to server.
   * @param {HTMLElement} currentContainer
   */
  unblockContainer(currentContainer) {
    unblockContainer(currentContainer);
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    if (element === null) {
      element = this._element;
    }
    if (element === null) {
      return;
    }
    this._bindOnOpenDetails(element);
    this._bindOnSendForm(element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    if (element === null) {
      element = this._element;
    }
    if (element === null) {
      return;
    }
    this._unbindOnOpenDetails(element);
    this._unbindOnSendForm(element);
  }

  /**
   * Add events for open details of element.
   * @param {DocumentFragment} element
   */
  _bindOnOpenDetails(element) {
    const posterContainer = element.querySelector(`.film-card__poster`);
    if (posterContainer !== null) {
      posterContainer.addEventListener(`click`, this._onOpenDetails);
      posterContainer.addEventListener(`keydown`, this._onOpenDetails);
    }

    const commentsContainer = element.querySelector(`.film-card__comments`);
    if (commentsContainer !== null) {
      commentsContainer.addEventListener(`click`, this._onOpenDetails);
      commentsContainer.addEventListener(`keydown`, this._onOpenDetails);
    }

    const titleContainer = element.querySelector(`.film-card__title`);
    if (titleContainer !== null) {
      titleContainer.addEventListener(`click`, this._onOpenDetails);
      titleContainer.addEventListener(`keydown`, this._onOpenDetails);
    }
  }

  /**
   * Add events for send form.
   * @param {DocumentFragment} element
   */
  _bindOnSendForm(element) {
    const controlsContainer = element.querySelector(`.film-card__controls`);
    if (controlsContainer !== null) {
      controlsContainer.addEventListener(`click`, this._onSendForm);
      controlsContainer.addEventListener(`keydown`, this._onSendForm);
    }
  }

  /**
   * Remove events for open details of element.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenDetails(element) {
    const posterContainer = element.querySelector(`.film-card__poster`);
    if (posterContainer !== null) {
      posterContainer.removeEventListener(`click`, this._onOpenDetails);
      posterContainer.removeEventListener(`keydown`, this._onOpenDetails);
    }

    const commentsContainer = element.querySelector(`.film-card__comments`);
    if (commentsContainer !== null) {
      commentsContainer.removeEventListener(`click`, this._onOpenDetails);
      commentsContainer.removeEventListener(`keydown`, this._onOpenDetails);
    }

    const titleContainer = element.querySelector(`.film-card__title`);
    if (titleContainer !== null) {
      titleContainer.removeEventListener(`click`, this._onOpenDetails);
      titleContainer.removeEventListener(`keydown`, this._onOpenDetails);
    }
  }

  /**
   * Remove events for sending form.
   * @param {DocumentFragment} element
   */
  _unbindOnSendForm(element) {
    const controlsContainer = element.querySelector(`.film-card__controls`);
    if (controlsContainer !== null) {
      controlsContainer.removeEventListener(`click`, this._onSendForm);
      controlsContainer.removeEventListener(`keydown`, this._onSendForm);
    }
  }

  /**
   * Return new data object.
   * @param {event} target
   * @return {object}
   */
  _processForm(target) {
    const newData = FilmDetails.getEmptyNewData();
    newData.isSendingForm = true;
    newData.id = this._id;

    newData.controlsTypes.forEach((controlType) => {
      if (controlType === this._data.filmControlsTypesId.watched) {
        newData.userRating = this._data.getCurrentUserRating(this._id);
      }
    });


    const filmCardMapper = this._createMapper(newData);
    const formContainer = document.getElementById(`form-film-card-controls-${this._id}`);
    const childs = formContainer.children;
    for (const buttonItem of childs) {
      const isActive =
        buttonItem.classList.contains(`film-card__controls-item--active`);
      if (buttonItem.dataset.id === target.dataset.id) {
        if (!isActive) {
          filmCardMapper[buttonItem.name](buttonItem.value);
        }
      } else {
        if (isActive) {
          filmCardMapper[buttonItem.name](buttonItem.value);
        }
      }
    }

    return newData;
  }

  /**
   * Create map of object.
   * @param {DOM} newData
   * @return {object}
   */
  _createMapper(newData) {
    return {
      'watchlist': (value) => {
        newData.controlsTypes.push(value);
      },
      'watched': (value) => {
        newData.controlsTypes.push(value);
      },
      'favorite': (value) => {
        newData.controlsTypes.push(value);
      }
    };
  }

  /**
   * Call the fuction for open details about film.
   * @param {event} evt
   */
  _onOpenDetails(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._onOpen === `function`)) {
      this._onOpen();
    }
  }

  /**
   * Call the fuction for send form.
   * @param {event} evt
   */
  _onSendForm(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      evt.preventDefault();
      const newData = this._processForm(evt.target);
      this._onDataChange(newData, this, evt);
    }
  }
}

export default FilmCard;
