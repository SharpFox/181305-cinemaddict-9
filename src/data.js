import moment from 'moment';
import {
  HOUR_MS,
  MINUTE_MS,
  FILMS_CARDS_STEP,
  compareRandom,
  cloneDeep
} from './utils.js';

/**
 * Class representaing data.
 */
class Data {
  /**
   * Create data.
   */
  constructor() {
    this._userRanks = this._getUserRanks();
    this._sortTypes = this._getSortTypes();
    this._sortTypesId = this._getSortTypesId();
    this._imgPathEmoji = this._getImgPathEmoji();
    this._emojiId = this._getEmojiId();
    this._emojiList = this._getEmojiList();
    this._ratingScales = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this._filmDetailsControlsTypes = this._getFilmDetailsControlsTypes();
    this._filmCardControlsTypes = this._getFilmCardControlsTypes();
    this._filmControlsTypesId = this._getFilmControlsTypesId();
    this._filmsCategories = this._getFilmsCategories();
    this._filmsCategoriesId = this._getFilmsCategoriesId();
    this._filmsCardsMain = [];
    this._filmsCardsCurrent = [];
    this._totalDownloadedFilmsCards = FILMS_CARDS_STEP;
    this._startCountfilmsCardsPortion = 0;
    this._stepFilmsCardsPortion = FILMS_CARDS_STEP;
    this._filmLists = this._getFilmLists();
    this._menuTypesId = this._getMenuTypesId();
    this._statisticFiltersId = this._getStatisticFiltersId();
  }

  /**
   * Return sortTypes.
   * @return {object}
   */
  get sortTypes() {
    return this._sortTypes;
  }

  /**
   * Return sortTypesId.
   * @return {object}
   */
  get sortTypesId() {
    return this._sortTypesId;
  }

  /**
   * Return emojiList.
   * @return {object}
   */
  get emojiList() {
    return this._emojiList;
  }

  /**
   * Return ratingScales.
   * @return {object}
   */
  get ratingScales() {
    return this._ratingScales;
  }

  /**
   * Return filmDetailsControlsTypes.
   * @return {object}
   */
  get filmDetailsControlsTypes() {
    return this._filmDetailsControlsTypes;
  }

  /**
   * Return filmCardControlsTypes.
   * @return {object}
   */
  get filmCardControlsTypes() {
    return this._filmCardControlsTypes;
  }

  /**
   * Return filmControlsTypesId.
   * @return {object}
   */
  get filmControlsTypesId() {
    return this._filmControlsTypesId;
  }

  /**
   * Return filmsCategories.
   * @return {object}
   */
  get filmsCategories() {
    return this._filmsCategories;
  }

  /**
   * Return filmsCategoriesId.
   * @return {object}
   */
  get filmsCategoriesId() {
    return this._filmsCategoriesId;
  }

  /**
   * Return filmsCardsMain.
   * @return {object}
   */
  get filmsCardsMain() {
    return this._filmsCardsMain;
  }

  /**
   * Return filmsCardsCurrent.
   * @return {object}
   */
  get filmsCardsCurrent() {
    return this._filmsCardsCurrent;
  }

  /**
   * Return filmsCardsCurrent.
   * @return {object}
   */
  get totalDownloadedFilmsCards() {
    return this._totalDownloadedFilmsCards;
  }

  /**
   * Return filmLists.
   * @return {object}
   */
  get filmLists() {
    return this._filmLists;
  }

  /**
   * Return menuTypesId.
   * @return {object}
   */
  get menuTypesId() {
    return this._menuTypesId;
  }

  /**
   * Return menuTypesId.
   * @return {object}
   */
  get statisticFiltersId() {
    return this._statisticFiltersId;
  }

  /**
   * Return img path to emoji.
   * @param {string} emojiType
   * @return {string}
   */
  getImgPathEmoji(emojiType) {
    return this._imgPathEmoji[emojiType];
  }

  /**
   * Clear main array of films cards.
   */
  clearFilmCardsMain() {
    this._filmsCardsMain = [];
  }

