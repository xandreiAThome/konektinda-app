describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display home page', () => {
    cy.contains('React Native Reusables').should('exist');
  });

  it('should navigate to counter tab', () => {
    cy.contains('Counter').click();
    cy.contains('Current Count').should('exist');
  });

  it('should increment counter', () => {
    cy.contains('Counter').click();
    cy.wait(500);
    cy.contains('Increase').click();
    cy.contains('1').should('exist');
  });

  it('should decrement counter', () => {
    cy.contains('Counter').click();
    cy.wait(500);
    cy.contains('Decrease').click();
    cy.contains('-1').should('exist');
  });

  it('should reset counter', () => {
    cy.contains('Counter').click();
    cy.wait(500);
    cy.contains('Increase').click();
    cy.contains('Increase').click();
    cy.contains('Reset').click();
    cy.contains('0').should('exist');
  });

  it('should navigate back to home', () => {
    cy.contains('Counter').click();
    cy.contains('Home').click();
    cy.contains('React Native Reusables').should('exist');
  });
});
