import { faker } from '@faker-js/faker';

const postLogin = require('../login/requests/postLogin')
const postUsuarios = require('../usuarios/requests/postUsuarios')


describe('POST Login', () => {
    let email, password

    before('Cadastrar usuario', function () {
        const nome = faker.person.fullName()
        email = faker.internet.email()
        password = faker.internet.password()
        const administrador = 'true'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
    it('deve realizar login com sucesso', () => {
        cy.api_postLogin(email, password).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Login realizado com sucesso')
            expect(response.body.authorization).to.be.not.null
        })
    })
})

context('Erros', () => {
    it('não deve realizar login com email inválido', () => {
        const email = 'teste@teste'
        const password = faker.internet.password()

        cy.api_postLogin(email, password).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('email', 'email deve ser um email válido')
        })
    })

    it('não deve realizar login com usuario inexistente', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.api_postLogin(email, password).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Email e/ou senha inválidos')
        })
    })
})