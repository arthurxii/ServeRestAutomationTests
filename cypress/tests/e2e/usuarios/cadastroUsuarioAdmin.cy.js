import { faker } from '@faker-js/faker';

import '../../../support/commands'
const postUsuarios = require('../../api/usuarios/requests/postUsuarios')

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

    cy.login(email, password)
})

describe('Cadastro de Usuários', () => {
    it('deve cadastrar usuário com sucesso pelo menu Cadastrar Usuários', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.cadastrarUsuarioMenuCadastro(nome, email, password)
        cy.url().should('be.equal', `${baseUrl}/admin/listarusuarios`)
        cy.get('table tbody').contains('td', nome).should('be.visible')
        cy.get('table tbody').contains('td', email).should('be.visible')
        cy.get('table tbody').contains('td', password).should('be.visible')
    })

    it('deve cadastrar usuário administrador com sucesso pelo menu Cadastrar Usuários', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.cadastrarUsuarioAdminMenuCadastro(nome, email, password)
        cy.url().should('be.equal', `${baseUrl}/admin/listarusuarios`)
        cy.get('table tbody').contains('td', nome).should('be.visible')
        cy.get('table tbody').contains('td', email).should('be.visible')
        cy.get('table tbody').contains('td', password).should('be.visible')
    })
})

context('Erros', () => {
    it('não deve cadastrar usuário com e-mail inválido', () => {
        const nome = faker.person.fullName()
        const email = 'teste@teste'
        const password = faker.internet.password()

        cy.cadastrarUsuarioMenuCadastro(nome, email, password)
        cy.contains('.alert', 'Email deve ser um email válido').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/admin/cadastrarusuarios`)
    })

    it('não deve cadastrar usuário com email já cadastrado', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = 'true'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.cadastrarUsuarioMenuCadastro(nome, email, password)
        cy.contains('.alert', 'Este email já está sendo usado').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/admin/cadastrarusuarios`)
    })

    it('não deve cadastrar com campos obrigatórios vazios', () => {
        cy.cadastrarUsuarioMenuCadastroComCamposVazios()

        cy.contains('.jumbotron form', 'Nome é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Email é obrigatório').should('be.visible')
        cy.contains('.jumbotron form', 'Password é obrigatório').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/admin/cadastrarusuarios`)
    })
})