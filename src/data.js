import {
  getRandomValueMinMax,
  compareRandom,
  cloneDeep
} from './utils.js';
import moment from 'moment';

const FILMS_CARDS_STEP = 5;

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

const genres = [
  `Drama`,
  `Mystery`,
  `Comedy`,
  `Musical`,
  `Western`,
  `Documentary`,
  `Action movie`,
  `Сartoon`,
  `Family`,
  `Sci-Fi`
];

const titles = [
  `Sagebrush Trail`,
  `The Dance of Life`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Man with the Golden Arm`,
  `The Great Flamarion`,
  `Santa Claus Conquers the Martians`,
  `Made for Each Other`,
  `Avengers`,
  `Quantum of Solace`,
  `Harry Potter And The Chamber of secrets`,
  `Dracula`,
  `Tom and Jerry`,
  `It`
];

const durationList = [
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T01:55:00`
  },
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T00:54:00`
  },
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T02:59:00`
  },
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T01:21:00`
  },
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T00:16:00`
  },
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T01:32:00`
  },
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T01:21:00`
  },
  {
    start: `1970-01-01T00:00:00`,
    end: `1970-01-01T01:18:00`
  }
];

const years = [
  `1956-03-15T00:00:00`,
  `1944-04-01T00:00:00`,
  `1978-01-01T00:00:00`,
  `1955-06-05T00:00:00`,
  `1983-09-24T00:00:00`
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra`,
  `Aliquam id orci ut lectus varius viverra`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus
   nunc ante ut dui`,
  `Sed sed nisi sed augue convallis suscipit in sed felis`,
  `Aliquam erat volutpat`,
  `Nunc fermentum tortor ac porta dapibus`,
  `In rutrum ac purus sit amet tempus`
];

const directors = [
  `Anthony Mann`,
  `Quentin Tarantino`,
  `David Litch`,
  `Andre Ovredal`,
  `John Rice`
];

const writers = [
  `Peter Eckerman`,
  `Eyal Podell`,
  `Jonathan E. Stewart`,
  `Kevin Hagman`,
  `Guillermo del Toro`
];

const actors = [
  `Leonardo DiCaprio`,
  `Brad Pitt`,
  `Margot Robbie`,
  `Emil Hirsch`,
  `Margaret Cuelli`,
  `Timothy Olyphant`,
  `Julia Butters`,
  `Austin butler`,
  `Dakota Fanning`,
  `Bruce Dern`
];

const countries = [
  `USA`,
  `Great Britain`,
  `China`,
  `Canada`,
  `Finland`
];

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

const comments = [
  {
    id: 0,
    type: emojiId.smile,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    date: `2019-09-15T12:05:55`
  },
  {
    id: 1,
    type: emojiId.sleeping,
    text: `Booooooooooring`,
    author: `John Doe`,
    date: `2019-09-17T18:01:35`
  },
  {
    id: 2,
    type: emojiId.puke,
    text: `Very very old. Meh`,
    author: `John Doe`,
    date: `2019-09-21T11:01:52`
  },
  {
    id: 3,
    type: emojiId.angry,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    date: `2019-09-19T02:01:12`
  }
];

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

/**
 * Return comments for film.
 * @return {array}
 */
const getComments = () => {
  const randomComments = comments.slice(0,
      getRandomValueMinMax(1, comments.length - 1));

  return randomComments;
};

/**
 * Return random rating for interval from 1 to 10.
 * @return {number}
 */
const getRating = () => {
  const rating = getRandomValueMinMax(1, 9, 1);
  return rating > 9 ? Math.floor(rating) : rating;
};

/**
 * Return random film control types.
 * @return {object}
 */
const getFilmControlsTypes = () => {
  const filmControlsTypesKeys = Object.keys(filmDetailsControlsTypes);
  return filmControlsTypesKeys.sort(compareRandom)
      .slice(0, getRandomValueMinMax(1, filmControlsTypesKeys.length - 1));
};

/**
 * Return card of film.
 * @param {number} id
 * @return {object}
 */
const getFilmCard = (id) => {
  const filmControlsTypes = getFilmControlsTypes();

  let filmUserRating = 0;
  filmControlsTypes.forEach((controlType) => {
    if (controlType === filmControlsTypesId.watched) {
      filmUserRating = getRating();
    }
  });
  return {
    id,
    genres: genres.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, genres.length - 1)),
    year: years[getRandomValueMinMax(0, years.length - 1)],
    title: titles[getRandomValueMinMax(0, titles.length - 1)],
    rating: getRating(),
    userRating: filmUserRating,
    duration: durationList[getRandomValueMinMax(0, durationList.length - 1)],
    img: `./images/posters/`
      + posters[getRandomValueMinMax(0, posters.length - 1)],
    description: descriptions.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, descriptions.length - 1)),
    comments: getComments(),
    age: getRandomValueMinMax(6, 18),
    director: directors[getRandomValueMinMax(0, directors.length - 1)],
    writers: writers.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, writers.length - 1)),
    actors: actors.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, actors.length - 1)),
    country: countries[getRandomValueMinMax(0, countries.length - 1)],
    controlsTypes: filmControlsTypes
  };
};

