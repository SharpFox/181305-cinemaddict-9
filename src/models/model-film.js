import moment from 'moment';
import {
  filmControlsTypesId
} from '../data.js';

/**
 * Class representing model of film.
 */
class ModelFilm {
  /**
   * Create model of film.
   * @param {object} data
   */
  constructor(data) {
    this._id = Number(data.id);
    this._comments = data.comments;
    this._title = data.film_info.title;
    this._alternativeTitle = data.film_info.alternative_title;
    this._rating = Number(data.film_info.total_rating);
    this._img = data.film_info.poster;
    this._age = Number(data.film_info.age_rating);
    this._director = data.film_info.director;
    this._writers = data.film_info.writers;
    this._actors = data.film_info.actors;
    this._year = moment(data.film_info.release.date);
    this._country = data.film_info.release.release_country;
    this._duration = Number(data.film_info.runtime);
    this._genres = data.film_info.genre;
    this._description = data.film_info.description;
    this._userRating = Number(data.user_details.personal_rating);
    this._userWatchingDate = moment(data.user_details.watching_date);
    this._categoriesId = [filmControlsTypesId.watchlist];
    this._controlsTypes = this._getFilmControlsTypes(data.user_details);
  }

  /**
   * Return RAW object for server.
    * @return {object}
   */
  toRAW() {
    return {
      'id': String(this._id),
      'comments': this._comments,
      'film_info': {
        'title': this._title,
        'alternative_title': this._alternativeTitle,
        'total_rating': this._rating,
        'poster': this._img,
        'age_rating': this._age,
        'director': this._director,
        'writers': this._writers,
        'actors': this._actors,
        'release': {
          'date': moment(this._year).valueOf(),
          'release_country': this._country
        },
        'runtime': this._duration,
        'genre': this._genres,
        'description': this._description
      },
      'user_details': {
        'personal_rating': this._userRating,
        'watchlist': this._getFilmControlType(filmControlsTypesId.watchlist),
        'already_watched':
          this._getFilmControlType(filmControlsTypesId.watched),
        'watching_date':
          moment(this._userWatchingDate).format(`YYYY-MM-DDTHH:mm:ss.SSSZ`),
        'favorite': this._getFilmControlType(filmControlsTypesId.favorite),
      }
    };
  }

  /**
   * Return film control types.
   * @param {object} userDetails
   * @return {array}
   */
  _getFilmControlsTypes(userDetails) {
    const controlsTypes = [];
    if (userDetails.watchlist) {
      controlsTypes.push(userDetails.watchlist);
    }
    if (userDetails.watchlist) {
      controlsTypes.push(userDetails.already_watched);
    }
    if (userDetails.watchlist) {
      controlsTypes.push(userDetails.favorite);
    }
    return controlsTypes;
  }

  /**
   * Return a fact of control type availability in array.
   * @param {string} controlType
   * @return {boolean}
   */
  _getFilmControlType(controlType) {
    for (let value of this._controlsTypes) {
      if (value === controlType) {
        return true;
      }
    }
    return false;
  }

  /**
   * Return result of parsing part of data of comment from server.
   * @param {object} data
   * @return {obj}
   * @static
   */
  static parseFilm(data) {
    return new ModelFilm(data);
  }

  /**
   * Return result of parsing data of film from server.
   * @param {object} data
   * @return {obj}
   * @static
   */
  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}

export default ModelFilm;
