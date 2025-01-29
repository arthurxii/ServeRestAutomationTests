import { faker } from '@faker-js/faker';

const deleteProdutos = require('../produtos/requests/deleteProdutos')
const postUsuarios = require('../usuarios/requests/postUsuarios')
const postProdutos = require('../produtos/requests/postProdutos')
const postLogin = require('../login/requests/postLogin')

let email, password, jwt, _id

beforeEach('Cadastrar usuário, fazer login e cadastrar produto', function () {
    const nome = faker.person.fullName()
    email = faker.internet.email()
    password = faker.internet.password()
    const administrador = 'true'

    cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
        expect(response.status).to.eq(201)

        return cy.api_postLogin(email, password)
    }).then((response) => {
        expect(response.status).to.eq(200)
        jwt = response.body.authorization

        const nomeProduto = faker.commerce.productName()
        const preco = faker.number.int()
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int()

        return cy.api_postProdutos(nomeProduto, preco, descricao, quantidade, jwt)
    }).then((response) => {
        expect(response.status).to.eq(201)
        _id = response.body._id
    })
})

describe('DELETE Produtos', () => {
    it('deve excluir produto com sucesso', () => {
        cy.api_deleteProdutos(_id, jwt).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Registro excluído com sucesso')
        })
    })
})

context('Erros', () => {
    it('não deve excluir com id inexistente', () => {
        const idInexistente = faker.number.int()

        cy.api_deleteProdutos(idInexistente, jwt).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Nenhum registro excluído')
        })
    })

    it('não deve excluir com token expirando', () => {
        const jwtExpirado = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRldHp6enpAdGVzdC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE3MzgxMDI5MzgsImV4cCI6MTczODEwMzUzOH0.HgbWbMft9z8mBGQS-VuWwShYeSccsOb61H0A8X_Rk6U'

        cy.api_deleteProdutos(_id, jwtExpirado).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body.message).to.contain('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })
})
