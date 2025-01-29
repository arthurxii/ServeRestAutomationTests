const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_deleteUsuarios', (_id) => {
    cy.request({
        method: 'DELETE',
        url: `${API_URL}/usuarios/` + _id,
        headers: {
            Accept: 'application/json'
        }, failOnStatusCode: false
    })
})