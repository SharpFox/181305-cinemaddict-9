import {
  getRandomValueMinMax,
  compareRandom
} from './utils.js';

const sortTypes = {
  default: true,
  date: false,
  rating: false
};

const controlsTypes = {
  watchlist: `Add to watchlist`,
  watched: `Already watched`,
  favorite: `Add to favorites`,
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

/**
 * Return random rating for interval from 1 to 10.
 * @return {number}
 */
const getRating = () => {
  const rating = getRandomValueMinMax(1, 10, 1);
  return rating > 10 ? Math.floor(rating) : rating;
};

/**
 * Return card of film.
 * @return {object}
 */
const getFilmCard = () => {
  return {
    genres: genres.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, genres.length - 1)),
    year: years[getRandomValueMinMax(0, years.length - 1)],
    title: titles[getRandomValueMinMax(0, titles.length - 1)],
    rating: getRating(),
    duration: durationList[getRandomValueMinMax(0, durationList.length - 1)],
    img: `./images/posters/`
      + posters[getRandomValueMinMax(0, posters.length - 1)],
    description: descriptions.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, descriptions.length - 1)),
    countComments: getRandomValueMinMax(0, 465),
    age: getRandomValueMinMax(6, 18),
    director: directors[getRandomValueMinMax(0, directors.length - 1)],
    writers: writers.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, writers.length - 1)),
    actors: actors.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, actors.length - 1)),
    country: countries[getRandomValueMinMax(0, countries.length - 1)],
    comments: comments.sort(compareRandom).slice(0,
        getRandomValueMinMax(1, comments.length - 1)),
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
    filmCards.push(getFilmCard());
  }
  return filmCards;
};

const filmCards = getFilmCards(titles.length);
const randomFilmCard = filmCards.sort(compareRandom)[0];
const countFilmCards = filmCards.length;
const userRating = getRandomValueMinMax(0, titles.length);

const filmTitles = [
  {
    title: `All movies. Upcoming`,
    isVisuallyHidden: true,
    isExtra: false,
    isButton: true,
    films: filmCards.slice(0, 5)
  },
  {
    title: `Top rated`,
    isVisuallyHidden: false,
    isExtra: true,
    isButton: false,
    films: filmCards.slice(10, 12)
  },
  {
    title: `Most commented`,
    isVisuallyHidden: false,
    isExtra: true,
    isButton: false,
    films: filmCards.slice(12, 15)
  }
];

const menuTypes = [
  {
    'title': `All movies`,
    'link': `all`,
    'filmsCount': getRandomValueMinMax(0, titles.length),
    'modifiers': []
  },
  {
    'title': `Watchlist`,
    'link': `watchlist`,
    'filmsCount': getRandomValueMinMax(0, titles.length),
    'modifiers': []
  },
  {
    'title': `History`,
    'link': `history`,
    'filmsCount': getRandomValueMinMax(0, titles.length),
    'modifiers': []
  },
  {
    'title': `Favorites`,
    'link': `favorites`,
    'filmsCount': getRandomValueMinMax(0, titles.length),
    'modifiers': []
  },
  {
    'title': `Stats`,
    'link': `stats`,
    'filmsCount': userRating,
    'modifiers': [
      `additional`,
      `active`
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
        textTitle: userRating,
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
        textTitle: genres[getRandomValueMinMax(0, genres.length - 1)],
        isDescription: false
      }
    ]
  }
];

export {
  sortTypes,
  controlsTypes,
  emojiList,
  filmTitles,
  menuTypes,
  statisticFilters,
  statisticTextList,
  filmCards,
  countFilmCards,
  randomFilmCard,
  userRating
};
