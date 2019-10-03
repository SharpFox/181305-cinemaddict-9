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
   * @param {object} data
   * @param {string} endPoint
   * @param {string} authorization
   */
  constructor(data, endPoint, authorization) {
    this._data = data;
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
      .then((filmsCards) => ModelFilm.parseFilms(this._data, filmsCards));
  }

  /**
   * Return result of putting film by server.
   * @param {object} clientData
   * @param {number} filmId
   * @return {object}
   */
  updateFilm(clientData, filmId) {
    return this._load({
      url: `movies/${filmId}`,
      method: METHODS.PUT,
      body: JSON.stringify(clientData),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then((filmCard) => ModelFilm.parseFilm(this._data, filmCard));
  }

  /**
   * Return result load comment by id.
   * @param {string} filmId
   * @return {array}
   */
  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(toJSON)
      .then((filmsCards) =>
        ModelComment.parseComments(this._data, filmsCards));
  }

  /**
   * Return result of posting comment by server.
   * @param {object} clientData
   * @param {number} filmId
   * @return {object}
   */
  postComment(clientData, filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: METHODS.POST,
      body: JSON.stringify(clientData),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then((serverData) =>
        ModelComment.parseComments(this._data, serverData));
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
