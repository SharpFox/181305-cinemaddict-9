import moment from 'moment';
import ModelFilm from './model-film.js';

/**
 * Class representing model of comment.
 */
class ModelComment {
  /**
   * Create model of comment.
   * @param {object} data
   * @param {object} serverDataPart
   */
  constructor(data, serverDataPart) {
    this._data = data;
    this.id = Number(serverDataPart.id);
    this.type = serverDataPart.emotion;
    this.text = serverDataPart.comment;
    this.date = moment(serverDataPart.date).toDate();
    this.author = serverDataPart.author;
    this.movie =
      serverDataPart.movie === undefined
        ? null : new ModelFilm(this._data, serverDataPart.movie);
    this.comments = this._getComments(serverDataPart.comments);
  }

  /**
   * Return RAW object for server.
   * @return {object}
   */
  toRAW() {
    return {
      'comment': this.text,
      'date':
        moment(this.date).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`),
      'emotion': this.type
    };
  }

  /**
   * Return transformed comments.
   * @param {array} serverComments
   * @return {array}
   */
  _getComments(serverComments) {
    const comments = [];
    if (serverComments === undefined) {
      return comments;
    }
    serverComments.forEach((comment) => {
      comments.push(new ModelComment(comment));
    });

    return comments;
  }

  /**
   * Return template of model comment.
   * @return {object}
   */
  static getTemplateData() {
    return {
      'id': -1,
      'emotion': null,
      'comment': null,
      'date': null,
      'author': null
    };
  }

  /**
   * Return result of parsing part of data of comment from server.
   * @param {object} data
   * @param {object} serverDataPart
   * @return {obj}
   * @static
   */
  static parseComment(data, serverDataPart) {
    return new ModelComment(data, serverDataPart);
  }

  /**
   * Return result of parsing data of comment from server.
   * @param {object} data
   * @param {object} serverData
   * @return {obj}
   * @static
   */
  static parseComments(data, serverData) {
    if (Array.isArray(serverData)) {
      return serverData.map((serverDataPart) =>
        ModelComment.parseComment(data, serverDataPart));
    }
    return serverData;
  }
}

export default ModelComment;
