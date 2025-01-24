/// <reference types="cypress" />


describe('Login Page', () => {
  it('should display the login form', () => {
    cy.visit('/auth/login');
    cy.get('form').should('be.visible');
  });

  it('should allow a user to log in', () => {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});

