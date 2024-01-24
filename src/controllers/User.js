import User from "../services/User.js";
import Validation from "../utils/Validation.js";
import Error from "../utils/Error.js";
const { NotValid } = Error;
import { hash } from "bcrypt";

class UserController {
  async Create(req, res) {
    try {
      const { name, email, password } = req.body;

      new Validation({ name, email, password }).Check();
      const userData = await User.FindOne({ email });
      if (userData) throw new NotValid("Email já cadastrado");

      const passwordHash = await hash(password, 10);

      await User.Create({ name, email, password: passwordHash });
      res.json({ message: "User Created" });
    } catch (err) {
      if (err?.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
    }
  }
}
export default new UserController();
