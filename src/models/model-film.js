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
    this.id = Number(data.id);
    this.comments = data.comments;
    this.title = data.film_info.title;
    this.alternativeTitle = data.film_info.alternative_title;
    this.rating = Number(data.film_info.total_rating);
    this.img = data.film_info.poster;
    this.age = Number(data.film_info.age_rating);
    this.director = data.film_info.director;
    this.writers = data.film_info.writers;
    this.actors = data.film_info.actors;
    this.year = moment(data.film_info.release.date).toDate();
    this.country = data.film_info.release.release_country;
    this.duration = Number(data.film_info.runtime) * 60 * 1000;
    this.genres = data.film_info.genre;
    this.description = data.film_info.description;
    this.userRating = Number(data.user_details.personal_rating);
    this.userWatchingDate = moment(data.user_details.watching_date).toDate();
    this.categoriesId = [filmControlsTypesId.watchlist];
    this.controlsTypes = this._getFilmControlsTypes(data.user_details);
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
      controlsTypes.push(filmControlsTypesId.watchlist);
    }
    if (userDetails.already_watched) {
      controlsTypes.push(filmControlsTypesId.watched);
    }
    if (userDetails.favorite) {
      controlsTypes.push(filmControlsTypesId.favorite);
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
