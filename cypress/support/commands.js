
Cypress.Commands.add('cadastrarUsuario', (nome, email, password) => {
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('cadastrarUsuarioAdministrador', (nome, email, password) => {
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('cadastrarUsuarioComCamposVazios', () => {
    cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="senha"]').type(password)
    cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('loginComCamposVazios', () => {
    cy.get('[data-testid="entrar"]').click()
})