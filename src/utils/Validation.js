import Error from "./Error.js"
const {NotValid} = Error
const names = {
  name: "Nome",
  email: "Email",
  password: "Senha",
};

class Validation {
  constructor(data, optional) {
    this.data = data;
    this.optional = optional;
    this.inputs = {
      email: this.EmailFormat.bind(this),
    };
  }

  EmailFormat() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(this.data.email))
      throw new NotValid(`Formato de email inválido`)
  }
  Check() {
    var msg;
    Object.keys(this.data).forEach((input) => {
      const option = this.optional
        ? this.optional.find((a) => a == input)
        : null;
      if (
        this.data[input] == undefined ||
        this.data[input] == "" ||
        (this.data[input] == " " && option == null)
      ) {
        msg = names[input]
          ? `Não foi passado o ${names[input]}`
          : `Passe todos os parametros !`;
        throw new NotValid(msg)
      } else if (this.inputs[input] != undefined && option == null)
        this.inputs[input]();
    });
  }
}

export default Validation;