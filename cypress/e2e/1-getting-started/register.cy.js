/// <reference types="cypress" />

// cypress/integration/register.spec.js
describe("User Registration", () => {
  it("should register a new user", () => {
    cy.visit("/auth/register");

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.get(".toast")
      .contains("Email already in use!" || "Email Verification Token Sent")
      .should("be.visible");
  });
});
