describe("Тестирование API контроллера пользователей", () => {
  it("Должен создаваться пользователь", () => {
    const firstName = "Nikitos";
    const surName = "Woker";

    cy.postAUser(firstName, surName).then((response) => {
      cy.expectedUserCreationResponse(response, firstName, surName);
    });
  });

  it("Должен обновляться пользователь", () => {
    const firstName = "Nikitos";
    const surName = "Woker";
    const updatedName = "Bob";

    cy.postAUser(firstName, surName).then((response) => {
      cy.expectedUserCreationResponse(response, firstName, surName);

      cy.putUpdate(response, updatedName, surName).then((updateResponse) => {
        cy.expectedUserUpdateResponse(updateResponse, updatedName, surName);
      });
    });
  });

  it("Должен удаляться пользователь", () => {
    const firstName = "Nikitos";
    const surName = "Woker";

    cy.postAUser(firstName, surName).then((response) => {
      cy.expectedUserCreationResponse(response, firstName, surName);

      const userId = response.body.id;

      cy.deletAUser(userId, firstName, surName).then((deleteResponse) => {
        cy.expectedUserDeleteResponse(deleteResponse);
      });

      cy.getAUser(userId, firstName, surName);
    });
  });
});
