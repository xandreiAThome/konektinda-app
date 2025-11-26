describe('Login Functionality', () => {
  const VALID_EMAIL = 'testuser@gmail.com';
  const VALID_PASSWORD = 'Testing1';
  const INVALID_EMAIL = 'test_email';
  const INVALID_PASSWORD = 'wrong_password';

  beforeEach(() => {
    // Start at the login page
    cy.visit('/');
  });

  /**
   * TEST 1: Successful Login
   * Goal: Verifies a user with valid credentials can log in.
   */
  it('should log in successfully with valid credentials', () => {
    // --- 1. Type Username
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]')
      .type(VALID_EMAIL)
      .should('have.value', VALID_EMAIL);

    // --- 2. Type Password
    cy.get('input[placeholder="Enter your password"]').click();
    cy.get('input[placeholder="Enter your password"]')
      .type(VALID_PASSWORD)
      .should('have.value', VALID_PASSWORD);

    // --- 3. Click Login ---
    cy.contains('Login').click();

    // --- 4. Verify Successful Login ---
    // We look for the 'Browse' link as our indicator of a successful login.
    cy.contains('Browse', { timeout: 10000 }).should('be.visible');

    // And verify we are on the main page
    cy.url().should('eq', 'http://localhost:8081/');
  });

  /**
   * TEST 2: Validation Error (Invalid Email Format)
   * Goal: Verifies the error message will show if the format of the email is incorrect.
   */
  it('should show an error for an invalid email format', () => {
    // --- 1. Type an invalid email string ---
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]')
      .type(INVALID_EMAIL)
      .should('have.value', INVALID_EMAIL);

    // --- 2. Click the Login Button ---
    cy.contains('Login').click();

    // --- 3. Verify the Error ---
    cy.contains('Please enter a valid email address').should('be.visible');

    // And verify we are still on the login page
    cy.url().should('eq', 'http://localhost:8081/login');
  });

  /**
   * TEST 3: Validation Error (Password is Required)
   * Goal: Verifies the error will show if the password is empty.
   */
  it('should show an error if the password is empty', () => {
    // --- 1. Type a valid email ---
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]')
      .type(VALID_EMAIL)
      .should('have.value', VALID_EMAIL);

    // --- 2. Do NOT type a password ---

    // --- 3. Click the Login Button ---
    cy.contains('Login').click();

    // --- 4. Verify the Error ---
    cy.contains('Password is required').should('be.visible');
  });

  /**
   * TEST 4: Failed Login (Server Error)
   * Goal: Verifies a popup error appears for invalid credentials.
   */
  it('should show a popup error for invalid credentials', () => {
    // --- 1. Type Valid Email ---
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]')
      .type(VALID_EMAIL)
      .should('have.value', VALID_EMAIL);

    // --- 2. Type Invalid Password ---
    cy.get('input[placeholder="Enter your password"]').click();
    cy.get('input[placeholder="Enter your password"]')
      .type(INVALID_PASSWORD)
      .should('have.value', INVALID_PASSWORD);

    // --- 3. Click Login ---
    // This code "catches" the popup.
    cy.on('window:alert', (text) => {
      expect(text).to.include('Login Error');
    });

    cy.contains('Login').click();

    // --- 4. Verify Failure ---
    cy.url().should('eq', 'http://localhost:8081/login');
  });
});
