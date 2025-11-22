describe('template spec', () => {
  it('invalid email', () => {
    cy.visit('localhost:8081');
    cy.wait(2000);

    cy.contains('Create Account').click();
    cy.get('input[placeholder="Enter your email"]').type('invalid-email');
    cy.contains('Register as Customer').click();
  });
});
