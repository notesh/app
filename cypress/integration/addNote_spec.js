describe('add a note', () => {
  it('Visits wadus app and write a note', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#InputNote').type('My first note').type('{enter}');

    cy.get('div').should('contain', 'My first note');
  });
});
