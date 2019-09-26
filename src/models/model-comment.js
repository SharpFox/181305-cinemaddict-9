import moment from 'moment';

/**
 * Class representing model of comment.
 */
class ModelComment {
  /**
   * Create model of comment.
   * @param {object} data
   */
  constructor(data) {
    this._id = Number(data.id);
    this._type = this._getImgPathOfSmileType(data.emotion);
    this._text = data.comment;
    this._date = moment(data.date);
    this._author = data.author;

    this._smileTypesServer = this._getSmileTypesServer();
  }

  /**
   * Return RAW object for server.
    * @return {object}
   */
  toRAW() {
    return {
      "comment": this._text,
      "date":
        moment(this._userWatchingDate).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`),
      "emotion": this._type
    };
  }

  /**
   * Return result of parsing part of data of comment from server.
   * @param {object} data
   * @return {obj}
   * @static
   */
  static parseFilm(data) {
    return new ModelComment(data);
  }

  /**
   * Return result of parsing data of comment from server.
   * @param {object} data
   * @return {obj}
   * @static
   */
  static parseFilms(data) {
    return data.map(ModelComment.parseFilm);
  }
}

export default ModelComment;
