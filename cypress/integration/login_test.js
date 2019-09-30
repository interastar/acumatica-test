/// <reference types="Cypress" />

function loadFixture() {
  cy.fixture('login').as('credentials')
}

Cypress.Commands.add("login", (user, pw) => {
  let username;
  let password;

  cy.fixture('login') // <-- fixture in a separate file, default-user.js
    .then((defaultUser) => {
      username = user || defaultUser.username;
      password = pw || defaultUser.password;

      cy.get('#txtUser').type(username);
      cy.get('#txtPass').type(password);

      cy.get('input[value="Sign In"]').click();
    });
});

describe('Login test', function() {
  beforeEach(function () {
    loadFixture()
  })

  before(function () {
    // cy.task('resetDb', this.credentials.connectionString)
    cy.visit('/')
  })

  it('should open test site and validate version', function () {
    cy.contains('Acumatica 2018 R2')
    cy.contains('Build 18.215.0021')
  })

  it('should login', function() {
    cy.get('#txtUser').type(this.credentials.username)
    cy.get('#txtPass').type(this.credentials.password)
    cy.get('input[value="Sign In"]').click()
    cy.get('#linkLogo > img').should('exist')
  })
})

describe('Navigation', function() {
  before(function () {

    cy.fixture('login').then((credentials)  => {
      const {username, password} = credentials

      // cy.task('resetDb', this.credentials.connectionString)
      cy.visit('/')
      cy.url().should('match', /Login.aspx/)

      // programmatically log us in without needing the UI
      // cy.request('POST', '/Frames/Login.aspx', {
      //   'ctl00$phUser$txtUser':username,
      //   'ctl00$phUser$txtPass':password
      // })

      cy.get('#txtUser').type('mvillasenor')
      cy.get('#txtPass').type('Int3r4st4r.')
      cy.get('input[value="Sign In"]').click()

    })
  })

  it('should be able to query customers', function() {
    cy.visit('/Main?ScreenId=AR3030PL')
    cy.get('a:contains(Clientes)').should('exist')
  })
})