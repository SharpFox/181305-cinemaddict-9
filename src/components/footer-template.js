/**
 * Return template for footer.
 * @param {number} footer
 * @return {string}
 */
const getFooterTemplate = ({_countFilmCards}) => {
  return `
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${_countFilmCards} movies inside</p>
    </section>`;
};

export {
  getFooterTemplate
};
