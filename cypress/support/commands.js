// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add("postAUser", (firstName, surName) => {
  cy.request({
    method: "POST",
    url: "/",
    body: {
      id: 0,
      firstName: firstName,
      surName: surName,
    },
  });
});

Cypress.Commands.add(
  "expectedUserCreationResponse",
  (response, firstName, surName) => {
    cy.log(JSON.stringify(response.body));

    expect(response.status).to.eq(200);
    expect(response.body.firstName).to.eq(firstName);
    expect(response.body.surName).to.eq(surName);
  },
);

Cypress.Commands.add("putUpdate", (response, updatedName, surName) => {
  const userId = response.body.id;

  cy.log(`The user was created with id: ${userId}`);

  cy.request({
    method: "PUT",

    url: `/${userId}?firstName=${updatedName}&surName=${surName}`,
    body: {
      id: userId,
      firstName: updatedName,
      surName: surName,
    },
  });
});

Cypress.Commands.add(
  "expectedUserUpdateResponse",
  (updateResponse, updatedName, surName) => {
    expect(updateResponse.status).to.eq(200);
    expect(updateResponse.body.firstName).to.eq(updatedName);
    expect(updateResponse.body.surName).to.eq(surName);
  },
);

Cypress.Commands.add("deletAUser", (userId, firstName, surName) => {
  cy.log(`The user was created with id: ${userId}`);

  cy.request({
    method: "DELETE",

    url: `/${userId}?firstName=${firstName}&surName=${surName}`,
  });
});

Cypress.Commands.add("expectedUserDeleteResponse", (deleteResponse) => {
  expect(deleteResponse.status).to.eq(200);
  cy.log(JSON.stringify(deleteResponse.body));
});

Cypress.Commands.add("getAUser", (userId, firstName, surName) => {
  cy.request({
    method: "GET",
    url: `/${userId}?firstName=${firstName}&surName=${surName}`,
    failOnStatusCode: false,
  }).then((getResponse) => {
    expect(getResponse.status).to.eq(400);
  });
});