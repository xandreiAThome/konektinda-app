describe('Signup Functionality', () => {

    const SUCCESS_EMAIL = `testuser1@example.com`;
    const EXISTING_EMAIL = 'testuser@gmail.com'; // From our login test
    
    // Passwords for different validation scenarios
    const VALID_PASSWORD = 'TestPassword123';
    const PASS_SHORT = 'Test1';
    const PASS_NO_UPPER = 'testpassword123';
    const PASS_NO_NUM = 'TestPassword';
    const PASS_MISMATCH = 'DifferentPass123';

    beforeEach(() => {
        cy.visit('/signup'); 
    });

    /**
     * TEST 1: Successful Signup
     * Goal: Verifies a new user can sign up and is taken to the home page.
     */
    it('should sign up successfully with a new email and valid password', () => {
        
        // --- 1. Type Email ---
        cy.get('input[placeholder="Enter your email"]').click()
        cy.get('input[placeholder="Enter your email"]').type(SUCCESS_EMAIL).should('have.value', SUCCESS_EMAIL);
        
        // --- 2. Type Password ---
        cy.get('input[placeholder="Create a password"]').click();
        cy.get('input[placeholder="Create a password"]').type(VALID_PASSWORD).should('have.value', VALID_PASSWORD);

        // --- 3. Confirm Password ---
        cy.get('input[placeholder="Confirm your password"]').click();
        cy.get('input[placeholder="Confirm your password"]').type(VALID_PASSWORD).should('have.value', VALID_PASSWORD);

        // --- 4. Click Create Account ---
        cy.contains('Create Account').click(); 
        
        // --- 5. Verify Successful Login ---
        cy.contains('Browse', { timeout: 10000 }).should('be.visible');
        cy.url().should('eq', 'http://localhost:8081/');
    });

    /**
     * VALIDATION TESTS
     * Goal: Verifies all client-side validation errors appear correctly.
     */
    it('should show an error for an invalid email format', () => {
        cy.get('input[placeholder="Enter your email"]').type('test_email');
        cy.contains('Create Account').click(); 
        cy.contains('Please enter a valid email address').should('be.visible');
    });

    it('should show an error if the password is required (null)', () => {
        cy.get('input[placeholder="Enter your email"]').type(SUCCESS_EMAIL);
        // (skip password)
        cy.get('input[placeholder="Confirm your password"]').type(VALID_PASSWORD);
        cy.contains('Create Account').click(); 
        cy.contains('Password is required').should('be.visible');
    });

    it('should show an error if the confirm password is required (null)', () => {
        cy.get('input[placeholder="Enter your email"]').type(SUCCESS_EMAIL);
        cy.get('input[placeholder="Create a password"]').type(VALID_PASSWORD);
        // (skip confirm password)
        cy.contains('Create Account').click(); 
        cy.contains('Please confirm your password').should('be.visible');
    });

    it('should show an error when passwords do not match', () => {
        cy.get('input[placeholder="Enter your email"]').type(SUCCESS_EMAIL);
        cy.get('input[placeholder="Create a password"]').type(VALID_PASSWORD);
        cy.get('input[placeholder="Confirm your password"]').type(PASS_MISMATCH);
        cy.contains('Create Account').click(); 
        cy.contains('Passwords do not match').should('be.visible');
    });

    it('should show an error if password is less than 8 characters', () => {
        cy.get('input[placeholder="Enter your email"]').type(SUCCESS_EMAIL);
        cy.get('input[placeholder="Create a password"]').type(PASS_SHORT);
        cy.get('input[placeholder="Confirm your password"]').type(PASS_SHORT);
        cy.contains('Create Account').click(); 
        cy.contains('Password must be at least 8 characters').should('be.visible');
    });

    it('should show an error if password has no uppercase letter', () => {
        cy.get('input[placeholder="Enter your email"]').type(SUCCESS_EMAIL);
        cy.get('input[placeholder="Create a password"]').type(PASS_NO_UPPER);
        cy.get('input[placeholder="Confirm your password"]').type(PASS_NO_UPPER);
        cy.contains('Create Account').click(); 
        cy.contains('Password must contain at least one uppercase letter').should('be.visible');
    });

    it('should show an error if password has no number', () => {
        cy.get('input[placeholder="Enter your email"]').type(SUCCESS_EMAIL);
        cy.get('input[placeholder="Create a password"]').type(PASS_NO_NUM);
        cy.get('input[placeholder="Confirm your password"]').type(PASS_NO_NUM);
        cy.contains('Create Account').click(); 
        cy.contains('Password must contain at least one number').should('be.visible');
    });

    /**
     * TEST 5: Server Error (Email Already Exists)
     * Goal: Verifies a popup error appears for existing account.
     */
    it('should show a popup error when signing up with an existing email', () => {
        // --- 1. Type Existing Email ---
        cy.get('input[placeholder="Enter your email"]').click()
        cy.get('input[placeholder="Enter your email"]').type(EXISTING_EMAIL).should('have.value', EXISTING_EMAIL);
        
        // --- 2. Type Valid Password ---
        cy.get('input[placeholder="Create a password"]').click();
        cy.get('input[placeholder="Create a password"]').type(VALID_PASSWORD).should('have.value', VALID_PASSWORD);

        // --- 3. Confirm Password ---
        cy.get('input[placeholder="Confirm your password"]').click();
        cy.get('input[placeholder="Confirm your password"]').type(VALID_PASSWORD).should('have.value', VALID_PASSWORD);

        // --- 4. Set up Alert Listener ---
        // This code "catches" the popup.
        cy.on('window:alert', (text) => {
            expect(text).to.include('Signup Error');
            expect(text).to.include('An account with this email already exists');
        });

        // --- 5. Click Create Account ---
        cy.contains('Create Account').click(); 
        
        // --- 6. Verify Failure ---
        cy.url().should('include', '/signup');
    });
});