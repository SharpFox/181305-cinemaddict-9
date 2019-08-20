/**
 * Return template for details of film.
 * @param {object} filmCard
 * @param {object} controlsTypes
 * @param {array} emojiList
 * @return {string}
 */
const getFilmDetailsTemplate = (filmCard, controlsTypes, emojiList) => {
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
            src="${filmCard.img}"
            alt=""
          >

          <p class="film-details__age">${filmCard.age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">
                ${filmCard.title}
              </h3>
              <p class="film-details__title-original">
                Original: ${filmCard.title}
              </p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmCard.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmCard.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">
                Writers
              </td>
              <td class="film-details__cell">
                ${filmCard.writers.map((writer) => writer).join(`, `)}
              </td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">
                Actors
              </td>
              <td class="film-details__cell">
                ${filmCard.actors.map((actor) => actor).join(`, `)}
              </td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">
                Release Date
              </td>
              <td class="film-details__cell">
              ${filmCard.year}
              </td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">
                Runtime
              </td>
              <td class="film-details__cell">
                ${filmCard.duration}
              </td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">
                Country
              </td>
              <td class="film-details__cell">
                ${filmCard.country}  
              </td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">
                Genres
              </td>
              <td class="film-details__cell">
                ${filmCard.genres.map((genre) => (`<span class="film-details__genre">
                  ${genre}</span>`)).join(``)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${filmCard.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        ${Object.keys(controlsTypes).map((key) => (`<input type="checkbox"
          class="film-details__control-input visually-hidden"
          id="${key}"
          name="${key}"
         >
        <label for="${key}"
          class="film-details__control-label
            film-details__control-label--${key}">
            ${controlsTypes[key]}
         </label>`)).join(``)}       
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
          Comments 
          <span class="film-details__comments-count">
            ${filmCard.comments.length}
          </span>
        </h3>

        <ul class="film-details__comments-list">
          ${filmCard.comments.map((obj) => (`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${obj.img}"
                width="55"
                height="55"
                alt="emoji"
              >
            </span>
            <div>
              <p class="film-details__comment-text">
                ${obj.text}
              </p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">
                  ${obj.author}
                </span>
                <span class="film-details__comment-day">
                  ${obj.day}
                </span>
                <button class="film-details__comment-delete">
                  Delete
                </button>
              </p>
            </div>
          </li>`)).join(``)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji"
            class="film-details__add-emoji-label">
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input"
              placeholder="Select reaction below and write comment here" 
              name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiList.map((obj) => (`<input class="film-details__emoji-item visually-hidden"
              name="comment-emoji"
              type="radio"
              id="${obj.id}"
              value="${obj.value}"
            >
            <label class="film-details__emoji-label"
              for="${obj.id}">
              <img src="${obj.img}"
                width="30"
                height="30"
                alt="emoji"
              >
            </label>`)).join(``)}
          </div>
        </div>
      </section>
    </div>
  </form>`;
};

export {
  getFilmDetailsTemplate
};
