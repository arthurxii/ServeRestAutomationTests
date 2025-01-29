
const getListarProdutos = require('../produtos/requests/getListarProdutos')

describe('GET Produtos', () => {
    it('deve listar produtos com sucesso', () => {
        cy.api_getListarProdutos().then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
            expect(response.body.produtos.length).to.be.greaterThan(0)
        })
    })
})

context('Erros', () => {
    it('não deve listar produtos com preço inválido', () => {
        const preco = 'teste'

        cy.api_getListarProdutosParams('preco', preco).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('preco', 'preco deve ser um número')
        })
    })

    it('não deve listar produtos com quantidade inválida', () => {
        const quantidade = 'teste'

        cy.api_getListarProdutosParams('quantidade', quantidade).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('quantidade', 'quantidade deve ser um número')
        })
    })

    it('não deve listar produtos com id inexistente', () => {
        const id = '0Yl5F13ToBclD2Sz'

        cy.api_getListarProdutosParams('_id', id).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.eq(0)
        })
    })
})