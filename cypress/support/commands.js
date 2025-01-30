
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

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="logout"]').click()
})

Cypress.Commands.add('cadastrarUsuarioMenuCadastro', (nome, email, password) => {
    cy.get('[data-testid="cadastrarUsuarios"]').click()
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="cadastrarUsuario"]').click()
})

Cypress.Commands.add('cadastrarUsuarioAdminMenuCadastro', (nome, email, password) => {
    cy.get('[data-testid="cadastrarUsuarios"]').click()
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="checkbox"]').check()
    cy.get('[data-testid="cadastrarUsuario"]').click()
})

Cypress.Commands.add('cadastrarUsuarioMenuCadastroComCamposVazios', () => {
    cy.get('[data-testid="cadastrarUsuarios"]').click()
    cy.get('[data-testid="cadastrarUsuario"]').click()
})

Cypress.Commands.add('cadastrarProduto', (nome, preco, descricao, quantidade) => {
    cy.get('[data-testid="cadastrarProdutos"]').click()
    cy.get('[data-testid="nome"]').type(nome)
    cy.get('[data-testid="preco"]').type(preco)
    cy.get('[data-testid="descricao"]').type(descricao)
    cy.get('[data-testid="quantity"]').type(quantidade)
    cy.get('[data-testid="imagem"]').selectFile('cypress/fixtures/produto.jpg')
    cy.get('[data-testid="cadastarProdutos"]').click()
})

Cypress.Commands.add('cadastrarProdutoCamposVazios', () => {
    cy.get('[data-testid="cadastrarProdutos"]').click()
    cy.get('[data-testid="cadastarProdutos"]').click()
})

Cypress.Commands.add('adicionarProdutoListaCompras', () => {
    cy.get(':nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]').click()
})

Cypress.Commands.add('adicionarProdutoDetalhesListaCompras', () => {
    cy.get('.card-link').eq(0).click()
    cy.get('[data-testid="adicionarNaLista"]').click()
})

Cypress.Commands.add('adicionarProdutoQuantidadeListaCompras', () => {
    cy.get(':nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]').click()
    cy.get('[data-testid="product-increase-quantity"]').click()
    cy.get('[data-testid="paginaInicial"]').click()
    cy.get('[data-testid="lista-de-compras"]').click()
})

Cypress.Commands.add('limparListaCompras', () => {
    cy.get('.card-link').eq(0).click()
    cy.get('[data-testid="adicionarNaLista"]').click()
    cy.get('[data-testid="limparLista"]').click()
})