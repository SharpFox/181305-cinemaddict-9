import {
  getRandomValueMinMax,
  compareRandom
} from './utils.js';

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
  `1h 55m`,
  `54m`,
  `1h 59m`,
  `1h 21m`,
  `16m`,
  `1h 32m`,
  `1h 21m`,
  `1h 18m`,
];

const years = [
  `15 March 1956`,
  `18 April 1944`,
  `1 January 1978`,
  `5 June 1955`,
  `24 September 1983`
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
    value: `grinning`,
    img: `./images/emoji/angry.png`
  }
];

const comments = [
  {
    img: `./images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    day: `3 days ago`
  },
  {
    img: `./images/emoji/sleeping.png`,
    text: `Booooooooooring`,
    author: `John Doe`,
    day: `2 days ago`
  },
  {
    img: `./images/emoji/puke.png`,
    text: `Very very old. Meh`,
    author: `John Doe`,
    day: `2 days ago`
  },
  {
    img: `./images/emoji/angry.png`,
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    day: `Today`
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
 * Return random film control types.
 * @return {object}
 */
const getFilmControlsTypes = () => {
  const filmControlsTypesKeys = Object.keys(filmDetailsControlsTypes);
  return filmControlsTypesKeys.sort(compareRandom)
      .slice(0, getRandomValueMinMax(1, filmControlsTypesKeys.length - 1));
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
  return {
    id,
    genres: genres.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, genres.length - 1)),
    year: years[getRandomValueMinMax(0, years.length - 1)],
    title: titles[getRandomValueMinMax(0, titles.length - 1)],
    rating: getRating(),
    userRating: getRating(),
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
    controlsTypes: getFilmControlsTypes()
  };
};

/**
 * Return array of cards of films.
 * @param {number} filmsCount
 * @return {array}
 */
const getFilmCards = (filmsCount) => {
  const filmCards = [];
  for (let i = 0; i < filmsCount; i++) {
    filmCards.push(getFilmCard(i));
  }
  return filmCards;
};

const filmsCards = getFilmCards(titles.length);

/**
 * Return function for portion of film cards.
 * @return {function}
 */
const getFilmsCardsPortion = () => {
  let currentCount = 0;

  /**
   * Return portion of film cards.
   * @return {array}
   */
  return () => {
    const filmCardsPortion = filmsCards.slice(currentCount, currentCount + 5);
    currentCount += 5;
    return filmCardsPortion;
  };
};

/**
 * Return amount of watched films.
 * @return {number}
 */
const getWatchedFilmsAmount = () => {
  let filmsAmount = 0;
  filmsCards.forEach((filmCard) => {
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
  filmsCards.forEach((filmCard) => {
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
  filmsCards.forEach((filmCard) => {
    filmCard.controlsTypes.forEach((controlType) => {
      if (controlType === category) {
        filmsAmount++;
      }
    });
  });
  return filmsAmount;
};

const userTotalRating = getWatchedFilmsAmount();
const countFilmCards = filmsCards.length;

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
  'watchlist': `watchlist`,
  'history': `history`,
  'favorites': `favorites`,
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
        textTitle: `130`,
        isDescription: false
      },
      {
        textTitle: `h`,
        isDescription: true
      },
      {
        textTitle: `22`,
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
  filmsCards,
  countFilmCards,
  userTotalRating,
  filmsCategoriesId,
  ratingScales,
  getFilmsCardsPortion
};
