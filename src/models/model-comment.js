import moment from 'moment';

/**
 * Class representing model of comment.
 */
class ModelComment {
  /**
   * Create model of comment.
   * @param {object} serverDataPart
   */
  constructor(serverDataPart) {
    this.id = Number(serverDataPart.id);
    this.type = serverDataPart.emotion;
    this.text = serverDataPart.comment;
    this.date = moment(serverDataPart.date).toDate();
    this.author = serverDataPart.author;
  }

  /**
   * Return RAW object for server.
   * @return {object}
   */
  toRAW() {
    return {
      'comment': this._text,
      'date':
        moment(this._userWatchingDate).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`),
      'emotion': this._type
    };
  }

  /**
   * Return template of model comment.
   * @return {object}
   */
  static getTemplateData() {
    return {
      'comment': ``,
      'date': null,
      'emotion': ``
    };
  }

  /**
   * Return result of parsing part of data of comment from server.
   * @param {object} serverDataPart
   * @return {obj}
   * @static
   */
  static parseComment(serverDataPart) {
    return new ModelComment(serverDataPart);
  }

  /**
   * Return result of parsing data of comment from server.
   * @param {object} serverData
   * @return {obj}
   * @static
   */
  static parseComments(serverData) {
    return serverData.map((serverDataPart) =>
      ModelComment.parseComment(serverDataPart));
  }
}

export default ModelComment;
