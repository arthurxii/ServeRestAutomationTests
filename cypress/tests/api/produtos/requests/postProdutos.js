const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_postProdutos', (nome, preco, descricao, quantidade, jwt) => {
    cy.request({
        method: 'POST',
        url: `${API_URL}/produtos`,
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