describe("Error handling", () => {
  it("renders an error message if the get request fails", () => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 404,
    })
      .visit("http://localhost:3000/")
      .get("h3")
      .contains("Error getting data, please try again later");
  });

  it("should prevent a user from submitting a form that is incomplete", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 422,
    })
      .visit("http://localhost:3000/")
      .get(".titleInput")
      .type("World cup photo");
    cy.get("button").click();
    cy.contains("Please make sure all input fields are filled out before submitting")
  });
});
