import {
  getFilmCardTemplate
} from './film-card-template.js';
import {
  KEYS
} from '../utils.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing film card.
 * @extends AbstractComponent
 */
class FilmCard extends AbstractComponent {
  /**
   * Create film card.
   * @param {object} filmCard
   * @param {function} onDataChange
   */
  constructor({id, title, rating, year, duration, genres, img,
    description, comments, controlsTypes}, onDataChange) {
    super();
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
      this._onDataChange(this._processForm(evt.target, this._id));
    }
  }

  /**
   * Return new data object.
   * @param {event} target
   * @param {number} filmCardId
   * @return {object}
   */
  _processForm(target, filmCardId) {
    const newData = {
      isSendingForm: true,
      id: filmCardId,
      controlsTypes: []
    };

    const filmCardMapper = this._createMapper(newData);
    const formContainer = document.getElementById(`form-film-card-controls-${filmCardId}`);
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
}

export default FilmCard;
