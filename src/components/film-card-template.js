/**
 * Return template for card of film.
 * @param {object} filmCard
 * @return {string}
 */
const getFilmCardTemplate = ({_title, _rating, _year, _duration, _genres, _img,
  _description, _comments, _controlsTypes, _filmCardControlsTypes}) => {
  return `
    <article class="film-card">
      <h3 class="film-card__title">
        ${_title}
      </h3>
      <p class="film-card__rating">
        ${_rating}
      </p>
      <p class="film-card__info">
        <span class="film-card__year">${_year}</span>
        <span class="film-card__duration">${_duration}</span>
        <span class="film-card__genre">${_genres[0]}</span>
      </p>
      <img src="${_img}"
        alt="" class="film-card__poster"
      >
      <p class="film-card__description">
        ${_description}
      </p>
      <a class="film-card__comments">
        ${_comments.length} comment${_comments.length === 1 ? `` : `s`}   
      </a>      
      <form class="film-card__controls">          
        ${Object.keys(_filmCardControlsTypes).map((type) => (`<button
          class="film-card__controls-item button
          film-card__controls-item--${_filmCardControlsTypes[type]}
          ${_controlsTypes.map((currentType) => (`
            ${currentType === type ? ` film-card__controls-item--active"` : `"`}`).trim())
            .join(``)}">
          ${_filmCardControlsTypes[type]}
        </button>`).trim()).join(``)}
      </form>
    </article>`;
};

export {
  getFilmCardTemplate
};
