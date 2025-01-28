const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_getBuscarUsuarioId', (id) => {
    cy.request({
        method: 'GET',
        url: `${API_URL}/usuarios/` + id,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})