  /**
   * Clear main array of films cards.
   */
  clearFilmCardsCurrent() {
    this._filmsCardsCurrent = [];
  }

  /**
   * Fill main array of cards of films.
   * @param {object} filmCard
   */
  addFilmCardToFilmCardsMain(filmCard) {
    this._filmsCardsMain.push(cloneDeep(filmCard));
  }

  /**
   * Clone filmCardMain.
   */
  fillFilmsCardsCurrent() {
    this._filmsCardsMain.forEach((filmCard) => {
      this._filmsCardsCurrent.push(cloneDeep(filmCard));
    });
  }

  /**
   * Add comment to filmsCardsCurrent.
   * @param {array} comments
   * @param {number} filmId
   */
  addCommentToFilmsCardsCurrent(comments, filmId) {
    for (let filmCard of this._filmsCardsCurrent) {
      if (filmCard.id === filmId) {
        filmCard.comments = [];
        comments.forEach((comment) => filmCard.comments.push(comment));
        break;
      }
    }
  }

  /**
   * Do default data for filmsCardsCurrent.
   */
  doDefaultFilmCardsCurrent() {
    this._filmsCardsCurrent = [];
    this._filmsCardsMain.forEach((filmsCard) => {
      this._filmsCardsCurrent.push(cloneDeep(filmsCard));
    });
  }

  /**
   * Fill in filmsCardsCurrent result of selection.
   * @param {string} category
   */
  selectfilmsCardsCurrent(category) {
    this._filmsCardsCurrent = [];
    this._filmsCardsMain.forEach((filmCard) => {
      for (let controlType of filmCard.controlsTypes) {
        if (controlType === category) {
          this._filmsCardsCurrent.push(filmCard);
          break;
        }
      }
    });
  }

  /**
   * Return max number of portion film.
   * @return {number}
   */
  getMaxFilmPortionNumber() {
    return Math.ceil(this._filmsCardsCurrent.length / FILMS_CARDS_STEP);
  }

  /**
   * Return sort of film cards by rating.
   * @param {object} firstFilmCard
   * @param {object} secondFilmCard
   * @return {function}
   */
  getSortFunctionForFilmByRating(firstFilmCard, secondFilmCard) {
    return secondFilmCard.rating - firstFilmCard.rating;
  }

  /**
   * Return sort of film cards by date.
   * @param {object} firstFilmCard
   * @param {object} secondFilmCard
   * @return {function}
   */
  getSortFunctionForFilmByDate(firstFilmCard, secondFilmCard) {
    return secondFilmCard.year - firstFilmCard.year;
  }

  /**
   * Return sort of film cards by comments.
   * @param {object} firstFilmCard
   * @param {object} secondFilmCard
   * @return {function}
   */
  getSortFunctionForFilmByComments(firstFilmCard, secondFilmCard) {
    return secondFilmCard.comments.length
      - firstFilmCard.comments.length;
  }

  /**
   * Find a film by the search line in FilmsCardsCurrent.
   * @param {string} searchLine
   */
  findFilmsCardsCurrent(searchLine) {
    this._filmsCardsCurrent = [];
    this._filmsCardsMain.forEach((filmCard) => {
      if (filmCard.title.toLowerCase().includes(searchLine.toLowerCase())) {
        this._filmsCardsCurrent.push(filmCard);
      }
    });
  }

  /**
   * Return 2 and less films by top rated.
   * @return {array}
   */
  getExtraFilmsTopRated() {
    let filmsCards =
      cloneDeep(this._filmsCardsCurrent).sort(this.getSortFunctionForFilmByRating);
    return this._getExtraFilms(filmsCards, `rating`);
  }

  /**
   * Return 2 and less films by top rated.
   * @return {array}
   */
  getExtraFilmsMostCommented() {
    let filmsCards =
      cloneDeep(this._filmsCardsCurrent).sort(this.getSortFunctionForFilmByComments);
    return this._getExtraFilms(filmsCards, `comments`);
  }

  /**
   * Set total downloaded films cards.
   */
  setNumberDownloadedFilmsCards() {
    this._totalDownloadedFilmsCards += FILMS_CARDS_STEP;
  }

