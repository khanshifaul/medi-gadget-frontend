// cypress/integration/contact-form.spec.js
describe('Contact Form Submission', () => {
    beforeEach(() => {
      cy.visit('/contact');
    });
  
    it('should display the contact form', () => {
      cy.get('form').should('be.visible');
    });
  
    it('should allow a user to fill out and submit the contact form', () => {
      // Fill out the form fields
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('input[name="subject"]').type('Inquiry about product');
      cy.get('textarea[name="message"]').type('Hi! I’d like to ask about your product.');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Check for success message
      cy.get(".toast").contains('Message has been sent').should('be.visible');
    });
  });
  