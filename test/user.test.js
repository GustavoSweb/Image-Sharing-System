import supertest from "supertest";
import app from "../src/app";
import User from "../src/services/User";

const request = supertest(app);

const USER_TEST = {
  name: process.env.NAME_USER_TEST,
  email: process.env.EMAIL_USER_TEST,
  password: process.env.PASSWORD_USER_TEST,
};

beforeEach(async () => {
  await request.post("/user").send(USER_TEST);
});

afterEach(async () => {
  try {
    const user = await User.FindOne({ email: USER_TEST.email });
    if (user) {
      await request.delete(`/user/${user._id}`);
    }
  } catch (err) {
    throw err;
  }
});

describe("Cadastro de usuário", () => {
  test("Deve cadastrar o usuário com sucesso", async () => {
    const time = Date.now();
    const email = `${time}@gmail.com`;
    const user = { name: "Gustavo", email, password: "teste123" };
    try {
      const response = await request.post("/user").send(user);
      expect(response.status).toEqual(200);
      expect(response.body.message).toEqual("User Created");
      expect(response.body.user).toBeDefined();
      await request.delete(`/user/${response.body.user._id}`);
    } catch (err) {
      throw err;
    }
  });

  test("Deve impedir o cadastro de campos vazios", async () => {
    const user = { name: "", email: "", password: "" };
    try {
      const response = await request.post("/user").send(user);
      expect(response.status).toEqual(400);
    } catch (err) {
      throw err;
    }
  });

  test("Deve impedir o cadastro de emails repetidos", async () => {
    try{
      const response = await request.post("/user").send(USER_TEST);
      
      expect(response.status).toEqual(400);
      expect(response.body.err).toEqual("Email já cadastrado");
    }catch(err){throw err}
  });
});

describe("Authenticação", () => {
  test("Deve me retornar o token quando logar", async () => {
    try {
      let response = await request
        .post("/auth")
        .send({ password: USER_TEST.password, email: USER_TEST.email });
      expect(response.statusCode).toEqual(200);
      expect(response.body.token).toBeDefined();
    } catch (err) {
      throw err;
    }
  });
  test("Deve me retornar 404 por não existe o usuario", async () => {
    try {
      let response = await request
        .post("/auth")
        .send({ password: 'teste', email: `${Date.now()}dfas845@gmail.com` });
      expect(response.statusCode).toEqual(404);
      expect(response.body.err).toEqual('Usuario não existe')
    } catch (err) {
      throw err;
    }
  });
  test("Deve impedir o login de senhas que não concidem", async () => {
    try {
      let response = await request
        .post("/auth")
        .send({ password: 'teste', email: USER_TEST.email });
      expect(response.statusCode).toEqual(400);
      expect(response.body.err).toEqual('Credenciais invalidas')
    } catch (err) {
      throw err;
    }
  });
});