  /**
   * Return function for portion of film cards.
   * @return {function}
   */
  getFilmsCardsPortion() {
    this._startCountfilmsCardsPortion = 0;
    /**
     * Return portion of film cards.
     * @return {array}
     */
    return () => {
      const filmCardsPortion = this._filmsCardsCurrent.slice(this._startCountfilmsCardsPortion,
          this._startCountfilmsCardsPortion + this._stepFilmsCardsPortion);

      this._startCountfilmsCardsPortion += this._stepFilmsCardsPortion;
      this._stepFilmsCardsPortion = FILMS_CARDS_STEP;

      return filmCardsPortion;
    };
  }

  /**
   * Step of displaying the number of films.
   * @param {number} newStep
   */
  changefilmsCardsPortionCount(newStep) {
    this._startCountfilmsCardsPortion = 0;
    this._stepFilmsCardsPortion = newStep;
  }

  /**
   * Return amount of watched films.
   * @param {date} boundaryUserDate
   * @return {number}
   */
  getWatchedFilmsAmount(boundaryUserDate) {
    let filmsAmount = 0;
    this._filmsCardsCurrent.forEach((filmCard) => {
      filmCard.controlsTypes.forEach((controlType) => {
        if (controlType === this._filmControlsTypesId.watched
          && (boundaryUserDate === null
          || filmCard.userWatchingDate >= boundaryUserDate)) {
          filmsAmount++;
        }
      });
    });

    return filmsAmount;
  }

  /**
   * Return unique genres from filmsCardsCurrent.
   * @param {date} boundaryUserDate
   * @return {object}
   */
  getUniqueGenres(boundaryUserDate) {
    const allGenres = [];
    this._filmsCardsCurrent.forEach((filmCard) => {
      if (boundaryUserDate === null
        || filmCard.userWatchingDate >= boundaryUserDate) {
        filmCard.genres.forEach((genre) => allGenres.push(genre));
      }
    });

    const uniqueGenres = {};
    allGenres.forEach((genre) => {
      if (uniqueGenres[genre] === undefined) {
        uniqueGenres[genre] = 1;
      } else {
        uniqueGenres[genre]++;
      }
    });

    return uniqueGenres;
  }

  /**
   * Return a top genre.
   * @param {date} boundaryUserDate
   * @return {string}
   */
  getTopGenre(boundaryUserDate) {
    let topGenre = null;
    const uniqueGenres = this.getUniqueGenres(boundaryUserDate);
    const maxGenreAmount = Math.max(...Object.values(uniqueGenres));
    const uniqGenresTotal = Object.entries(uniqueGenres);
    for (let [genre, amount] of uniqGenresTotal) {
      if (amount === maxGenreAmount) {
        topGenre = genre;
        break;
      }
    }

    return topGenre;
  }

  /**
   * Return total duration of all films.
   * @param {date} boundaryUserDate
   * @return {number}
   */
  getTotalDuration(boundaryUserDate) {
    let totalDuration = 0;
    this._filmsCardsCurrent.forEach((filmCard) => {
      if (boundaryUserDate === null
        || filmCard.userWatchingDate >= boundaryUserDate) {
        totalDuration += moment(filmCard.duration);
      }
    });

    return totalDuration;
  }

  /**
   * Return total films cards.
   * @return {number}
   */
  getTotalFilmsCards() {
    return this._filmsCardsMain.length;
  }

  /**
   * Return menu types.
   * @return {array}
   */
  getMenuTypes() {
    return [
      {
        'title': `All movies`,
        'id': this._menuTypesId.all,
        'isActive': true,
        'filmsCount': 0,
        'modifiers': []
      },
      {
        'title': `Watchlist`,
        'id': this._menuTypesId.watchlist,
        'isActive': false,
        'filmsCount': this._getFilmsAmountByCategories(this._filmControlsTypesId.watchlist),
        'modifiers': []
      },
      {
        'title': `History`,
        'id': this._menuTypesId.history,
        'isActive': false,
        'filmsCount': this._getFilmsAmountByCategories(this._filmControlsTypesId.watched),
        'modifiers': []
      },
      {
        'title': `Favorites`,
        'id': this._menuTypesId.favorites,
        'isActive': false,
        'filmsCount': this._getFilmsAmountByCategories(this._filmControlsTypesId.favorite),
        'modifiers': []
      },
      {
        'title': `Stats`,
        'id': this._menuTypesId.stats,
        'isActive': false,
        'filmsCount': 0,
        'modifiers': [
          `additional`
        ]
      }
    ];
  }

