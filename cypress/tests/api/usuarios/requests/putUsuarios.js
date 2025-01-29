const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_putUsuarios', (_id, nome, email, password, administrador) => {
    cy.request({
        method: 'PUT',
        url: `${API_URL}/usuarios/` + _id,
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