import supertest from "supertest"
import app from "../src/app"
const request = supertest(app)

describe("Cadastro de usuário", ()=>{
    test("Deve cadastrar o usuario com sucesso", (done)=>{
        let time = Date.now()
        let email = `${time}@gmail.com`
        var user = {name:'Gustavo', email, password:'teste123'}
        request.post('/user')
        .send(user)
        .then(response =>{
            let status = response.statusCode
            expect(status).toEqual(200)
            expect(response.body.message).toEqual("User Created")
            done()
        }).catch(done)
    })
})