/**
 * Return array of cards of films.
 * @param {number} filmsCount
 * @return {array}
 */
const getFilmCardsMain = (filmsCount) => {
  const filmCards = [];
  for (let i = 0; i < filmsCount; i++) {
    filmCards.push(getFilmCard(i));
  }

  return filmCards;
};

const filmsCardsMain = getFilmCardsMain(titles.length);

/**
 * Clone filmCardMain.
 * @return {array}
 */
const cloneFilmCards = () => {
  const filmsCards = [];
  filmsCardsMain.forEach((filmCard) => {
    filmsCards.push(cloneDeep(filmCard));
  });

  return filmsCards;
};

let filmsCardsCurrent = cloneFilmCards();

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

let filmsCardsPortionCount = 0;
let stepFilmsCardsPortion = FILMS_CARDS_STEP;

/**
 * Return function for portion of film cards.
 * @return {function}
 */
const getFilmsCardsPortion = () => {
  filmsCardsPortionCount = 0;
  /**
   * Return portion of film cards.
   * @return {array}
   */
  return () => {
    const filmCardsPortion = filmsCardsCurrent.slice(filmsCardsPortionCount,
        filmsCardsPortionCount + stepFilmsCardsPortion);

    filmsCardsPortionCount += FILMS_CARDS_STEP;
    stepFilmsCardsPortion = FILMS_CARDS_STEP;

    return filmCardsPortion;
  };
};

/**
 * Step of displaying the number of films.
 * @param {number} newStep
 */
const changefilmsCardsPortionCount = (newStep) => {
  filmsCardsPortionCount = 0;
  stepFilmsCardsPortion = newStep;
};

/**
 * Return amount of watched films.
 * @return {number}
 */
const getWatchedFilmsAmount = () => {
  let filmsAmount = 0;
  filmsCardsCurrent.forEach((filmCard) => {
    filmCard.controlsTypes.forEach((controlType) => {
      if (controlType === filmControlsTypesId.watched) {
        filmsAmount++;
      }
    });
  });

  return filmsAmount;
};

/**
 * Return unique genres from filmsCardsCurrent.
 * @return {object}
 */
const getUniqueGenres = () => {
  const allGenres = [];
  filmsCardsCurrent.forEach((filmCard) => {
    filmCard.genres.forEach((genre) => allGenres.push(genre));
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
 * @return {string}
 */
const getTopGenre = () => {
  let topGenre = null;
  const uniqueGenres = getUniqueGenres();
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
 * @return {number}
 */
const getTotalDuration = () => {
  let totalDuration = 0;
  durationList.forEach((duration) => {
    totalDuration += moment(duration.end) - moment(duration.start);
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

const userRanks = {
  zero: ``,
  novice: `Novice`,
  fan: `Fan`,
  movieBuff: `Movie Buff`
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

const countFilmCards = filmsCardsCurrent.length;

/**
 * Update film card for sending form.
 * @param {object} newData
 * @param {object} filmCard
 * @param {string} keyUpdate
 * @param {different} value
 */
const updateServerDataForSendingForm = (newData, filmCard, keyUpdate, value) => {
  if (keyUpdate !== `comments`) {
    filmCard[keyUpdate] = value;
    return;
  }
  if (newData.comment.text !== null) {
    filmCard[keyUpdate].push(value);
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

const menuTypes = [
  {
    'title': `All movies`,
    'id': menuTypesId.all,
    'isActive': true,
    'filmsCount': countFilmCards,
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
          textTitle: moment(totalDuration).format(`H`),
          isDescription: false
        },
        {
          textTitle: `h`,
          isDescription: true
        },
        {
          textTitle: moment(totalDuration).format(`m`),
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
          textTitle: topGenre,
          isDescription: false
        }
      ]
    }
  ];
};

export {
  getImgPathEmoji,
  genres,
  sortTypes,
  sortTypesId,
  filmCardControlsTypes,
  filmDetailsControlsTypes,
  filmControlsTypesId,
  emojiList,
  filmLists,
  menuTypes,
  menuTypesId,
  getStatisticList,
  filmsCardsMain,
  filmsCardsCurrent,
  countFilmCards,
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
  getSortFunctionForFilmByDate
};
