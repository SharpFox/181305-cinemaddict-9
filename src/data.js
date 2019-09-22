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

const userRanks = [
  `Movie Buff`,
  `Dilettante`,
  `Сritic`
];

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

const emojiList = [
  {
    id: `emoji-smile`,
    value: `sleeping`,
    img: `./images/emoji/smile.png`
  },
  {
    id: `emoji-sleeping`,
    value: `neutral-face`,
    img: `./images/emoji/sleeping.png`
  },
  {
    id: `emoji-gpuke`,
    value: `grinning`,
    img: `./images/emoji/puke.png`
  },
  {
    id: `emoji-angry`,
    value: `angry`,
    img: `./images/emoji/angry.png`
  }
];

/**
 * Return path to img for emoji.
 * @param {string} value
 * @return {string}
 */
const getEmojiImg = (value) => {
  let valueEmoji = ``;
  for (let emoji of emojiList) {
    if (emoji.value === value) {
      valueEmoji = emoji.img;
      break;
    }
  }

  return valueEmoji;
};

const comments = [
  {
    id: 0,
    img: `./images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    date: `2019-09-15T12:05:55`
  },
  {
    id: 1,
    img: `./images/emoji/sleeping.png`,
    text: `Booooooooooring`,
    author: `John Doe`,
    date: `2019-09-17T18:01:35`
  },
  {
    id: 2,
    img: `./images/emoji/puke.png`,
    text: `Very very old. Meh`,
    author: `John Doe`,
    date: `2019-09-21T11:01:52`
  },
  {
    id: 3,
    img: `./images/emoji/angry.png`,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    date: `2019-09-19T02:01:12`
  }
];

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

const ratingScales = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  return comments.sort(compareRandom).slice(0,
      getRandomValueMinMax(1, comments.length - 1));
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
 * Return categories for film.
 * @return {array}
 */
const getFilmCategoriesId = () => {
  let categoriesId = [];
  categoriesId.push(filmsCategoriesId.AllMoviesUpcoming);
  if (getRandomValueMinMax(0, 1)) {
    categoriesId.push(Object.entries(filmsCategoriesId)
    .slice(1, 3)[getRandomValueMinMax(0, 1)][1]);
  }

  return categoriesId;
};

/**
 * Return card of film.
 * @param {number} id
 * @return {object}
 */
const getFilmCard = (id) => {
  const filmComments = getComments();
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
    comments: filmComments,
    age: getRandomValueMinMax(6, 18),
    director: directors[getRandomValueMinMax(0, directors.length - 1)],
    writers: writers.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, writers.length - 1)),
    actors: actors.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, actors.length - 1)),
    country: countries[getRandomValueMinMax(0, countries.length - 1)],
    categoriesId: getFilmCategoriesId(),
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
 * Return a top genre.
 * @return {string}
 */
const getTopGenre = () => {
  let topGenre = null;
  const allGenres = [];
  filmsCardsCurrent.forEach((filmCard) => {
    filmCard.genres.forEach((genre) => allGenres.push(genre));
  });

  const uniqGenres = {};
  allGenres.forEach((genre) => {
    if (uniqGenres[genre] === undefined) {
      uniqGenres[genre] = 1;
    } else {
      uniqGenres[genre]++;
    }
  });

  const maxGenreAmount = Math.max(...Object.values(uniqGenres));
  const uniqGenresTotal = Object.entries(uniqGenres);
  for (let [genre, amount] of uniqGenresTotal) {
    if (amount === maxGenreAmount) {
      topGenre = genre;
      break;
    }
  }

  return topGenre;
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

const userTotalRating = userRanks[getRandomValueMinMax(0, userRanks.length - 1)];
const countFilmCards = filmsCardsCurrent.length;

/**
 * Update data in teh server.
 * @param {object} newData
 */
const updateServerData = (newData) => {
  filmsCardsCurrent.forEach((filmCard) => {
    if (filmCard.id === newData.id) {
      Object.entries(newData).forEach(([key, value]) => {
        const keyUpdate = key === `comment` ? `comments` : key;
        if (filmCard[keyUpdate] !== undefined) {
          if (keyUpdate === `comments`) {
            if (newData.comment.text !== null) {
              filmCard[keyUpdate].push(value);
            }
          } else {
            filmCard[keyUpdate] = value;
          }
        }
      });
    }
  });
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

const statisticFilters = [
  {
    attribute: `all-time`,
    title: `All time`,
    isChecked: true
  },
  {
    attribute: `today`,
    title: `Today`,
    isChecked: false
  },
  {
    attribute: `week`,
    title: `Week`,
    isChecked: false
  },
  {
    attribute: `month`,
    title: `Month`,
    isChecked: false
  },
  {
    attribute: `year`,
    title: `Year`,
    isChecked: false
  }
];

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

const totalDuration = getTotalDuration();

const statisticTextList = [
  {
    title: `You watched`,
    texts: [
      {
        textTitle: getWatchedFilmsAmount(),
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
        textTitle: getTopGenre(),
        isDescription: false
      }
    ]
  }
];

export {
  sortTypes,
  sortTypesId,
  filmCardControlsTypes,
  filmDetailsControlsTypes,
  filmControlsTypesId,
  emojiList,
  filmLists,
  menuTypes,
  menuTypesId,
  statisticFilters,
  statisticTextList,
  filmsCardsMain,
  filmsCardsCurrent,
  countFilmCards,
  userTotalRating,
  filmsCategoriesId,
  ratingScales,
  totalDownloadedFilmsCards,
  getFilmsCardsPortion,
  changefilmsCardsPortionCount,
  updateServerData,
  getEmojiImg,
  doDefaultFilmCardsCurrent,
  selectfilmsCardsCurrent,
  setNumberDownloadedFilmsCards
};
