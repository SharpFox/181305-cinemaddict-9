/**
 * Return template for footer.
 * @param {number} count
 * @return {string}
 */
const getFooterTemplate = (count) => {
  return `
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`;
};

export {
  getFooterTemplate
};
