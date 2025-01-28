
const getListarUsuarios = require('../usuarios/requests/getListarUsuarios')

describe('GET Usuarios', () => {
    it('deve listar usuarios com sucesso', () => {
        cy.api_getListarUsuarios().then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
            expect(response.body.usuarios.length).to.be.greaterThan(0)
        })
    })
})

context('Erros', () => {
    it('não deve listar usuário com email inválido', () => {
        const email = 'test@email'

        cy.api_getListarUsuariosParams('email', email).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('email', 'email deve ser um email válido')
        })
    })

    it('não deve listar usuário com id inexistente', () => {
        const id = '1LyAt2nP4ckByHtT'

        cy.api_getListarUsuariosParams('_id', id).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.quantidade).to.eq(0)
        })

    })
})

