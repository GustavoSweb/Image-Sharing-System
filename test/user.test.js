import supertest from "supertest";
import app from "../src/app";
const request = supertest(app);

const minUser = {name: 'Gustav', }


describe("Cadastro de usuário", () => {
  test("Deve cadastrar o usuario com sucesso", (done) => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    var user = { name: "Gustavo", email, password: "teste123" };
    request
      .post("/user")
      .send(user)
      .then((response) => {
        let status = response.statusCode;
        expect(status).toEqual(200);
        expect(response.body.message).toEqual("User Created");
        done();
      })
      .catch(done);
  });
  test("Deve impedir o cadastro de campos vazios", (done) => {
    var user = { name: "", email: "", password: "" };
    request
      .post("/user")
      .send(user)
      .then((response) => {
        let status = response.statusCode;
        expect(status).toEqual(400);
        done();
      })
      .catch(done);
  });
  test("Deve impedir o cadastro de emails repetidos", (done) => {
    let time = Date.now();
    let email = `${time}@gmail.com`;
    var user = { name: "Gustavo", email, password: "teste123" };

    request
      .post("/user")
      .send(user)
      .then((response) => {
        let status = response.statusCode;
        expect(status).toEqual(200);
        expect(response.body.message).toEqual("User Created");
         request
          .post("/user")
          .send(user)
          .then((response) => {
        let status = response.statusCode;
            expect(status).toEqual(400);
            expect(response.body.err).toEqual("Email já cadastrado");
            done();
          })
          .catch(done);
      })
      .catch(done);
  });
});
