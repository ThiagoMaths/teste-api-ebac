import contratos from '../contracts/usuarios.contract'
import {faker} from "@faker-js/faker/locale/pt_BR";

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then((response) => {
            return contratos.validateAsync(response.body)
        })
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios'
        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('usuarios')
        })
    });

    it('Deve cadastrar um usuário com sucesso', () => {

        var nome = faker.name.firstName()
        var email = faker.internet.email()
        var password = faker.internet.password()
        var administrador = faker.datatype.boolean({probability: 0.5}).toString()

        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": nome,
                "email": email,
                "password": password,
                "administrador": administrador
            }
        }).should((response) => {
            expect(response.status).equal(201)
            expect(response.body).to.have.property('_id')

        })
    });

    it('Deve validar um usuário com email inválido', () => {
        cy.request({
            method: 'POST',
            url: 'usuarios',
            failOnStatusCode: false,
            body: {
                "nome": "Joao",
                "email": "joaojorge.com",
                "password": "Qa123",
                "administrador": "false"
            }
        }).should((response) => {
            expect(response.status).equal(400)
        })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        cy.request('usuarios').then((response) => {
            let id = response.body.usuarios[4]._id;
            let nome = response.body.usuarios[4].nome;
            var email = faker.internet.email()
            var password = faker.internet.password()
            var administrador = faker.datatype.boolean({probability: 0.5}).toString()

            cy.request({
                method: 'PUT',
                url: `usuarios/${id}`,
                body: {
                    "nome": nome,
                    "email": email,
                    "password": password,
                    "administrador": administrador
                }
            }).then(response => {
                expect(response.status).equal(200)
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        cy.request('usuarios').then((response) => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
            }).then(response => {
                expect(response.status).to.equal(200)
            })
        })
    });

});