import ModelFilm from './models/model-film.js';
import ModelComment from './models/model-comment.js';
import {
  toJSON,
  METHODS,
  checkStatus
} from './utils';

/**
 * Class representing API for communication with the server.
 */
class API {
  /**
   * Create api.
   * @param {string} endPoint
   * @param {string} authorization
   */
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Return result load of movies.
   * @return {array}
   */
  getFilms() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelFilm.parseFilms);
  }

  /**
   * Return result load comment by id.
   * @param {string} filmId
   * @return {array}
   */
  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(toJSON)
      .then(ModelComment.parseComments);
  }

  /**
   * Return result of putting film by server.
   * @param {number} filmId
   * @param {object} data
   * @return {object}
   */
  updateFilm(filmId, data) {
    return this._load({
      url: `movies/${filmId}`,
      method: METHODS.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelFilm.parseFilm);
  }

  /**
   * Return result of deleting comment by server.
   * @param {number} commentId
   * @return {object}
   */
  deleteComment(commentId) {
    return this._load(
        {
          url: `comments/${commentId}`,
          method: METHODS.DELETE
        }
    );
  }

  /**
   * Return result of loading from server.
   * @param {string} url
   * @param {string} method
   * @param {string} body
   * @param {Headers} headers
   * @return {array}
   */
  _load({url, method = METHODS.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

export default API;
