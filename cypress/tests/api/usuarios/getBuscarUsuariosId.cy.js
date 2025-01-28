
const getBuscarUsuarioId = require('../usuarios/requests/getBuscarUsuarioId')

describe('GET Usuarios por ID', () => {
    it('deve buscar usuário pelo ID', () => {
        const id = '0bNQgMYhHZjCbO7y'

        cy.api_getBuscarUsuarioId(id).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
            expect(response.body).to.have.property('_id', id)
        })
    })
})

context('Erros', () => {
    it('não deve buscar usuário com id inexistente', () => {
        const id = '0uxuPY2cbmQhpEz1'

        cy.api_getBuscarUsuarioId(id).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message', 'Usuário não encontrado')
        })
    })

    it('não deve buscar usuário com id nulo', () => {
        const id = null
        
        cy.api_getBuscarUsuarioId(id).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message', 'Usuário não encontrado')
        })
    })
})