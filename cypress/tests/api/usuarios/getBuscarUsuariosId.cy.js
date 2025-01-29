import { faker } from '@faker-js/faker';

const getBuscarUsuarioId = require('../usuarios/requests/getBuscarUsuarioId')
const postUsuarios = require('../usuarios/requests/postUsuarios')

describe('GET Usuarios por ID', () => {
    let _id

    beforeEach('Cadastrar usuário', function (){
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
            _id = response.body._id
        })
    })
    it('deve buscar usuário pelo ID', () => {
        cy.api_getBuscarUsuarioId(_id).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
            expect(response.body).to.have.property('_id', _id)
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