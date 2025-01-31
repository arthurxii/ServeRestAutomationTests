import { faker } from '@faker-js/faker';

const putUsuarios = require('../usuarios/requests/putUsuarios')
const postUsuarios = require('../usuarios/requests/postUsuarios')


describe('PUT Usuarios', () => {
    let _id

    before('Cadastrar usuário', function () {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
            _id = response.body._id
        })
    })
    it('deve editar usuario com sucesso', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_putUsuarios(_id, nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.contain('Registro alterado com sucesso')
        })
    })

    it('deve cadastrar quando o id não existir', () => {
        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'
        const novoId = faker.number.int()

        cy.api_putUsuarios(novoId, nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.contain('Cadastro realizado com sucesso')
            expect(response.body._id).is.not.null
        })
    })
})

context('Erros', () => {
    it('não deve editar com email inválido', () => {
        const nome = faker.person.fullName()
        const email = 'teste@teste'
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'
        const _id = faker.number.int()

        cy.api_putUsuarios(_id, nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('email', 'email deve ser um email válido')
        })
    })

    it('não deve editar com email existente', () => {
        let _id

        const nome = faker.person.fullName()
        const email = faker.internet.email()
        const password = faker.internet.password()
        const administrador = Math.random() < 0.5 ? 'true' : 'false'

        cy.api_postUsuarios(nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(201)
            _id = response.body._id
        })

        cy.api_putUsuarios(_id, nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.contain('Este email já está sendo usado')
        })
    })
    it('não deve editar com campos obrigatórios vazios', () => {
        const nome = ''
        const email = ''
        const password = ''
        const administrador = ''
        const _id = faker.number.int()

        cy.api_putUsuarios(_id, nome, email, password, administrador).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.all.keys('nome', 'email', 'password', 'administrador');
            expect(response.body).to.deep.include({
                nome: 'nome não pode ficar em branco',
                email: 'email não pode ficar em branco',
                password: 'password não pode ficar em branco',
                administrador: "administrador deve ser 'true' ou 'false'"
            })
        })
    })
})


