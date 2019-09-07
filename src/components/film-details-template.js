/**
 * Return template comment fo film.
 * @param {array} emojiList
 * @return {string}
 */
const getFilmCommentTemplate = (emojiList) => {
  return `
    <div class="film-details__emoji-list">
      ${emojiList.map(({id, value, img}) => (`<input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="${id}"
        value="${value}"
      >
      <label class="film-details__emoji-label"
        for="${id}">
        <img src="${img}"
          width="30"
          height="30"
          alt="emoji"
        >
      </label>`)).join(``)}
    </div>`;
};

/**
 * Return comment list.
 * @param {array} comments
 * @return {string}
 */
const getCommentListTemplate = (comments) => {
  return `
    <ul class="film-details__comments-list">
      ${comments.map(({img, text, author, day}) => (`<li
        class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${img}"
            width="55"
            height="55"
            alt="emoji"
          >
        </span>
        <div>
          <p class="film-details__comment-text">
            ${text}
          </p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">
              ${author}
            </span>
            <span class="film-details__comment-day">
              ${day}
            </span>
            <button class="film-details__comment-delete">
              Delete
            </button>
          </p>
        </div>
      </li>`)).join(``)}
    </ul>`;
};

/**
 * Return template for details of film.
 * @param {object} filmDetails
 * @return {string}
 */
const getFilmDetailsTemplate = ({_img, _age, _title, _rating, _director, _writers,
  _actors, _year, _duration, _country, _genres, _description, _comments,
  _controlsTypes, _emojiList}) => {
  return `
    <form class="film-details__inner"
      action=""
      method="get"
      >
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" 
            type="button">
            close
          </button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img"
              src="${_img}"
              alt=""
            >
            <p class="film-details__age">${_age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">
                  ${_title}
                </h3>
                <p class="film-details__title-original">
                  Original: ${_title}
                </p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${_rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${_director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Writers
                </td>
                <td class="film-details__cell">
                  ${_writers.map((writer) => writer).join(`, `)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Actors
                </td>
                <td class="film-details__cell">
                  ${_actors.map((actor) => actor).join(`, `)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Release Date
                </td>
                <td class="film-details__cell">
                ${_year}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Runtime
                </td>
                <td class="film-details__cell">
                  ${_duration}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Country
                </td>
                <td class="film-details__cell">
                  ${_country}  
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Genres
                </td>
                <td class="film-details__cell">
                  ${_genres.map((genre) => (`<span class="film-details__genre">
                    ${genre}</span>`)).join(``)}
                </td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${_description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          ${Object.keys(_controlsTypes).map((type) => (`<input type="checkbox"
            class="film-details__control-input visually-hidden"
            id="${type}"
            name="${type}"
          >
          <label for="${type}"
            class="film-details__control-label
              film-details__control-label--${type}">
              ${_controlsTypes[type]}
          </label>`)).join(``)}       
        </section>
      </div>
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap"> 
          <h3 class="film-details__comments-title">
            Comments
            <span class="film-details__comments-count">
              ${_comments.length}
            </span>
          </h3>
          ${getCommentListTemplate(_comments)}
          <div class="film-details__new-comment"> 
            <div for="add-emoji"
              class="film-details__add-emoji-label">
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input"
                placeholder="Select reaction below and write comment here" 
                name="comment"></textarea>
            </label> 
            ${getFilmCommentTemplate(_emojiList)}         
          </div>
        </section>
      </div>
    </form>`;
};

export {
  getFilmDetailsTemplate
};
