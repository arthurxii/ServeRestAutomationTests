const API_URL = Cypress.env('API_BASE_URL')

Cypress.Commands.add('api_getListarProdutos', () => {
    cy.request({
        method: 'GET',
        url: `${API_URL}/produtos`,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
    })
})

Cypress.Commands.add('api_getListarProdutosParams', (tipo, dado) => {
   cy.request({
    method: 'GET',
    url: `${API_URL}/produtos?` + tipo + '=' + dado,
    headers: {
        Accept: 'application/json',
            'Content-Type': 'application/json'
        }, failOnStatusCode: false
   }) 
})