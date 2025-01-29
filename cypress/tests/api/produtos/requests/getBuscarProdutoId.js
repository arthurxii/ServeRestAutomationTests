const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_getBuscarProdutoId', (id) => {
    cy.request({
        method: 'GET',
        url: `${API_URL}/produtos/` + id,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})