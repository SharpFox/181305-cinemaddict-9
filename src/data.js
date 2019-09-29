import moment from 'moment';
import ModelFilm from './models/model-film.js';
import ModelComment from './models/model-comment.js';
import {
  HOUR_MS,
  MINUTE_MS,
  compareRandom,
  cloneDeep
} from './utils.js';

const FILMS_CARDS_STEP = 5;

const userRanks = {
  zero: ``,
  novice: `Novice`,
  fan: `Fan`,
  movieBuff: `Movie Buff`
};

const sortTypes = {
  default: true,
  date: false,
  rating: false
};

const sortTypesId = {
  default: `default`,
  date: `date`,
  rating: `rating`
};

const imgPathEmoji = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`
};

const emojiId = {
  smile: `smile`,
  sleeping: `sleeping`,
  puke: `puke`,
  angry: `angry`
};

const emojiList = [
  {
    id: emojiId.smile,
    img: imgPathEmoji.smile
  },
  {
    id: emojiId.sleeping,
    img: imgPathEmoji.sleeping
  },
  {
    id: emojiId.puke,
    img: imgPathEmoji.puke
  },
  {
    id: emojiId.angry,
    img: imgPathEmoji.angry
  }
];

/**
 * Return img path to emoji.
 * @param {string} emojiType
 * @return {string}
 */
const getImgPathEmoji = (emojiType) => {
  return imgPathEmoji[emojiType];
};

const ratingScales = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const filmDetailsControlsTypes = {
  watchlist: `Add to watchlist`,
  watched: `Already watched`,
  favorite: `Add to favorites`
};

const filmCardControlsTypes = {
  watchlist: `add-to-watchlist`,
  watched: `mark-as-watched`,
  favorite: `favorite`
};

const filmControlsTypesId = {
  watchlist: `watchlist`,
  watched: `watched`,
  favorite: `favorite`
};

const filmsCategories = {
  AllMoviesUpcoming: `All movies. Upcoming`,
  TopRated: `Top rated`,
  MostCommented: `Most commented`
};

const filmsCategoriesId = {
  AllMoviesUpcoming: `AllMoviesUpcoming`,
  TopRated: `TopRated`,
  MostCommented: `MostCommented`
};

const filmsCardsMain = [];

/**
 * Fill main array of cards of films.
 * @param {object} filmCard
 */
const addFilmCardToFilmCardsMain = (filmCard) => {
  filmsCardsMain.push(cloneDeep(filmCard));
};

let filmsCardsCurrent = [];

/**
 * Clone filmCardMain.
 */
const fillFilmsCardsCurrent = () => {
  filmsCardsMain.forEach((filmCard) => {
    filmsCardsCurrent.push(cloneDeep(filmCard));
  });
};

/**
 * Add comment to filmsCardsMain.
 * @param {array} comments
 * @param {number} filmId
 */
const addCommentToFilmsCardsMain = (comments, filmId) => {
  for (let filmCard of filmsCardsMain) {
    if (filmCard.id === filmId) {
      filmCard.comments = [];
      comments.forEach((comment) => filmCard.comments.push(comment));
      break;
    }
  }
};

/**
 * Add comment to filmsCardsCurrent.
 * @param {array} comments
 * @param {number} filmId
 */
const addCommentToFilmsCardsCurrent = (comments, filmId) => {
  for (let filmCard of filmsCardsCurrent) {
    if (filmCard.id === filmId) {
      filmCard.comments = [];
      comments.forEach((comment) => filmCard.comments.push(comment));
      break;
    }
  }
};
/**
 * Do default data for filmsCardsCurrent.
 */
const doDefaultFilmCardsCurrent = () => {
  filmsCardsCurrent = [];
  filmsCardsMain.forEach((filmsCard) => {
    filmsCardsCurrent.push(cloneDeep(filmsCard));
  });
};

/**
 * Fill in filmsCardsCurrent result of selection.
 * @param {string} category
 */
const selectfilmsCardsCurrent = (category) => {
  filmsCardsCurrent = [];
  filmsCardsMain.forEach((filmCard) => {
    for (let controlType of filmCard.controlsTypes) {
      if (controlType === category) {
        filmsCardsCurrent.push(filmCard);
        break;
      }
    }
  });
};

/**
 * Return max number of portion film.
 * @return {number}
 */
const getMaxFilmPortionNumber = () => {
  return Math.ceil(filmsCardsCurrent.length / FILMS_CARDS_STEP);
};

/**
 * Return sort of film cards by rating.
 * @param {object} firstFilmCard
 * @param {object} secondFilmCard
 * @return {function}
 */
const getSortFunctionForFilmByRating = (firstFilmCard, secondFilmCard) => {
  return secondFilmCard.rating - firstFilmCard.rating;
};

/**
 * Return sort of film cards by date.
 * @param {object} firstFilmCard
 * @param {object} secondFilmCard
 * @return {function}
 */
const getSortFunctionForFilmByDate = (firstFilmCard, secondFilmCard) => {
  return secondFilmCard.year - firstFilmCard.year;
};

/**
 * Return sort of film cards by comments.
 * @param {object} firstFilmCard
 * @param {object} secondFilmCard
 * @return {function}
 */
const getSortFunctionForFilmByComments = (firstFilmCard, secondFilmCard) => {
  return secondFilmCard.comments.length
    - firstFilmCard.comments.length;
};

/**
 * Find a film by the search line in FilmsCardsCurrent.
 * @param {string} searchLine
 */
const findFilmsCardsCurrent = (searchLine) => {
  filmsCardsCurrent = [];
  filmsCardsMain.forEach((filmCard) => {
    if (filmCard.title.toLowerCase().includes(searchLine.toLowerCase())) {
      filmsCardsCurrent.push(filmCard);
    }
  });
};

/**
 * Return 2 and less films by top rated.
 * @return {array}
 */
const getExtraFilmsTopRated = () => {
  let filmsCards =
    cloneDeep(filmsCardsCurrent).sort(getSortFunctionForFilmByRating);
  return getExtraFilms(filmsCards, `rating`);
};

/**
 * Return 2 and less films by top rated.
 * @return {array}
 */
const getExtraFilmsMostCommented = () => {
  let filmsCards =
    cloneDeep(filmsCardsCurrent).sort(getSortFunctionForFilmByComments);
  return getExtraFilms(filmsCards, `comments`);
};

/**
 * Return 2 and less films by extra films.
 * @param {array} filmsCards
 * @param {string} filmCardKey
 * @return {array}
 */
const getExtraFilms = (filmsCards, filmCardKey) => {
  if (!filmsCardsHaveSameValues(filmsCards, filmCardKey)) {
    filmsCards = filmsCards.sort(compareRandom);
  }
  const maxNumberFilms = 2;
  filmsCards = filmsCards.slice(0, maxNumberFilms);

  return checkFilmsCardsByZero(filmsCards, filmCardKey, maxNumberFilms);
};

/**
 * Check films cards for same values.
 * @param {array} filmsCards
 * @param {string} filmCardKey
 * @return {boolean}
 */
const filmsCardsHaveSameValues = (filmsCards, filmCardKey) => {
  let maxNumber = getValueOfFieldForFilmCard(filmsCards[0], filmCardKey);
  const filmsCardsFilter = filmsCards.filter((filmCard) =>
    maxNumber === getValueOfFieldForFilmCard(filmCard, filmCardKey));

  return filmsCards.length - filmsCardsFilter.length;
};

/**
 * Return films cards after checking for zero.
 * @param {array} filmsCards
 * @param {string} filmCardKey
 * @param {number} maxNumberFilms
 * @return {array}
 */
const checkFilmsCardsByZero = (filmsCards, filmCardKey, maxNumberFilms) => {
  let numberFilmsByZero = 0;
  filmsCards.forEach((filmCard) => {
    if (!getValueOfFieldForFilmCard(filmCard, filmCardKey)) {
      numberFilmsByZero += 1;
    }
  });
  if (numberFilmsByZero === maxNumberFilms) {
    filmsCards = [];
  }

  return filmsCards;
};

/**
 * Return value for film card by same values.
 * @param {object} filmCard
 * @param {string} filmCardKey
 * @return {number}
 */
const getValueOfFieldForFilmCard = (filmCard, filmCardKey) => {
  let fieldValue = null;
  if (filmCardKey === `rating`) {
    fieldValue = filmCard[filmCardKey];
  } else if (filmCardKey === `comments`) {
    fieldValue = filmCard[filmCardKey].length;
  }

  return fieldValue;
};

let totalDownloadedFilmsCards = FILMS_CARDS_STEP;

/**
 * Set total downloaded films cards.
 */
const setNumberDownloadedFilmsCards = () => {
  totalDownloadedFilmsCards += FILMS_CARDS_STEP;
};

let startCountfilmsCardsPortion = 0;
let stepFilmsCardsPortion = FILMS_CARDS_STEP;

/**
 * Return function for portion of film cards.
 * @return {function}
 */
const getFilmsCardsPortion = () => {
  startCountfilmsCardsPortion = 0;
  /**
   * Return portion of film cards.
   * @return {array}
   */
  return () => {
    const filmCardsPortion = filmsCardsCurrent.slice(startCountfilmsCardsPortion,
        startCountfilmsCardsPortion + stepFilmsCardsPortion);

    startCountfilmsCardsPortion += stepFilmsCardsPortion;
    stepFilmsCardsPortion = FILMS_CARDS_STEP;

    return filmCardsPortion;
  };
};

/**
 * Step of displaying the number of films.
 * @param {number} newStep
 */
const changefilmsCardsPortionCount = (newStep) => {
  startCountfilmsCardsPortion = 0;
  stepFilmsCardsPortion = newStep;
};

/**
 * Return amount of watched films.
 * @param {date} boundaryUserDate
 * @return {number}
 */
const getWatchedFilmsAmount = (boundaryUserDate) => {
  let filmsAmount = 0;
  filmsCardsCurrent.forEach((filmCard) => {
    filmCard.controlsTypes.forEach((controlType) => {
      if (controlType === filmControlsTypesId.watched
        && (boundaryUserDate === null
        || filmCard.userWatchingDate >= boundaryUserDate)) {
        filmsAmount++;
      }
    });
  });

  return filmsAmount;
};

/**
 * Return unique genres from filmsCardsCurrent.
 * @param {date} boundaryUserDate
 * @return {object}
 */
const getUniqueGenres = (boundaryUserDate) => {
  const allGenres = [];
  filmsCardsCurrent.forEach((filmCard) => {
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
};

/**
 * Return a top genre.
 * @param {date} boundaryUserDate
 * @return {string}
 */
const getTopGenre = (boundaryUserDate) => {
  let topGenre = null;
  const uniqueGenres = getUniqueGenres(boundaryUserDate);
  const maxGenreAmount = Math.max(...Object.values(uniqueGenres));
  const uniqGenresTotal = Object.entries(uniqueGenres);
  for (let [genre, amount] of uniqGenresTotal) {
    if (amount === maxGenreAmount) {
      topGenre = genre;
      break;
    }
  }

  return topGenre;
};

/**
 * Return total duration of all films.
 * @param {date} boundaryUserDate
 * @return {number}
 */
const getTotalDuration = (boundaryUserDate) => {
  let totalDuration = 0;
  filmsCardsCurrent.forEach((filmCard) => {
    if (boundaryUserDate === null
      || filmCard.userWatchingDate >= boundaryUserDate) {
      totalDuration += moment(filmCard.duration);
    }
  });

  return totalDuration;
};

/**
 * Return object of films amount by categories.
 * @param {string} category
 * @return {number}
 */
const getFilmsAmountByCategories = (category) => {
  let filmsAmount = 0;
  filmsCardsCurrent.forEach((filmCard) => {
    filmCard.controlsTypes.forEach((controlType) => {
      if (controlType === category) {
        filmsAmount++;
      }
    });
  });

  return filmsAmount;
};

/**
 * Return max number of watched film..
 * @return {number}
 */
const getMaxNumberOfWatchedFilm = () => {
  let filmsTotalWatched = 0;
  filmsCardsMain.forEach((filmCard) => {
    filmCard.controlsTypes.forEach((controlType) => {
      if (controlType === filmControlsTypesId.watched) {
        filmsTotalWatched += 1;
      }
    });
  });

  return filmsTotalWatched;
};

/**
 * Return user total rank.
 * @return {string}
 */
const getUserTotalRank = () => {
  const maxNumber = getMaxNumberOfWatchedFilm();
  let userTotalRank = null;
  if (maxNumber === 0) {
    userTotalRank = userRanks.zero;
  } else if (maxNumber >= 1 && maxNumber <= 10) {
    userTotalRank = userRanks.novice;
  } else if (maxNumber >= 11 && maxNumber <= 20) {
    userTotalRank = userRanks.fan;
  } else if (maxNumber >= 21) {
    userTotalRank = userRanks.movieBuff;
  }

  return userTotalRank;
};

/**
 * Return total films cards.
 * @return {number}
 */
const getTotalFilmsCards = () => {
  return filmsCardsMain.length;
};

/**
 * Update film card for sending form.
 * @param {object} newData
 * @param {object} filmCard
 * @param {string} keyUpdate
 * @param {different} newValue
 */
const updateServerDataForSendingForm = (newData, filmCard, keyUpdate, newValue) => {
  if (newValue === null
    || (Array.isArray(newValue) && newValue.length === 0)) {
    return;
  }
  if (keyUpdate !== `comments`) {
    filmCard[keyUpdate] = newValue;
    return;
  }
  if (newData.comment.text !== null) {
    filmCard[keyUpdate].push(newValue);
  }
};

/**
 * Delete comment in server.
 * @param {object} newData
 * @param {object} filmCard
 */
const deleteCommentInServerData = (newData, filmCard) => {
  const currentKey = `comments`;
  const filmCardEntries = Object.keys(filmCard);
  for (let key of filmCardEntries) {
    if (key !== currentKey) {
      continue;
    }
    const commentsCopy = Object.assign(filmCard[currentKey]);
    filmCard[currentKey] = [];
    for (const comment of commentsCopy) {
      if (comment.id !== newData.comment.id) {
        filmCard[currentKey].push(comment);
      }
    }
  }
};

/**
 * Update data in teh server.
 * @param {object} newData
 */
const updateServerData = (newData) => {
  for (const filmCard of filmsCardsCurrent) {
    if (filmCard.id !== newData.id) {
      continue;
    }
    const newDataEntries = Object.entries(newData);
    for (let [key, value] of newDataEntries) {
      const keyUpdate = key === `comment` ? `comments` : key;
      if (newData.isSendingForm) {
        updateServerDataForSendingForm(newData, filmCard, keyUpdate, value);
        continue;
      }
      deleteCommentInServerData(newData, filmCard, keyUpdate);
    }
  }
};

const filmLists = {
  AllMoviesUpcoming: {
    title: filmsCategories.AllMoviesUpcoming,
    id: filmsCategoriesId.AllMoviesUpcoming,
    isVisuallyHidden: true,
    isExtra: false,
    isButton: `true`
  },
  TopRated: {
    title: filmsCategories.TopRated,
    id: filmsCategoriesId.TopRated,
    isVisuallyHidden: false,
    isExtra: true,
    isButton: ``
  },
  MostCommented: {
    title: filmsCategories.MostCommented,
    id: filmsCategoriesId.MostCommented,
    isVisuallyHidden: false,
    isExtra: true,
    isButton: ``
  }
};

const menuTypesId = {
  'all': `all`,
  'watchlist': filmControlsTypesId.watchlist,
  'history': filmControlsTypesId.watched,
  'favorites': filmControlsTypesId.favorite,
  'stats': `stats`
};

/**
 * Return menu types.
 * @return {array}
 */
const getMenuTypes = () => {
  return [
    {
      'title': `All movies`,
      'id': menuTypesId.all,
      'isActive': true,
      'filmsCount': 0,
      'modifiers': []
    },
    {
      'title': `Watchlist`,
      'id': menuTypesId.watchlist,
      'isActive': false,
      'filmsCount': getFilmsAmountByCategories(filmControlsTypesId.watchlist),
      'modifiers': []
    },
    {
      'title': `History`,
      'id': menuTypesId.history,
      'isActive': false,
      'filmsCount': getFilmsAmountByCategories(filmControlsTypesId.watched),
      'modifiers': []
    },
    {
      'title': `Favorites`,
      'id': menuTypesId.favorites,
      'isActive': false,
      'filmsCount': getFilmsAmountByCategories(filmControlsTypesId.favorite),
      'modifiers': []
    },
    {
      'title': `Stats`,
      'id': menuTypesId.stats,
      'isActive': false,
      'filmsCount': 0,
      'modifiers': [
        `additional`
      ]
    }
  ];
};

const statisticFiltersId = {
  'allTime': `all-time`,
  'today': `today`,
  'week': `week`,
  'month': `month`,
  'year': `year`
};

/**
 * Return statistic filters.
 * @param {string} isCheckedCategory
 * @return {array}
 */
const getStatisticFilters = (isCheckedCategory) => {
  return [
    {
      id: statisticFiltersId.allTime,
      title: `All time`,
      isChecked:
        isCheckedCategory === statisticFiltersId.allTime ? true : false
    },
    {
      id: statisticFiltersId.today,
      title: `Today`,
      isChecked:
        isCheckedCategory === statisticFiltersId.today ? true : false
    },
    {
      id: statisticFiltersId.week,
      title: `Week`,
      isChecked:
        isCheckedCategory === statisticFiltersId.week ? true : false
    },
    {
      id: statisticFiltersId.month,
      title: `Month`,
      isChecked:
        isCheckedCategory === statisticFiltersId.month ? true : false
    },
    {
      id: statisticFiltersId.year,
      title: `Year`,
      isChecked:
        isCheckedCategory === statisticFiltersId.year ? true : false
    }
  ];
};

/**
 * Return duration by hours.
 * @param {number} duration
 * @return {number}
 */
const getDurationByHours = (duration) => {
  return Math.trunc(duration / HOUR_MS);
};

/**
 * Return duration by minutes.
 * @param {number} duration
 * @return {number}
 */
const getDurationByMinutes = (duration) => {
  const hoursNumbers = Math.trunc(duration / HOUR_MS);
  for (let i = 1; i <= hoursNumbers; i++) {
    duration -= HOUR_MS;
  }

  return Math.ceil(duration / MINUTE_MS);
};

/**
 * Return statistic list.
 * @param {number} totalWatchedFilms
 * @param {number} totalDuration
 * @param {string} topGenre
 * @return {array}
 */
const getStatisticList = (totalWatchedFilms, totalDuration,
    topGenre) => {
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
          textTitle: getDurationByHours(totalDuration),
          isDescription: false
        },
        {
          textTitle: `h`,
          isDescription: true
        },
        {
          textTitle: getDurationByMinutes(totalDuration),
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
};

export {
  getImgPathEmoji,
  sortTypes,
  sortTypesId,
  filmCardControlsTypes,
  filmDetailsControlsTypes,
  filmControlsTypesId,
  emojiList,
  filmLists,
  getMenuTypes,
  menuTypesId,
  getStatisticList,
  filmsCardsMain,
  filmsCardsCurrent,
  getTotalFilmsCards,
  filmsCategories,
  filmsCategoriesId,
  statisticFiltersId,
  ratingScales,
  totalDownloadedFilmsCards,
  getFilmsCardsPortion,
  changefilmsCardsPortionCount,
  updateServerData,
  doDefaultFilmCardsCurrent,
  selectfilmsCardsCurrent,
  setNumberDownloadedFilmsCards,
  findFilmsCardsCurrent,
  getTotalDuration,
  getWatchedFilmsAmount,
  getTopGenre,
  getStatisticFilters,
  getUniqueGenres,
  getUserTotalRank,
  getExtraFilmsTopRated,
  getExtraFilmsMostCommented,
  getSortFunctionForFilmByRating,
  getSortFunctionForFilmByDate,
  addFilmCardToFilmCardsMain,
  fillFilmsCardsCurrent,
  getMaxFilmPortionNumber,
  addCommentToFilmsCardsMain,
  addCommentToFilmsCardsCurrent
};
