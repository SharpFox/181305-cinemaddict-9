
const filmTitlesArr = [
  {
    title: `All movies. Upcoming`,
    isVisuallyHidden: true,
    isExtra: false,
    isButton: true,
    films: [1, 2, 3, 4, 5]
  },
  {
    title: `Top rated`,
    isVisuallyHidden: false,
    isExtra: true,
    isButton: false,
    films: [1, 2]
  },
  {
    title: `Most commented`,
    isVisuallyHidden: false,
    isExtra: true,
    isButton: false,
    films: [1, 2]
  }
];

const sortTypeObj = {
  'default': true,
  'date': false,
  'rating': false
};

export {
  sortTypeObj,
  filmTitlesArr
};
