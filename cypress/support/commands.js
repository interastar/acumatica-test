// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (user, pw) => {
  let username;
  let password;

  cy.fixture('credentials') // <-- fixture in a separate file, credentials.js
    .then((defaultUser) => {
      username = user || defaultUser.username;
      password = pw || defaultUser.password;

      cy.get('#txtUser').type(username);
      cy.get('#txtPass').type(password);

      cy.get('input[value="Sign In"]').click();
    });
});