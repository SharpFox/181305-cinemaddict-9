import moment from 'moment';

/**
 * Return comment.
 * @param {object} comments
 * @return {string}
 */
const getCommentTemplate = ({_data, _type, _text, _author, _date}) => {
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${_data.getImgPathEmoji(_type)}"
        width="55"
        height="55"
        alt="emoji"
      >
    </span>
    <div>
      <p class="film-details__comment-text">
        ${_text}
      </p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">
          ${_author}
        </span>
        <span class="film-details__comment-day">
          ${moment(_date).fromNow()}
        </span>
        <button class="film-details__comment-delete"
          tabindex="4">
          Delete
        </button>
      </p>
    </div>
  </li>`;
};

export {
  getCommentTemplate
};
