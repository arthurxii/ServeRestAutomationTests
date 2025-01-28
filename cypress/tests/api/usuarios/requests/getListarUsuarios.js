const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_getListarUsuarios', () => {
    cy.request({
        method: 'GET',
        url: `${API_URL}/usuarios`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})

Cypress.Commands.add('api_getListarUsuariosParams', (tipo, dado) => {
    cy.request({
        method: 'GET',
        url: `${API_URL}/usuarios?` + tipo + '=' + dado,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})