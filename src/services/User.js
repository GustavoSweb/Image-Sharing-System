import UserModel from "../models/User.js";
import StatusError from "../utils/Error.js";
class User {
  async Create({ name, email, password }) {
    try {
      return await UserModel.create({
        name,
        email,
        password,
      });
  }catch(err){
    throw err
  }
}
  async FindOne(toEqual) {
    try {
      const user = await UserModel.find(toEqual)
      if(!user || user.length <= 0) return false
      return user[0]
  }catch(err){
    throw err
  }
}
  async Remove(_id) {
    try {
      const Changes = await UserModel.findByIdAndDelete(_id)
      if(!Changes || Changes.length <= 0) return false
      return true
  }catch(err){
    throw err
  }
}
}

export default new User()