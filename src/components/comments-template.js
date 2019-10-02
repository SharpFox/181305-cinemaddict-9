import moment from 'moment';

/**
 * Return comment list.
 * @param {object} comments
 * @return {string}
 */
const getCommentsTemplate = ({_data, _comments}) => {
  return `
    <h3 class="film-details__comments-title">
      Comments
      <span class="film-details__comments-count">
        ${_comments.length}
      </span>
    </h3>
    <ul class="film-details__comments-list">
      ${_comments.map(({id, type, text, author, date}) => (`<li
        class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${_data.getImgPathEmoji(type)}"
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
              ${moment(date).fromNow()}
            </span>
            <button class="film-details__comment-delete"
              tabindex="4"
              data-id="${id}">
              Delete
            </button>
          </p>
        </div>
      </li>`)).join(``)}
    </ul>`;
};

export {
  getCommentsTemplate
};