  /**
   * Return statistic filters.
   * @param {string} isCheckedCategory
   * @return {array}
   */
  getStatisticFilters(isCheckedCategory) {
    return [
      {
        id: this._statisticFiltersId.allTime,
        title: `All time`,
        isChecked:
          isCheckedCategory === this._statisticFiltersId.allTime ? true : false
      },
      {
        id: this._statisticFiltersId.today,
        title: `Today`,
        isChecked:
          isCheckedCategory === this._statisticFiltersId.today ? true : false
      },
      {
        id: this._statisticFiltersId.week,
        title: `Week`,
        isChecked:
          isCheckedCategory === this._statisticFiltersId.week ? true : false
      },
      {
        id: this._statisticFiltersId.month,
        title: `Month`,
        isChecked:
          isCheckedCategory === this._statisticFiltersId.month ? true : false
      },
      {
        id: this._statisticFiltersId.year,
        title: `Year`,
        isChecked:
          isCheckedCategory === this._statisticFiltersId.year ? true : false
      }
    ];
  }

  /**
   * Return statistic list.
   * @param {number} totalWatchedFilms
   * @param {number} totalDuration
   * @param {string} topGenre
   * @return {array}
   */
  getStatisticList(totalWatchedFilms, totalDuration, topGenre) {
    return [
      {
        title: `You watched`,
        texts: [
          {
            textTitle: totalWatchedFilms,
            isDescription: false
          },
          {
            textTitle: `movies`,
            isDescription: true
          }
        ]
      },
      {
        title: `Total duration`,
        texts: [
          {
            textTitle: this._getDurationByHours(totalDuration),
            isDescription: false
          },
          {
            textTitle: `h`,
            isDescription: true
          },
          {
            textTitle: this._getDurationByMinutes(totalDuration),
            isDescription: false
          },
          {
            textTitle: `m`,
            isDescription: true
          }
        ]
      },
      {
        title: `Top genre`,
        texts: [
          {
            textTitle: topGenre === null ? `-` : topGenre,
            isDescription: false
          }
        ]
      }
    ];
  }

  /**
   * Return user total rank.
   * @return {string}
   */
  getUserTotalRank() {
    const maxNumber = this._getMaxNumberOfWatchedFilm();
    let userTotalRank = null;
    if (maxNumber === 0) {
      userTotalRank = this._userRanks.zero;
    } else if (maxNumber >= 1 && maxNumber <= 10) {
      userTotalRank = this._userRanks.novice;
    } else if (maxNumber >= 11 && maxNumber <= 20) {
      userTotalRank = this._userRanks.fan;
    } else if (maxNumber >= 21) {
      userTotalRank = this._userRanks.movieBuff;
    }

    return userTotalRank;
  }

  /**
   * Clear and fill filmsCardsCurrent.
   */
  updateFilmCardsCurrent() {
    this.clearFilmCardsCurrent();
    this.fillFilmsCardsCurrent();
  }

  /**
   * Update filmsCardsMain.
   * @param {object} modifedFilmCard
   */
  updateFilmsCardsMain(modifedFilmCard) {
    const lengthFilmsCardsMain = this._filmsCardsMain.length;
    for (let i = 0; i < lengthFilmsCardsMain; i++) {
      if (this._filmsCardsMain[i].id === modifedFilmCard.id) {
        this._filmsCardsMain[i] = modifedFilmCard;
        break;
      }
    }
  }

  /**
   * Delete comment from filmsCardsMain.
   * @param {number} commentId
   * @param {number} filmCardId
   */
  deleteCommentByFilmsCardsMain(commentId, filmCardId) {
    for (let filmCard of this._filmsCardsMain) {
      if (filmCard.id === filmCardId) {
        filmCard.comments =
          filmCard.comments.filter((id) => {
            return Number(id) !== commentId;
          });
        break;
      }
    }
  }

