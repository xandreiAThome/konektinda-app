describe('Login Functionality', () => {
  const VALID_EMAIL = 'testuser@gmail.com';
  const VALID_PASSWORD = 'Testing1';
  const INVALID_EMAIL = 'test_email';
  const INVALID_PASSWORD = 'wrong_password';

  it('should show error for null email (w/ password)', function () {
    cy.visit('localhost:8081');
    cy.get('input[placeholder="Enter your password"]').click();
    cy.get('input[placeholder="Enter your password"]').type(VALID_PASSWORD);
    cy.contains('Login').click();
    cy.contains('Email is required').should('be.visible');
  });

  it('should show error for null password (w/ email)', function () {
    cy.visit('localhost:8081');
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]').type(VALID_EMAIL);
    cy.contains('Login').click();
    cy.contains('Password is required').should('be.visible');
  });

  it('should show error for null email and password', function () {
    cy.visit('localhost:8081');
    cy.contains('Login').click();
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });
});

describe('Create Account Functionality', () => {
  const EMAIL = 'test2@gmail.com';
  const PASSWORD = 'PASSWORD1';

  it('should display error message if password has no lowercase character', function () {
    cy.visit('localhost:8081/signup');
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]').type(EMAIL);
    cy.get('input[placeholder="Create a password"]').click();
    cy.get('input[placeholder="Create a password"]').type(PASSWORD);
    cy.get('input[placeholder="Confirm your password"]').click();
    cy.get('input[placeholder="Confirm your password"]').type(PASSWORD);
    cy.contains('Password must contain at least one lowercase letter').should('be.visible');
  });
});

describe('Successful Login Redirect', () => {
  const VALID_EMAIL = 'testuser@gmail.com';
  const VALID_PASSWORD = 'Testing1';
  it('should redirect to main page after login', () => {
    cy.visit('localhost:8081');
    cy.get('input[placeholder="Enter your email"]').click();
    cy.get('input[placeholder="Enter your email"]').type(VALID_EMAIL);
    cy.get('input[placeholder="Enter your password"]').click();
    cy.get('input[placeholder="Enter your password"]').type(VALID_PASSWORD);
    cy.contains('Login').click();
    cy.url().should('eq', 'http://localhost:8081/');
  });
});
