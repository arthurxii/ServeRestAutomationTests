import { faker } from '@faker-js/faker';

const postProdutos = require('../produtos/requests/postProdutos')
const postLogin = require('../login/requests/postLogin')
const postUsuarios = require('../usuarios/requests/postUsuarios')

let email, password, jwt

beforeEach('Cadastrar usuário e fazer login', function () {
    const nome = faker.person.fullName()
    email = faker.internet.email()
    password = faker.internet.password()
    const administrador = 'true'

    cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
        expect(response.status).to.eq(201)
    })

    cy.api_postLogin(email, password).then((response) => {
        expect(response.status).to.eq(200)
        jwt = response.body.authorization
    })
})

describe('POST Produtos', () => {
    it('deve cadastrar produto com sucesso', () => {
        const nome = faker.commerce.productName()
        const preco = faker.number.int()
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int()

        cy.api_postProdutos(nome, preco, descricao, quantidade, jwt).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')
            expect(response.body).to.be.not.null
            expect(response.body._id).is.not.null
        })
    })
})

context('Erros', () => {
    it('não deve cadastrar com nome já cadastrado', () => {
        const nome = faker.commerce.productName()
        const preco = faker.number.int()
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int()

        cy.api_postProdutos(nome, preco, descricao, quantidade, jwt).then((response) => {
            expect(response.status).to.eq(201)

            cy.api_postProdutos(nome, preco, descricao, quantidade, jwt).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message).to.contain('Já existe produto com esse nome')
            })
        })
    })

    it('não deve cadastrar com campos obrigatórios vazios', () => {
        const nome = ''
        const preco = ''
        const descricao = ''
        const quantidade = ''

        cy.api_postProdutos(nome, preco, descricao, quantidade, jwt).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.all.keys('nome', 'preco', 'descricao', 'quantidade');
            expect(response.body).to.deep.include({
                nome: 'nome não pode ficar em branco',
                preco: 'preco deve ser um número',
                descricao: 'descricao não pode ficar em branco',
                quantidade: 'quantidade deve ser um número'
            })
        })
    })

    it('não deve cadastrar com token de acesso expirado', () => {
        const nome = faker.commerce.productName()
        const preco = faker.number.int()
        const descricao = faker.commerce.productDescription()
        const quantidade = faker.number.int()
        const jwtExpirado = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRldHp6enpAdGVzdC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE3MzgxMDI5MzgsImV4cCI6MTczODEwMzUzOH0.HgbWbMft9z8mBGQS-VuWwShYeSccsOb61H0A8X_Rk6U'

        cy.api_postProdutos(nome, preco, descricao, quantidade, jwtExpirado).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.contain('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })
})

context('Erros para usuário não administrador', () => {
    it('não deve cadastrar com usuário não administrador', () => {

    })
})