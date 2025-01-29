import { faker } from '@faker-js/faker';

import '../../../support/commands'
const postUsuarios = require('../../api/usuarios/requests/postUsuarios')


const baseUrl = Cypress.config('baseUrl')

beforeEach(() => {
    cy.visit('/')

})

describe('Login', () => {
    it('deve realizar login com sucesso', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.login(email, password)

        cy.url().should('be.equal', `${baseUrl}/home`)
        cy.get('[data-testid="logout"]').should('be.visible')
    })

    it('deve realizar login com usuário admininistrador com sucesso', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = 'true'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.login(email, password)

        cy.url().should('be.equal', `${baseUrl}/admin/home`)
        cy.get('[data-testid="logout"]').should('be.visible')
        cy.contains('.lead', 'Este é seu sistema para administrar seu ecommerce.').should('be.visible')
    })
})

context('Erros', () => {
    it('não deve realizar login com usuário inexistente', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.login(email, password)
        cy.contains('.alert', 'Email e/ou senha inválidos').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/login`)

    })

    it('não deve realizar login com email inválido', () => {
        const email = 'teste@teste'
        const password = faker.internet.password()

        cy.login(email, password)
        cy.contains('.alert', 'Email deve ser um email válido').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/login`)
    })

    it('não deve realizar login com campos obrigatórios vazios', () => {
        cy.loginComCamposVazios()

        cy.contains('.form', 'Email é obrigatório').should('be.visible')
        cy.contains('.form', 'Password é obrigatório').should('be.visible')
        cy.url().should('be.equal', `${baseUrl}/login`)
    })
})