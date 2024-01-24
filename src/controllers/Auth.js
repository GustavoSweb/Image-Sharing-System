import express from "express";
import jwt from "jsonwebtoken";
import User from "../services/User";
import { compare } from "bcrypt";
import Error from "../utils/Error";
const { NotValid, NotExistValue } = Error;
class Auth{
    async User(req, res){
      try {
        const { password, email } = req.body;
        const userData = await User.FindOne({ email });
        if(!userData)throw new NotExistValue('Usuario não existe')
        const resultAuth =await compare(password, userData.password);
        if (!resultAuth) throw new NotValid("Credenciais invalidas");
        const token = jwt.sign(
          { email, id: resultAuth._id },
          process.env.JWT_SECRET,
          {expiresIn:'72h'}
        );
        res.json({ token });
      } catch (err) {
        if (err?.status) return res.status(err.status).json({ err: err.message });
      res.sendStatus(500);
      }
    }
}
export default new Auth()