  /**
   * Return ranks of user.
   * @return {object}
   */
  _getUserRanks() {
    return {
      zero: ``,
      novice: `Novice`,
      fan: `Fan`,
      movieBuff: `Movie Buff`
    };
  }

  /**
   * Return types of sort.
   * @return {object}
   */
  _getSortTypes() {
    return {
      default: true,
      date: false,
      rating: false
    };
  }

  /**
   * Return id types of sort.
   * @return {object}
   */
  _getSortTypesId() {
    return {
      default: `default`,
      date: `date`,
      rating: `rating`
    };
  }

  /**
   * Return img path of emoji.
   * @return {object}
   */
  _getImgPathEmoji() {
    return {
      smile: `./images/emoji/smile.png`,
      sleeping: `./images/emoji/sleeping.png`,
      puke: `./images/emoji/puke.png`,
      angry: `./images/emoji/angry.png`
    };
  }

  /**
   * Return id list of emojies.
   * @return {object}
   */
  _getEmojiId() {
    return {
      smile: `smile`,
      sleeping: `sleeping`,
      puke: `puke`,
      angry: `angry`
    };
  }

  /**
   * Return list of emoji.
   * @return {array}
   */
  _getEmojiList() {
    return [
      {
        id: this._emojiId.smile,
        img: this._imgPathEmoji.smile
      },
      {
        id: this._emojiId.sleeping,
        img: this._imgPathEmoji.sleeping
      },
      {
        id: this._emojiId.puke,
        img: this._imgPathEmoji.puke
      },
      {
        id: this._emojiId.angry,
        img: this._imgPathEmoji.angry
      }
    ];
  }

  /**
   * Return controls types for film details.
   * @return {object}
   */
  _getFilmDetailsControlsTypes() {
    return {
      watchlist: `Add to watchlist`,
      watched: `Already watched`,
      favorite: `Add to favorites`
    };
  }

  /**
   * Return controls types for film card.
   * @return {object}
   */
  _getFilmCardControlsTypes() {
    return {
      watchlist: `add-to-watchlist`,
      watched: `mark-as-watched`,
      favorite: `favorite`
    };
  }

  /**
   * Return id for controls types of film.
   * @return {object}
   */
  _getFilmControlsTypesId() {
    return {
      watchlist: `watchlist`,
      watched: `watched`,
      favorite: `favorite`
    };
  }

  /**
   * Return categories for films.
   * @return {object}
   */
  _getFilmsCategories() {
    return {
      AllMoviesUpcoming: `All movies. Upcoming`,
      TopRated: `Top rated`,
      MostCommented: `Most commented`
    };
  }

  /**
   * Return id categories for films.
   * @return {object}
   */
  _getFilmsCategoriesId() {
    return {
      AllMoviesUpcoming: `AllMoviesUpcoming`,
      TopRated: `TopRated`,
      MostCommented: `MostCommented`
    };
  }

  /**
   * Return films lists.
   * @return {object}
   */
  _getFilmLists() {
    return {
      AllMoviesUpcoming: {
        title: this._filmsCategories.AllMoviesUpcoming,
        id: this._filmsCategoriesId.AllMoviesUpcoming,
        isVisuallyHidden: true,
        isExtra: false,
        isButton: `true`
      },
      TopRated: {
        title: this._filmsCategories.TopRated,
        id: this._filmsCategoriesId.TopRated,
        isVisuallyHidden: false,
        isExtra: true,
        isButton: ``
      },
      MostCommented: {
        title: this._filmsCategories.MostCommented,
        id: this._filmsCategoriesId.MostCommented,
        isVisuallyHidden: false,
        isExtra: true,
        isButton: ``
      }
    };
  }

  /**
   * Return if for types of menu.
   * @return {object}
   */
  _getMenuTypesId() {
    return {
      'all': `all`,
      'watchlist': this._filmControlsTypesId.watchlist,
      'history': this._filmControlsTypesId.watched,
      'favorites': this._filmControlsTypesId.favorite,
      'stats': `stats`
    };
  }

