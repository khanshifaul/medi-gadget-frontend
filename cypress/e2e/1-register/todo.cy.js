/// <reference types="cypress" />

describe("Cypress Record", () => {
  it("Start", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('homepage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/');
    cy.scrollTo('bottom');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('shoppage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/shop');
    cy.scrollTo('bottom')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('ambulancepage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/ambulance');
    cy.scrollTo('bottom')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('contactpage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/contact');

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('input[name="name"]').clear('John Doe');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').clear('john.doe@example.com');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="subject"]').clear('Inquiry about product');
    cy.get('input[name="subject"]').type('Inquiry about product');
    cy.get('textarea[name="message"]').clear();
    cy.get('textarea[name="message"]').type('Hi! I’d like to ask about your product.');
    cy.get('button[type="submit"]').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('blogPage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/blog');
    // cy.scrollTo('bottom')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('RegisterPage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/auth/register');
    cy.get('input[name="name"]').clear('John Doe');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').clear('john.doe@example.com');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get(".toast")
      .contains("Email already in use!" || "Email Verification Token Sent")
      .should("be.visible");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('EmailVerificationPage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/auth/new-verification?token=354bd1d8-e1ba-4ab0-b243-4a26473c5011');
    
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('loginPage', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/auth/login');
    cy.get('input[name="email"]').clear('john.doe@example.com');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.wait(2000)
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('adminlogin', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://medi-gadget-iota.vercel.app/auth/login');
    cy.get('input[name="email"]').type('admin@medigadget.com');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.wait(2000)
    /* ==== End Cypress Studio ==== */
  });
});
