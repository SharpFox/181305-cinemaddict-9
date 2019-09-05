/**
 * Return template for film list.
 * @param {object} filmTitle
 * @return {string}
 */
const getFilmsListTemplate = ({_isExtra, _isVisuallyHidden, _title,
  _isButton, _id}) => {
  return `
    <section id="${_id}" data-id="${_id}" 
      data-isbutton="${_isButton}"
      class="films-list${_isExtra ? `--extra` : ``}">
      <h2 class="films-list__title
        ${_isVisuallyHidden ? `visually-hidden` : ``}">
        ${_title}
      </h2>
      <div class="films-list__container"></div>
    </section>`;
};

export {
  getFilmsListTemplate
};
