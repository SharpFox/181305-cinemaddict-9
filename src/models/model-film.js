import moment from 'moment';
import {
  DEFAULT_ID,
  doEscapeHTML
} from '../utils.js';

/**
 * Class representing model of film.
 */
class ModelFilm {
  /**
   * Create model of film.
   * @param {object} data
   * @param {object} serverDataPart
   */
  constructor(data, serverDataPart) {
    this._filmControlsTypesId = data.filmControlsTypesId;
    this.id = Number(doEscapeHTML(serverDataPart.id));
    this.comments = this._getEscapeHTMLValues(serverDataPart.comments);
    this.title = doEscapeHTML(serverDataPart.film_info.title);
    this.alternativeTitle =
      doEscapeHTML(serverDataPart.film_info.alternative_title);
    this.rating = Number(doEscapeHTML(serverDataPart.film_info.total_rating));
    this.img = doEscapeHTML(serverDataPart.film_info.poster);
    this.age = Number(doEscapeHTML(serverDataPart.film_info.age_rating));
    this.director = doEscapeHTML(serverDataPart.film_info.director);
    this.writers =
      this._getEscapeHTMLValues(serverDataPart.film_info.writers);
    this.actors =
      this._getEscapeHTMLValues(serverDataPart.film_info.actors);
    this.year =
      this._getDate(doEscapeHTML(serverDataPart.film_info.release.date));
    this.country =
      doEscapeHTML(serverDataPart.film_info.release.release_country);
    this.duration =
      Number(doEscapeHTML(serverDataPart.film_info.runtime)) * 60 * 1000;
    this.genres =
      this._getEscapeHTMLValues(serverDataPart.film_info.genre);
    this.description = doEscapeHTML(serverDataPart.film_info.description);
    this.userRating =
      Number(doEscapeHTML(serverDataPart.user_details.personal_rating));
    this.userWatchingDate =
      this._getDate(serverDataPart.user_details.watching_date);
    this.categoriesId = [data.filmControlsTypesId.watchlist];
    this.controlsTypes =
      this._getFilmControlsTypes(serverDataPart.user_details);
  }

  /**
   * Return RAW object for server.
    * @return {object}
   */
  toRAW() {
    return {
      'comments': this.comments,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.rating,
        'poster': this.img,
        'age_rating': this.age,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': moment(this.year).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`),
          'release_country': this.country
        },
        'runtime': this.duration,
        'genre': this.genres,
        'description': this.description
      },
      'user_details': {
        'personal_rating': this.userRating,
        'watchlist':
          this._getFilmControlType(this._filmControlsTypesId.watchlist),
        'already_watched':
          this._getFilmControlType(this._filmControlsTypesId.watched),
        'watching_date':
          moment(this.userWatchingDate).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`),
        'favorite':
          this._getFilmControlType(this._filmControlsTypesId.favorite),
      }
    };
  }

  /**
   * Return server data without HTML.
   * @param {array} serverData
   * @return {array}
   */
  _getEscapeHTMLValues(serverData) {
    let escapeServerData = [];
    serverData.forEach((serverDataElement) => {
      escapeServerData.push(doEscapeHTML(serverDataElement));
    });

    return escapeServerData;
  }

  /**
   * Return user watching date.
   * @param {string | null} serverDate
   * @return {date}
   */
  _getDate(serverDate) {
    let clientDate = `0001-01-01T00:00:00.231+04:00`;
    if (serverDate !== null) {
      clientDate = serverDate;
    }
    if (typeof clientDate === `number`) {
      clientDate = Number(doEscapeHTML(clientDate));
    }

    return moment(clientDate).toDate();
  }

  /**
   * Return film control types.
   * @param {object} userDetails
   * @return {array}
   */
  _getFilmControlsTypes(userDetails) {
    const controlsTypes = [];
    if (userDetails.watchlist) {
      controlsTypes.push(this._filmControlsTypesId.watchlist);
    }
    if (userDetails.already_watched) {
      controlsTypes.push(this._filmControlsTypesId.watched);
    }
    if (userDetails.favorite) {
      controlsTypes.push(this._filmControlsTypesId.favorite);
    }
    return controlsTypes;
  }

  /**
   * Return a fact of control type availability in array.
   * @param {string} controlType
   * @return {boolean}
   */
  _getFilmControlType(controlType) {
    for (let value of this.controlsTypes) {
      if (value === controlType) {
        return true;
      }
    }
    return false;
  }

  /**
   * Return template of model trip.
   * @return {object}
   */
  static getTemplateData() {
    return {
      'id': DEFAULT_ID,
      'comments': [],
      'film_info': {
        'title': ``,
        'alternative_title': ``,
        'total_rating': 0,
        'poster': ``,
        'age_rating': 0,
        'director': ``,
        'writers': [],
        'actors': [],
        'release': {
          'date': `0001-01-01T00:00:00.231+04:00`,
          'release_country': ``
        },
        'runtime': 0,
        'genre': [],
        'description': ``
      },
      'user_details': {
        'personal_rating': 0,
        'watchlist': false,
        'already_watched': false,
        'watching_date': `0001-01-01T00:00:00.231+04:00`,
        'favorite': false
      }
    };
  }

  /**
   * Return result of parsing part of data of comment from server.
   * @param {object} data
   * @param {object} serverDataPart
   * @return {obj}
   * @static
   */
  static parseFilm(data, serverDataPart) {
    return new ModelFilm(data, serverDataPart);
  }

  /**
   * Return result of parsing data of film from server.
   * @param {object} data
   * @param {object} serverData
   * @return {obj}
   * @static
   */
  static parseFilms(data, serverData) {
    return serverData.map((serverDataPart) =>
      ModelFilm.parseFilm(data, serverDataPart));
  }
}

export default ModelFilm;
