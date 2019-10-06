import AbstractComponent from './abstract-component.js';
import FilmDetails from './film-details.js';
import {
  KEYS,
  shake
} from '../utils.js';
import {
  getCommentTemplate
} from '../templates/comment-template.js';

/**
 * Class representaing comment component.
 * @extends AbstractComponent
 */
class Comment extends AbstractComponent {
  /**
   * Create comment component.
   * @param {object} data
   * @param {array} comment
   * @param {number} filmId
   * @param {function} onDataChange
   */
  constructor(data, comment, filmId, onDataChange) {
    super();
    this._data = data;
    this._filmId = filmId;
    this._id = comment.id;
    this._type = comment.type;
    this._text = comment.text;
    this._date = comment.date;
    this._author = comment.author;

    this._onDataChange = onDataChange;
    this._onDeleteComment = this._onDeleteComment.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getCommentTemplate(this);
  }

  /**
   * Block container for deleting from server.
   * @param {HTMLElement} currentContainer
   */
  blockDeleting(currentContainer) {
    currentContainer.disabled = true;
    currentContainer.innerText = `Deleting...`;
  }

  /**
   * Unblock container for deleting from server.
   * @param {HTMLElement} currentContainer
   */
  unblockDeleting(currentContainer) {
    if (currentContainer !== null) {
      currentContainer.disabled = false;
      currentContainer.innerText = `Delete`;
    }
  }

  /**
   * Draw animation for error from server.
   * @param {HTMLElement} currentContainer
   */
  shake(currentContainer) {
    shake(currentContainer);
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    element = this._getElementForBinding(element);
    if (element !== null) {
      this._bindOnDeleteComment(element);
    }
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    element = this._getElementForBinding(element);
    if (element !== null) {
      this._unbindOnDeleteComment(element);
    }
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
      const newData = FilmDetails.getNewComment(this._id, this._filmId);
      this._onDataChange(newData, this, evt);
    }
  }
}

export default Comment;
