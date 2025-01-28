import { faker } from '@faker-js/faker'

const postUsuarios = require('../usuarios/requests/postUsuarios')

describe('POST Usuarios', () => {
    it('deve cadastrar usuario com sucesso', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.not.null
            expect(response.body._id).is.not.null
        })

    })

    it('deve cadastrar usuario admin com sucesso', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = 'true'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.not.null
            expect(response.body._id).is.not.null
        })
    })
})

context('Erros', () => {
    it('não deve cadastrar com email já cadastrado', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)

            cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.contain('Este email já está sendo usado')
            })
        })
    })

    it('não deve cadastrar com email inválido', () => {
        const nome = faker.person.fullName()
        const email = 'teste@teste'
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('email', 'email deve ser um email válido')
        })
    })

    it('não deve cadastrar com campos obrigatórios vazios', () => {
        const nome = ''
        const email = ''
        const password = ''
        const administrador = ''

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.all.keys('nome', 'email', 'password', 'administrador');
            expect(response.body).to.deep.include({
                nome: 'nome não pode ficar em branco',
                email: 'email não pode ficar em branco',
                password: 'password não pode ficar em branco',
                administrador: "administrador deve ser 'true' ou 'false'"
            })
        })
    })
})
