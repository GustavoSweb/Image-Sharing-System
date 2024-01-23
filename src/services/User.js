import UserModel from "../models/User.js";
import StatusError from "../utils/Error.js";
class User {
  async create({ name, email, password }) {
    try {
      await UserModel.create({
        name,
        email,
        password,
      });
  }catch(err){
    throw err
  }
}
}

export default new User()