/**
 * Return template for profile.
 * @param {number} userRating
 * @return {string}
 */
const getProfileTemplate = (userRating) => {
  return `
    <p class="profile__rating">
      ${userRating}
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
