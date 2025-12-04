describe('Cart Page', () => {
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

    //4. Click Cart 
    cy.contains('Cart').click(); 
    cy.url().should('include', '/cart');
  });

  /**
   * TEST 1: Cart page
   * This test verifies that the cart page works and math is correct.
   */
  it('should verify math for all items regardless of order', () => {

    const unitPrices: Record<string, number> = {
        '1 kg bag': 4.99,
        '2 kg bag': 8.99,
        '12 pack': 7.49
    };

    let total = 0;
    cy.get('div.rounded-xl.bg-white, div.shadow.bg-white')
      .filter(':has(:contains("₱"))') 
      .each(($card) => {
          cy.wrap($card).within(() => {
              cy.get('div').invoke('text').then((cardText) => {
                  const variant = Object.keys(unitPrices).find(key => cardText.includes(key));
                  if (variant) {
                      const unitPrice = unitPrices[variant];
                      cy.contains(/x\d+\s*pc/).invoke('text').then((qtyText) => {
                          const quantity = parseInt(qtyText.replace(/[^\d]/g, ''));
                          cy.get('div[class*="text-[#EB5555]"], div.text-red-500').last().invoke('text').then((priceText) => {
                              const displayedPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
                              const expectedPrice = unitPrice * quantity;
                              expect(displayedPrice).to.be.closeTo(expectedPrice, 0.01);
                              total += displayedPrice;
                          });
                      });
                  } else {
                      cy.log('Found a card with no known variant, skipping math check.');
                  }
              });
          });
      }).then(() => {
          const expectedString = `₱${total.toFixed(2)}`;
          cy.contains('Order Total').parent().within(() => {
              cy.contains(expectedString).should('be.visible');
          });
      });
  });

  /**
   * TEST 2: Uncheck/Check item in Cart
   * This test verifies that unchecking and checking an item updates the Order Total correctly.
   */
  it('should update the Order Total when an item is unchecked/checked', () => {
    cy.contains('Order Total').parent().should('not.contain', '₱0.00');

    cy.contains('Order Total').parent().invoke('text').then((totalText) => {
        const initialTotal = parseFloat(totalText.replace(/[^\d.]/g, ''));

        cy.get('div.rounded-xl.bg-white, div.shadow.bg-white')
          .filter(':has(:contains("₱"))')
          .first()
          .within(() => {
              cy.get('div[class*="text-[#EB5555]"], div.text-red-500')
                .last()
                .invoke('text')
                .as('itemPriceText');

              cy.get('input[type="checkbox"]').should('be.checked');
              cy.get('input[type="checkbox"]').click({ force: true });
              cy.get('input[type="checkbox"]').should('not.be.checked');
          }); 

        cy.get<string>('@itemPriceText').then((priceStr) => {
            const itemPrice = parseFloat(priceStr.replace(/[^\d.]/g, ''));
            
            const expectedNewTotal = (initialTotal - itemPrice).toFixed(2);

            cy.contains('Order Total').parent().within(() => {
                cy.contains(`₱${expectedNewTotal}`).should('be.visible');
            });
        });

        cy.get('div.rounded-xl.bg-white, div.shadow.bg-white')
          .filter(':has(:contains("₱"))')
          .first()
          .within(() => {
              cy.get('input[type="checkbox"]').click({ force: true });
          });

        cy.contains('Order Total').parent().within(() => {
            cy.contains(`₱${initialTotal.toFixed(2)}`).should('be.visible');
        });
    });
  });

  /**
   * TEST 3: Edit quantities in Cart
   * This test verifies that editing quantities updates the item price correctly.
   */
  it('should allow editing quantities', () => {

    const unitPrices: Record<string, number> = {
        '1 kg bag': 4.99,
        '2 kg bag': 8.99,
        '12 pack': 7.49
    };

    cy.contains('Fresh Farms Co.').parents('div').first().within(() => {
        cy.contains('EDIT').click();
        cy.contains('DONE').should('be.visible');
    });

    cy.contains('2 kg bag')
      .parents('div')
      .filter(':has(:contains("₱"))')
      .first()
      .within(() => {
        cy.get('div').invoke('text').then((rowText) => {
            const variant = Object.keys(unitPrices).find(key => rowText.includes(key));
            const unitPrice = unitPrices[variant || '2 kg bag'];

        cy.get('div[class*="text-[#EB5555]"], div.text-red-500').last().invoke('text').then((priceText) => {
            const currentTotal = parseFloat(priceText.replace(/[^\d.]/g, ''));
            cy.contains('+').click();
            cy.wait(200);
            const expectedNewTotal = (currentTotal + unitPrice).toFixed(2);
            cy.contains(`₱${expectedNewTotal}`).should('be.visible');
            cy.contains('−').click();
            cy.contains(`₱${currentTotal.toFixed(2)}`).should('be.visible');
            });
        });
    });
    cy.contains('Fresh Farms Co.').parents('div').first().within(() => {
        cy.contains('DONE').click();
        cy.contains('EDIT').should('be.visible');
        cy.contains('+').should('not.exist');
    });
  });

  /**
   * TEST 4: Remove an item from Cart
   * This test verifies that removing an item updates the Order Total correctly.
   */

  it('should remove an item via the confirmation modal and update the total', () => {
    let initialTotal = 0;
    let itemPrice = 0;

    cy.contains('Order Total').parent().should('not.contain', '₱0.00');
    
    cy.contains('Order Total').parent().invoke('text').then((text) => {
        initialTotal = parseFloat(text.replace(/[^\d.]/g, ''));
    });

    cy.contains('Fresh Farms Co.').parents('div').first().within(() => {
        cy.contains('EDIT').click();
    });

    cy.contains('1 kg bag').parents('div').filter(':has(:contains("Remove"))').first().within(() => {
        cy.get('div[class*="text-[#EB5555]"], div.text-red-500')
          .last()
          .invoke('text')
          .then((text) => {
              itemPrice = parseFloat(text.replace(/[^\d.]/g, ''));
              cy.log('Item Price to Remove:', itemPrice);
          });

        cy.contains('Remove').click();
    });

    cy.get('div[role="dialog"][data-state="open"]').within(() => {
        cy.contains('button', 'Remove').click();
    });

    cy.contains('1 kg bag').should('not.exist');

    cy.contains('Order Total').parent().should(($element) => {
        const currentText = $element.text();
        const expectedNewTotal = (initialTotal - itemPrice).toFixed(2);
        expect(currentText).to.include(`₱${expectedNewTotal}`);
    });

    cy.get('body').contains('Fresh Farms Co.').parents('div').first().within(() => {
        cy.contains('DONE').click();
    });
  });

    /** 
     * TEST 5:Successful Add to Cart of an Item
     * This test verifies that a user can successfully add an item to the cart and see it there.
     */
  it('should browse, add an item, and verify it appears in the cart correctly', () => {
    cy.contains('Browse').click(); 
    cy.url().should('include', '/listing');

    cy.get('div.rounded-xl.bg-gray-100').first().click();

    cy.get('div[dir="auto"].text-lg.font-bold').first()
      .invoke('text')
      .as('productName');

    cy.contains('Add to Cart').click();

    cy.get('div.rounded-xl.border') 
      .filter(':has(:contains("+"))') 
      .first()
      .within(() => {
          cy.contains('₱').should('be.visible');
          cy.contains('+').click();
          cy.get('input').should('have.value', '1');
      });

    cy.get('div[role="dialog"]')
      .contains('Add to Cart')
      .click();
    cy.get('div[role="dialog"]').should('not.exist');

    cy.get('a[href="/cart"]').click();
    cy.url().should('include', '/cart');
    
    cy.get<string>('@productName').then((name) => {
        cy.contains(name).should('be.visible');
        cy.contains(name)
          .parents('div')
          .filter(':has(input[type="checkbox"])') 
          .first()
          .within(() => {
               cy.contains('1 kg bag').should('be.visible');
               cy.contains('x1 pc').should('be.visible');
          });
    });
  });
});