  /**
   * Return id for filters of statistic.
   * @return {object}
   */
  _getStatisticFiltersId() {
    return {
      'allTime': `all-time`,
      'today': `today`,
      'week': `week`,
      'month': `month`,
      'year': `year`
    };
  }

  /**
   * Return 2 and less films by extra films.
   * @param {array} filmsCards
   * @param {string} filmCardKey
   * @return {array}
   */
  _getExtraFilms(filmsCards, filmCardKey) {
    if (!this._filmsCardsHaveSameValues(filmsCards, filmCardKey)) {
      filmsCards = filmsCards.sort(compareRandom);
    }
    const maxNumberFilms = 2;
    filmsCards = filmsCards.slice(0, maxNumberFilms);

    return this._checkFilmsCardsByZero(filmsCards, filmCardKey, maxNumberFilms);
  }

  /**
   * Check films cards for same values.
   * @param {array} filmsCards
   * @param {string} filmCardKey
   * @return {boolean}
   */
  _filmsCardsHaveSameValues(filmsCards, filmCardKey) {
    let maxNumber = this._getValueOfFieldForFilmCard(filmsCards[0], filmCardKey);
    const filmsCardsFilter = filmsCards.filter((filmCard) =>
      maxNumber === this._getValueOfFieldForFilmCard(filmCard, filmCardKey));

    return filmsCards.length - filmsCardsFilter.length;
  }

  /**
   * Return films cards after checking for zero.
   * @param {array} filmsCards
   * @param {string} filmCardKey
   * @param {number} maxNumberFilms
   * @return {array}
   */
  _checkFilmsCardsByZero(filmsCards, filmCardKey, maxNumberFilms) {
    let numberFilmsByZero = 0;
    filmsCards.forEach((filmCard) => {
      if (!this._getValueOfFieldForFilmCard(filmCard, filmCardKey)) {
        numberFilmsByZero += 1;
      }
    });
    if (numberFilmsByZero === maxNumberFilms) {
      filmsCards = [];
    }

    return filmsCards;
  }

  /**
   * Return value for film card by same values.
   * @param {object} filmCard
   * @param {string} filmCardKey
   * @return {number}
   */
  _getValueOfFieldForFilmCard(filmCard, filmCardKey) {
    let fieldValue = null;
    if (filmCardKey === `rating`) {
      fieldValue = filmCard[filmCardKey];
    } else if (filmCardKey === `comments`) {
      fieldValue = filmCard[filmCardKey].length;
    }

    return fieldValue;
  }

  /**
   * Return object of films amount by categories.
   * @param {string} category
   * @return {number}
   */
  _getFilmsAmountByCategories(category) {
    let filmsAmount = 0;
    this._filmsCardsCurrent.forEach((filmCard) => {
      filmCard.controlsTypes.forEach((controlType) => {
        if (controlType === category) {
          filmsAmount++;
        }
      });
    });

    return filmsAmount;
  }

  /**
   * Return max number of watched film..
   * @return {number}
   */
  _getMaxNumberOfWatchedFilm() {
    let filmsTotalWatched = 0;
    this._filmsCardsMain.forEach((filmCard) => {
      filmCard.controlsTypes.forEach((controlType) => {
        if (controlType === this._filmControlsTypesId.watched) {
          filmsTotalWatched += 1;
        }
      });
    });

    return filmsTotalWatched;
  }

  /**
   * Return duration by hours.
   * @param {number} duration
   * @return {number}
   */
  _getDurationByHours(duration) {
    return Math.trunc(duration / HOUR_MS);
  }

  /**
   * Return duration by minutes.
   * @param {number} duration
   * @return {number}
   */
  _getDurationByMinutes(duration) {
    const hoursNumbers = Math.trunc(duration / HOUR_MS);
    for (let i = 1; i <= hoursNumbers; i++) {
      duration -= HOUR_MS;
    }

    return Math.ceil(duration / MINUTE_MS);
  }

}

export default Data;
