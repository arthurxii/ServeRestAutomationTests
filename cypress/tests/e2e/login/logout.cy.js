import { faker } from '@faker-js/faker';

import '../../../support/commands'
const postUsuarios = require('../../api/usuarios/requests/postUsuarios')


const baseUrl = Cypress.config('baseUrl')

beforeEach(() => {
    cy.visit('/')

})

describe('Logout', () => {
    it('deve realizar logout com sucesso', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
        })

        cy.login(email, password)

        cy.logout()
        cy.url().should('be.equal', `${baseUrl}/login`)
    })
})