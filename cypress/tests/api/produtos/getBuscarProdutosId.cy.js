import { faker } from '@faker-js/faker';

const getBuscarProdutoId = require('../produtos/requests/getBuscarProdutoId')
const postProdutos = require('../produtos/requests/postProdutos')
const postUsuarios = require('../usuarios/requests/postUsuarios')
const postLogin = require('../login/requests/postLogin')

describe('GET Produtos por ID', () => {
    let jwt, _id
    beforeEach('Cadastrar usuário, fazer login e cadastrar produto', function () {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
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
    it('deve buscar produto pelo id', () => {
        cy.api_getBuscarProdutoId(_id).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
            expect(response.body).to.have.property('_id', _id)
        })
    })
})

context('Erros', () => {
    it('não deve buscar produto com id inexistente', () => {
        const id = '2m931byp8d8LbkWj'

        cy.api_getBuscarProdutoId(id).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message', 'Produto não encontrado')
        })
    })

    it('não deve buscar produto com id nulo', () => {
        const id = null

        cy.api_getBuscarProdutoId(id).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message', 'Produto não encontrado')
        })
    })
})

