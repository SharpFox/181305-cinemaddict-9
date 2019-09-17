/**
 * Return template for profile.
 * @param {number} userTotalRating
 * @return {string}
 */
const getProfileTemplate = (userTotalRating) => {
  return `
    <p class="profile__rating">
      ${userTotalRating}
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
