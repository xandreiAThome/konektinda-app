describe('test', () => {
  it('test', function () {
    cy.visit('http://localhost:8081');
    cy.get('#root input[placeholder="Enter your username"]').click();
    cy.get('#root input[placeholder="Enter your username"]').type('a');
    cy.get('#root input[placeholder="Enter your password"]').click();
    cy.get('#root input[placeholder="Enter your password"]').type('a');
    cy.get('#root button.w-full').click();
    cy.get('#root a[href="/listing"] div:nth-child(2) div.r-userSelect-lrvibr').click();
    cy.wait(2000);
    cy.get(
      '#root div:nth-child(2) > div.flex-wrap > div:nth-child(1) > div.overflow-hidden > div.w-full'
    ).should('be.visible');
  });
});
