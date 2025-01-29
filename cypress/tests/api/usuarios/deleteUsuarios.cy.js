import { faker } from '@faker-js/faker';

const deleteUsuarios = require('../usuarios/requests/deleteUsuarios')
const postUsuarios = require('../usuarios/requests/postUsuarios')
const postProdutos = require('../produtos/requests/postProdutos')
const postLogin = require('../login/requests/postLogin')

let _id

beforeEach('Cadastrar usuário', function () {
    const nome = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const administrador = Math.random() < 0.5 ? 'true' : 'false'

    cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
        expect(response.status).to.eq(201)
        _id = response.body._id
    })
})

describe('DELETE Usuarios', () => {
    it('deve excluir usuario com sucesso', () => {
        cy.api_deleteUsuarios(_id).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Registro excluído com sucesso')
        })
    })

})

context('Erros', () => {
    it('não deve excluir com id inexistente', () => {
        const idInexistente = faker.number.int()

        cy.api_deleteUsuarios(idInexistente).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Nenhum registro excluído')
        })
    })
})


