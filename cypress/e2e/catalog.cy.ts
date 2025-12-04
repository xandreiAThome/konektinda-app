describe('Catalog and Product Details Flow', () => {
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
  });

  /**
   * TEST 1: Catalog (Product Listing) Screen
   * This test verifies that the product list loads correctly.
   */
  it('should navigate to the Browse page and display a list of products', () => {
    cy.contains('Browse').click();
    cy.url().should('include', '/listing');
    cy.get('div.rounded-xl.bg-gray-100').should('have.length.greaterThan', 0);
  });

  /**
   * TEST 2: Product Details Page
   * This test verifies that clicking a product shows its details.
   */
  it('should click a product and navigate to its details page', () => {
    cy.contains('Browse').click();
    cy.url().should('include', '/listing');

    cy.get('div.rounded-xl.bg-gray-100').should('have.length.greaterThan', 0);
    cy.get('div.rounded-xl.bg-gray-100').first().click();
    cy.url().should('include', '/product?product_id=');

    cy.contains('Add to Cart').should('be.visible');
  });

  /**
   * TEST 3: Product Details Page
   * This test verifies that clicking another product shows its details.
   */
  it('should load a different product after returning to the list', () => {
    cy.log('Navigating to the Browse page...');
    cy.contains('Browse').click();

    cy.get('div.rounded-xl.bg-gray-100').first().click();
    cy.url().should('include', '/product?product_id=');
    cy.url().as('firstProductUrl');

    cy.log('Clicking the "Back" arrow...');
    cy.get('path[d="m15 18-6-6 6-6"]').closest('svg').click();

    cy.url().should('include', '/listing');
    cy.get('div.rounded-xl.bg-gray-100').should('have.length.greaterThan', 0);

    cy.get('div.rounded-xl.bg-gray-100').eq(1).click(); // .eq(1) selects the *second* element

    cy.contains('Add to Cart').should('be.visible');
    cy.url().should('include', '/product?product_id=');

    cy.get('@firstProductUrl').then((firstUrl) => {
      cy.url().should('not.eq', firstUrl);
    });
  });
});
