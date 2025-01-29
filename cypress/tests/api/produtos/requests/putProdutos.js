const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_putProdutos', (_id, nome, preco, descricao, quantidade, jwt) => {
    cy.request({
        method: 'PUT',
        url: `${API_URL}/produtos/` + _id,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: jwt
        },
        body: {
            "nome": nome,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        }, failOnStatusCode: false
    })
})