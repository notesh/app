describe('Notesh', () => {
  it('adds notes', () => {
    const note = "My first note";
    const otherNote = "Other note";

    cy.visit('http://localhost:8080/');

    cy.get('#InputNote')
      .type(note)
      .type('{enter}')
      .type(otherNote)
      .type('{enter}');

    cy.get('div')
      .should('contain', note)
      .should('contain', otherNote);
  });
});
