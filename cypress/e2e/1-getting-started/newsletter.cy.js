describe("Newsletter Subscription", () => {
  it("should subscribe a user to the newsletter", () => {
    cy.visit("/"); // Assuming the Home component is rendered at the root path

    // Scroll to the Newsletter section if needed
    cy.get('input[type="email"]').scrollIntoView();

    // Enter email and submit the form
    cy.get('input[type="email"]').type("john.doe@example.com");
    cy.get('button[type="submit"]').click();

    // Check for success message
    cy.contains("Subscription successful!").should("be.visible");
  });
});
