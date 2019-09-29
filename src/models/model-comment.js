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
    this.id = Number(data.id);
    this.type = data.emotion;
    this.text = data.comment;
    this.date = moment(data.date).toDate();
    this.author = data.author;
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
  static parseComment(data) {
    return new ModelComment(data);
  }

  /**
   * Return result of parsing data of comment from server.
   * @param {object} data
   * @return {obj}
   * @static
   */
  static parseComments(data) {
    return data.map(ModelComment.parseComment);
  }
}

export default ModelComment;
