import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: String,
    password:String,
    date: {type:Date, default: Date.now()}
})
const User = model("User", UserSchema)
export default User