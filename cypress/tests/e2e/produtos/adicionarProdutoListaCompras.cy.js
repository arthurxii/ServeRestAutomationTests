import { faker } from '@faker-js/faker';

import '../../../support/commands'
const postUsuarios = require('../../api/usuarios/requests/postUsuarios')

const baseUrl = Cypress.config('baseUrl')

beforeEach(() => {
    cy.visit('/')

    const nome = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const administrador = 'false'

    cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
        expect(response.status).to.eq(201)
    })

    cy.login(email, password)
})

describe('Adição de produtos na lista de compras', () => {
    it('deve adicionar um produto na lista de compras do usuário', () => {
        cy.adicionarProdutoListaCompras()

        cy.get('[data-testid="adicionar carrinho"]').should('be.visible')
        cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/minhaListaDeProdutos`)
    })

    it('deve adicionar na lista pela tela de detalhes', () => {
        cy.adicionarProdutoDetalhesListaCompras()

        cy.get('[data-testid="adicionar carrinho"]').should('be.visible')
        cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/minhaListaDeProdutos`)
    })

    it('deve adicionar produto e quantidade na lista de compras do usuário', () => {
        cy.adicionarProdutoQuantidadeListaCompras()

        cy.get('[data-testid="adicionar carrinho"]').should('be.visible')
        cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible')
        cy.get('[data-testid="shopping-cart-product-quantity"] > p').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/minhaListaDeProdutos`)
    })

    it('deve limpar lista de compras', () => {
        cy.limparListaCompras()

        cy.get('[data-testid="shopping-cart-empty-message"]').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/minhaListaDeProdutos`)
    })
})