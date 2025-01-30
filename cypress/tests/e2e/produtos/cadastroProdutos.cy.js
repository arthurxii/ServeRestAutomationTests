import { faker } from '@faker-js/faker';

import '../../../support/commands'

const postUsuarios = require('../../api/usuarios/requests/postUsuarios')
const postProdutos = require('../../api/produtos/requests/postProdutos')

const baseUrl = Cypress.config('baseUrl')

beforeEach(() => {
    cy.visit('/')

    const nome = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const administrador = 'true'

    cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
        expect(response.status).to.eq(201)
    })

    cy.intercept('POST', '/login').as('loginRequest')

    cy.login(email, password)

    cy.wait('@loginRequest').then((retorno) => {
        const jwt = retorno.response.body.authorization
        Cypress.env('jwt', jwt)
    })
})

describe('Cadastro de Usuários', () => {
    it('deve cadastrar produto com sucesso', () => {
        const nome = faker.commerce.productName()
        const preco = faker.number.int()
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int()

        cy.cadastrarProduto(nome, preco, descricao, quantidade)

        cy.url().should('be.equal', `${baseUrl}/admin/listarprodutos`)
        cy.get('table tbody').contains('td', nome).should('be.visible')
        cy.get('table tbody').contains('td', preco).should('be.visible')
        cy.get('table tbody').contains('td', descricao).should('be.visible')
        cy.get('table tbody').contains('td', quantidade).should('be.visible')
    })
})

context('Erros', () => {
    it('não deve cadastrar produtos com campos obrigatórios vazios', () => {
        cy.cadastrarProdutoCamposVazios()

        cy.contains('.jumbotron form', 'Nome é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Preco é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Descricao é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Quantidade é obrigatório').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/admin/cadastrarprodutos`)
    })
    it('não deve cadastrar produto com nome já existente', () => {
        const nome = faker.commerce.productName()
        const preco = faker.number.int()
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int()
        const jwt = Cypress.env('jwt')

        cy.api_postProdutos(nome, preco, descricao, quantidade, jwt).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.cadastrarProduto(nome, preco, descricao, quantidade)
    })

})