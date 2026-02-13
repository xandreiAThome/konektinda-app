describe('Checkout Page', () => {
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

    // 4. Click Cart
    cy.contains('Cart').click();
    cy.url().should('include', '/cart');
    cy.wait(10000);

    cy.contains('Proceed to Checkout')
      .closest('[role="button"]') 
      .should('be.visible')
      .click();

    cy.url().should('include', '/checkout');
  });

  /**
   * TEST 1: Cart Current State
   * This test verifies that the items are displayed correctly.
   */
  it('should display the items correctly', () => {
    let calculatedTotal = 0;
    cy.contains('Order Details').parent().within(() => {
        cy.get('div[class*="text-[#EB5555]"]')
            .should('have.length.gt', 0)
            .each(($el) => {
                cy.wrap($el).scrollIntoView();

                const priceText = $el.text();
                const priceValue = parseFloat(priceText.replace(/[^\d.]/g, ''));
                
                calculatedTotal += priceValue;
            });
    });

    cy.contains('Order Total -')
        .parent()
        .invoke('text')
        .then((totalText) => {
            const displayedTotal = parseFloat(totalText.replace(/[^\d.]/g, ''));
            expect(calculatedTotal).to.be.closeTo(displayedTotal, 0.01);
        });
  });

  /**
   * TEST 2: Checkout Page
   * This test verifies that all necessary sections are present.
   */
  it('should display all necessary sections on the checkout page', () => {
    cy.contains('Checkout').should('be.visible');
    cy.contains('1234 Mabini Street').should('be.visible');

    cy.contains('Cash On Delivery')
      .parentsUntil('[role="button"]')
      .contains('✓');

    cy.contains('Order Total').should('be.visible');
    cy.contains('Place Order').should('be.visible');
  });

  /**
   * TESTS: Checkout Interactions
   * This tests various interactions on the checkout page.
   */
  it('should allow changing payment method via the list', () => {
    cy.contains('GCASH').click();
  
    cy.contains('GCASH')
      .closest('[tabindex="0"]')     
      .find('.bg-red-400')
      .should('contain', '✓')
      .and('be.visible'); 

    cy.contains('Cash On Delivery')
        .closest('[tabindex="0"]')
        .should('not.contain.text', '✓');
  });

  it('should allow changing payment method via the Modal', () => {
    cy.contains('View all').click();
    
    cy.contains('Choose Payment Method').should('be.visible');

    cy.get('div[role="dialog"]', { timeout: 5000 }).within(() => {
      cy.contains('Paymaya').click();
      cy.contains('Confirm').click();
    });

    cy.contains('Choose Payment Method').should('not.exist');
    
    cy.contains('Paymaya')
      .parentsUntil('[role="button"]')
      .contains('✓');
  });

  it('should allow entering a note for the supplier', () => {
    const testNote = 'Please pack this carefully.';
    
    cy.get('textarea[placeholder="Leave a request for supplier..."]')
      .scrollIntoView()
      .should('be.visible')
      .type(testNote);

    cy.get('textarea[placeholder="Leave a request for supplier..."]')
      .should('have.value', testNote);
  });

  it('should interact with the Date Picker', () => {
    const targetDate = '2025-12-25';

    cy.contains('Change Delivery Date').scrollIntoView().click();

    cy.get('input[type="date"]').then(($input) => {
        const nativeInput = $input[0] as HTMLInputElement;
      
        const valueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, 
            'value'
        )?.set;
      
        valueSetter?.call(nativeInput, targetDate);
        
        nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
        nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    cy.get('input[type="date"]').should('not.exist');
    cy.contains('Earliest Arrival on Thursday, Dec 25, 2025').should('be.visible');
  });

  /** 
   * TEST 3: Place Order
   * This test verifies that an order can be placed successfully.
   */
  it('should successfully place an order', () => {

    cy.contains('Place Order').click();

    cy.url().should('include', '/order-complete');
    cy.wait(2000);
    cy.contains('Back to Main Hub').click();
    cy.url().should('include', '/');
  });
});
