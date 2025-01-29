const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_deleteProdutos', (_id, jwt) => {
    cy.request({
        method: 'DELETE',
        url: `${API_URL}/produtos/` + _id,
        headers: {
            Accept: 'application/json',
            authorization: jwt
        }, failOnStatusCode: false
    })
})