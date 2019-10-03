/**
 * Return template for profile.
 * @param {number} profile
 * @return {string}
 */
const getProfileTemplate = ({_userTotalRating}) => {
  return `
    <p class="profile__rating">
      ${_userTotalRating}
    </p>
    <img class="profile__avatar"
      src="images/bitmap@2x.png"
      alt="Avatar"
      width="35"
      height="35"
    >`;
};

export {
  getProfileTemplate
};
