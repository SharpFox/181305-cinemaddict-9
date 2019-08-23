/**
 * Return template comment fo film.
 * @param {object} emojiList
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
 * @param {object} filmCard
 * @param {object} controlsTypes
 * @param {array} emojiList
 * @return {string}
 */
const getFilmDetailsTemplate = ({img, age, title, rating, director, writers,
  actors, year, duration, country, genres, description, comments},
controlsTypes, emojiList) => {
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
              src="${img}"
              alt=""
            >
            <p class="film-details__age">${age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">
                  ${title}
                </h3>
                <p class="film-details__title-original">
                  Original: ${title}
                </p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Writers
                </td>
                <td class="film-details__cell">
                  ${writers.map((writer) => writer).join(`, `)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Actors
                </td>
                <td class="film-details__cell">
                  ${actors.map((actor) => actor).join(`, `)}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Release Date
                </td>
                <td class="film-details__cell">
                ${year}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Runtime
                </td>
                <td class="film-details__cell">
                  ${duration}
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Country
                </td>
                <td class="film-details__cell">
                  ${country}  
                </td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">
                  Genres
                </td>
                <td class="film-details__cell">
                  ${genres.map((genre) => (`<span class="film-details__genre">
                    ${genre}</span>`)).join(``)}
                </td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          ${Object.keys(controlsTypes).map((type) => (`<input type="checkbox"
            class="film-details__control-input visually-hidden"
            id="${type}"
            name="${type}"
          >
          <label for="${type}"
            class="film-details__control-label
              film-details__control-label--${type}">
              ${controlsTypes[type]}
          </label>`)).join(``)}       
        </section>
      </div>
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap"> 
          <h3 class="film-details__comments-title">
            Comments
            <span class="film-details__comments-count">
              ${comments.length}
            </span>
          </h3>
          ${getCommentListTemplate(comments)}
          <div class="film-details__new-comment"> 
            <div for="add-emoji"
              class="film-details__add-emoji-label">
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input"
                placeholder="Select reaction below and write comment here" 
                name="comment"></textarea>
            </label> 
            ${getFilmCommentTemplate(emojiList)}         
          </div>
        </section>
      </div>
    </form>`;
};

export {
  getFilmDetailsTemplate
};
