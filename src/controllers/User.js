import User from "../services/User.js";
import Validation from "../utils/Validation.js";

class UserController{
    async Create(req, res){
        try{
            const {name, emassil, password} = req.body

            new Validation({name, email, password}).Check()
            await User.create({name, email, password})
            res.json({message:"User Created"})
        }catch(err){
            if(err.status) res.status(err.status).json(err.message)
            res.sendStatus(500)
        }
    }
}
export default new UserController()