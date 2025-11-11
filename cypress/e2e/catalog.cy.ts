describe('Catalog and Product Details Flow', () => {
  const username = 'cypress_test_user';
  const password = 'CypressTestPass123';

  beforeEach(() => {
    cy.visit('http://localhost:8081');

    // 1. Type Username
    cy.get('input[placeholder="Enter your username"]').click();
    cy.get('input[placeholder="Enter your username"]').type(username);

    // 2. Type Password
    cy.get('input[placeholder="Enter your password"]').click();
    cy.get('input[placeholder="Enter your password"]').type(password);

    // 3. Click Login
    cy.contains('Login').click();
  });

  /**
   * TEST 1: Catalog (Product Listing) Screen
   * This test verifies that the product list loads correctly.
   */
  it('should navigate to the Browse page and display a list of products', () => {
    cy.contains('Browse').click();

    // Assert the URL is correct for the listing page
    cy.url().should('include', '/listing');

    // This command waits for at least one card to appear.
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

    // Click the first element that matches the selector
    cy.get('div.rounded-xl.bg-gray-100').first().click();

    // Assert the URL changed to a product detail URL
    cy.url().should('include', '/product?product_id=');

    // Verify that the product details page contains an "Add to Cart" button
    cy.contains('Add to Cart').should('be.visible');
  });

  /**
   * TEST 3: Product Details Page
   * This test verifies that clicking another product shows its details.
   */
  it('should load a different product after returning to the list', () => {
    cy.log('Navigating to the Browse page...');
    cy.contains('Browse').click();

    // Click the first product and save its URL
    cy.get('div.rounded-xl.bg-gray-100').first().click();
    cy.url().should('include', '/product?product_id=');
    cy.url().as('firstProductUrl');

    // Go back
    cy.log('Clicking the "Back" arrow...');
    cy.get('path[d="m15 18-6-6 6-6"]').closest('svg').click();

    // Assert we are back on the list page
    cy.url().should('include', '/listing');
    cy.get('div.rounded-xl.bg-gray-100').should('have.length.greaterThan', 0);

    // Click the second product
    cy.get('div.rounded-xl.bg-gray-100').eq(1).click(); // .eq(1) selects the *second* element

    // Assert the new page loaded...
    cy.contains('Add to Cart').should('be.visible');
    cy.url().should('include', '/product?product_id=');

    // ...and that its URL is different from the first product's
    cy.get('@firstProductUrl').then((firstUrl) => {
      cy.url().should('not.eq', firstUrl);
    });
  });
});

it('sample', function () {
  cy.visit('http://localhost:8081');
});
