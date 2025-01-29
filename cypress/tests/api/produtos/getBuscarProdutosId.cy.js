
const getBuscarProdutoId = require('../produtos/requests/getBuscarProdutoId')

describe('GET Produtos por ID', () => {
    it('deve buscar produto pelo id', () => {
        const id = '2KDSHTlVwqDIpmfi'

        cy.api_getBuscarProdutoId(id).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
            expect(response.body).to.have.property('_id', id)
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

