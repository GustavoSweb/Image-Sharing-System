import User from "../services/User.js";
import Validation from "../utils/Validation.js";
import Error from "../utils/Error.js";
const { NotValid, NotExistValue } = Error;
import { hash } from "bcrypt";
class UserController {
  async Create(req, res) {
    try {
      const { name, email, password } = req.body;

      new Validation({ name, email, password }).Check();
      const userData = await User.FindOne({ email });
      if (userData) throw new NotValid("Email já cadastrado");

      const passwordHash = await hash(password, 10);

      const {date, _id} = await User.Create({ name, email, password: passwordHash });
      if(!date || !_id) throw new Error('Houve uma falha na criação')
      res.json({ message: "User Created", user:{name, email, date, _id}});
    } catch (err) {
      if (err?.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
  async Delete(req, res){
    try {
        const {id} = req.params;
  
        const Changes = await User.Remove(id);
        if (!Changes) throw new NotExistValue('Usuario a ser deletado não existe')
  
        res.json({ message: "User Delete" });
      } catch (err) {
        if (err?.status) return res.status(err.status).json({ err: err.message });
        res.sendStatus(500);
      }
  }
}
export default new UserController();
