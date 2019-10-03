/**
 * Return title of comments.
 * @param {number} commentsTotal
 * @return {string}
 */
const getCommentsTitleTemplate = (commentsTotal) => {
  return `
    <h3 class="film-details__comments-title">
      Comments
      <span class="film-details__comments-count">
        ${commentsTotal}
      </span>
    </h3>
    <ul class="film-details__comments-list"></ul>`;
};

export {
  getCommentsTitleTemplate
};
