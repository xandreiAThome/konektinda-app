describe('Sample Test', () => {
  it('Visits the app and increments the counter', () => {
    cy.visit('http://localhost:8081');
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type('a');
    cy.get('#root input[placeholder="Enter your password"]').click();
    cy.get('#root input[placeholder="Enter your password"]').type('a');
    cy.get('#root button.w-full').click();
    cy.get('#root a[href="/counter"] div.r-height-h0d30l div:nth-child(2)').click();
    cy.get('#root button.bg-primary').click();
    cy.get('#root button.bg-primary').click();
    cy.get('#root div.font-bold.text-foreground').should('have.text', '2');
  });
});
