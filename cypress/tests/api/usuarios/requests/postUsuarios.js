const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_postUsuarios', (nome, email, password, administrador) => {
    cy.request({
        method: 'POST',
        url: `${API_URL}/usuarios`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
        }, failOnStatusCode: false
    })
})