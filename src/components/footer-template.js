/**
 * Return template for footer.
 * @param {number} countFilmCards
 * @return {string}
 */
const getFooterTemplate = (countFilmCards) => {
  return `
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${countFilmCards} movies inside</p>
    </section>`;
};

export {
  getFooterTemplate
};
