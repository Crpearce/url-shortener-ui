describe("Shortened Urls home page user flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      response: 200,
      fixture: "getUrl.json",
    })
      .as("initialIntercept")
      .visit("http://localhost:3000/");
  });

  it("Should display the main title of the page on load", () => {
    cy.get("h1").should("exist");
    cy.contains("h1", "URL Shortener");
  });

  it("Should display the urls contained in the server on page load", () => {
    cy.get("#url1").should("exist");
    cy.get("#url1").contains("Awesome photo test");
    cy.get("#url1").contains("http://localhost:3001/useshorturl/1");
    cy.get("#url1").contains(
      "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
    );
    cy.get("#url2").should("exist");
    cy.get("#url2").contains("Hockey Url test");
    cy.get("#url2").contains("http://localhost:3001/useshorturl/2");
    cy.get("#url2").contains("https://www.nhl.com/standings/2022/division");
  });

  it("Should display the form for a user to enter their own data", () => {
    cy.get("form")
      .should("exist")
      .get(".titleInput")
      .should("exist")
      .get(".urlInput")
      .should("exist");
  });

  it("Should update the form view when a user adds information to correct the input fields", () => {
    cy.get(".titleInput")
      .type("World cup photo")
      .get(".urlInput")
      .type("https://www.espn.com/soccer/league/_/name/fifa.world");
  });
});

describe("Post form data", () => {
  it("Should allow a user to add inputs to a form, and then render shorted URL to DOM with sucessful Post call", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      response: 200,
      fixture: "postUrl.json",
    })
      .as("postData")
      .get("button")
      .click()
      .wait("@postData")
      .then(({ response }) => {
        expect(response.statusCode).to.eq(200);
      })
      .get("#url3")
      .should("exist");
    cy.get("#url3").contains("World Cup photo");
    cy.get("#url3").contains("http://localhost:3001/useshorturl/3");
    cy.get("#url3").contains(
      "https://www.espn.com/soccer/league/_/name/fifa.world"
    );
  });
});