/**
 * Return template for profile.
 * @param {number} count
 * @return {string}
 */
const getProfileTemplate = (count) => {
  return `
    <p class="profile__rating">
      ${count}
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
