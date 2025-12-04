describe('Supplier Page', () => {
  const EMAIL = 'testuser@gmail.com';
  const PASSWORD = 'Testing1';

  beforeEach(() => {
    cy.visit('/');

    // 1. Type Username
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]').type(EMAIL);

    // 2. Type Password
    cy.get('input[placeholder="Enter your password"]').click();
    cy.get('input[placeholder="Enter your password"]').type(PASSWORD);

    // 3. Click Login
    cy.contains('Login').click();
    
    // 4. Click Browse and select first product
    cy.contains('Browse').click(); 
    cy.url().should('include', '/listing');
    cy.get('div.rounded-xl.bg-gray-100').first().click();
  });

  /**
   * TEST 1: Supplier Page from Product Page
   * This test verifies that the supplier page loads correctly from a product page.
   */
  it('should navigate to the supplier page', () => {
    cy.url().as('productPageUrl');
    cy.contains('Fresh Farms Co.')
      .invoke('text')
      .then((text) => text.replace('Distributed by', '').trim()) 
      .as('supplierName');

    cy.contains('Distributed by').click();

    cy.url().should('include', '/supplier/');
    cy.contains('All Products').should('be.visible');
    cy.contains('Shipping location').should('be.visible');
    cy.contains('Date Joined').should('be.visible');

    cy.get<string>('@supplierName').then((name) => {
        cy.get('div.bg-white')
          .filter(':visible')
          .first()
          .within(() => {
              cy.contains(name).should('be.visible');
          });
    });

    cy.get('div[style*="font-family: feather"]')
      .first()
      .click();

    cy.contains('Organic Apples').should('be.visible');
    cy.contains('Add to Cart').should('be.visible');

    cy.get<string>('@productPageUrl').then((url) => {
      cy.url().should('eq', url);
    });
  });

});