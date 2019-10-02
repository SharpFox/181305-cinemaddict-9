import AbstractComponent from './abstract-component.js';
import FilmDetails from './film-details.js';
import {
  KEYS
} from '../utils.js';
import {
  getCommentsTemplate
} from './comments-template.js';

/**
 * Class representaing comments component.
 * @extends AbstractComponent
 */
class Comments extends AbstractComponent {
  /**
   * Create comments component.
   * @param {object} data
   * @param {array} comments
   * @param {number} filmId
   * @param {function} onDataChange
   */
  constructor(data, comments, filmId, onDataChange) {
    super();
    this._data = data;
    this._comments = comments;
    this._filmId = filmId;

    this._onDataChange = onDataChange;
    this._onDeleteComment = this._onDeleteComment.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getCommentsTemplate(this);
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
    this._bindOnDeleteComment(element);
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
    this._unbindOnDeleteComment(element);
  }

  /**
   * Add events for delete comments.
   * @param {DocumentFragment} element
   */
  _bindOnDeleteComment(element) {
    const commentsDeleteContainer =
      element.querySelectorAll(`.film-details__comment-delete`);
    if (commentsDeleteContainer !== null) {
      for (let commentContainer of commentsDeleteContainer) {
        commentContainer.addEventListener(`click`, this._onDeleteComment);
        commentContainer.addEventListener(`keydown`, this._onDeleteComment);
      }
    }
  }

  /**
   * Remove events for delete comments.
   * @param {DocumentFragment} element
   */
  _unbindOnDeleteComment(element) {
    const commentsDeleteContainer =
      element.querySelectorAll(`.film-details__comment-delete`);
    if (commentsDeleteContainer !== null) {
      for (let commentContainer of commentsDeleteContainer) {
        commentContainer.removeEventListener(`click`, this._onDeleteComment);
        commentContainer.removeEventListener(`keydown`, this._onDeleteComment);
      }
    }
  }

  /**
   * Call the function for delete comment.
   * @param {event} evt
   */
  _onDeleteComment(evt) {
    if (evt.keyCode === KEYS.ENTER || evt.type === `click`) {
      evt.preventDefault();
      this._onDataChange(
          FilmDetails.
          getNewComment(Number(evt.target.dataset.id), this._filmId));
    }
  }
}

export default Comments;
