/// <reference types="cypress" />

describe("Email Verification via GraphQL", () => {
  let emailVerificationToken;
  const queryBody = `
    query EmailVerificationToken($email: String!) {
      EmailVerificationToken(email: $email) {
        token
      }
    }
  `;
  const variables = {
    email: "john.doe@example.com",
  };

  before(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/graphql",
      body: JSON.stringify({
        query: queryBody,
        variables: variables,
      }),
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.body);

      // Check for valid response and extract token
      expect(response.status).to.eq(200);
      emailVerificationToken = response.body.data.EmailVerificationToken.token;
    });
  });

  it("should verify the user email", () => {
    // Visit the verification page with the token
    cy.visit(`/auth/new-verification?token=${emailVerificationToken}`);

    // Check for the success message
    cy.contains("Verification successful! Redirecting to login...", {
      timeout: 10000,
    }).should("be.visible");
  });
});
