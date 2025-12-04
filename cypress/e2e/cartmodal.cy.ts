describe('Cart Modal', () => {
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

    cy.get('div[dir="auto"].text-lg.font-bold').first()
      .invoke('text')
      .as('productName');
    
    cy.contains('Add to Cart').click();
  });

  /**
   * TEST 1: Cart popup
   * This test verifies that the popup works.
   */
  it('should select an item and add to cart', () => {
    let expectedTotal = 0.00;

    cy.get('div.rounded-xl.border')
      .filter(':has(:contains("+"))') 
      .each(($row, index) => {
          cy.wrap($row).within(() => {
            cy.get('div[class*="text-[#eb5555]"], div.text-red-500').first()
                .invoke('text')
                .then((priceText) => {
                    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                    expectedTotal += price;
                });
              cy.get('input').should('have.value', '0');
              cy.contains('+').click();
              cy.get('input').should('have.value', '1');
          });
      }).then(() => {
          const expectedString = `Order Total - ₱${expectedTotal.toFixed(2)}`;
          cy.contains(expectedString).should('be.visible');
      });
    
    cy.get<string>('@productName').then((name) => {
        cy.contains(name).should('be.visible');
    });

  });

  /**
   * TEST 2: Negative values in Add to Cart popup
   * This test verifies that negative values cannot be set.
   */
  it('should not set negative values', () => {
    cy.get('div.rounded-xl.border')
      .filter(':has(:contains("+"))') 
      .each(($row, index) => {
          cy.wrap($row).within(() => {
            cy.get('input').should('have.value', '0');
            cy.contains('-').click();
            cy.get('input').should('have.value', '0');
             cy.contains('-').click();
            cy.get('input').should('have.value', '0');
          });
      });

    cy.contains('Order Total - ₱0.00').should('be.visible');
    
    cy.get<string>('@productName').then((name) => {
        cy.contains(name).should('be.visible');
    });

  });

  /**
   * TEST 3: Manually typing quantity in Add to Cart popup
   * This test verifies that typing a number updates the total price.
   */
  it('should update the total price when typing a number manually', () => {
    const quantities = [10, 5];
    let expectedTotal = 0.00;

    cy.get('div[role="dialog"]')
      .find('div')
      .filter('.rounded-xl.border')
      .filter(':has(input)')
      .filter(':has(:contains("+"))')
      .each(($row, index) => {
          if (quantities[index] !== undefined) {
              cy.wrap($row).within(() => {
                cy.contains(/[₱P]/).invoke('text').then((priceText) => {
                      const cleanPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
                      expectedTotal += (cleanPrice * quantities[index]);
                      cy.log(`Row ${index + 1}: ${quantities[index]} x ${cleanPrice}`);
                  });
                  cy.get('input').first()
                    .clear()
                    .type(`${quantities[index]}`);
              });
          }
      }).then(() => {
        cy.contains(`Order Total - ₱${expectedTotal.toFixed(2)}`).should('be.visible');
      });
  });

  /**
   * TEST 4: Exceeding available stock in Add to Cart popup
   * This test verifies that an error is displayed when quantity exceeds stock.
   */
  it('should display an error when quantity exceeds available stock', () => {

    cy.intercept('PATCH', '**/cart/items/**', { 
      statusCode: 400,
      body: {
        message: 'Too much quantity. Not enough stock.'
      }
    }).as('addToCartRequest');

    cy.get('div.rounded-xl.bg-gray-100').first().click({ force: true });
 
    cy.get('div[role="dialog"]')
      .find('input')
      .first()
      .clear()
      .type('999');

    cy.get('div[role="dialog"]')
      .contains('Add to Cart')
      .click();

    cy.wait('@addToCartRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 400);

    cy.get('div[role="dialog"]').should('be.visible');

  });
});