import express from "express";
import UserController from "../controllers/User.js";
import AuthController from "../controllers/Auth.js";
const Router = express.Router()

Router.post('/user', UserController.Create)
Router.delete('/user/:id', UserController.Delete)

Router.post('/auth', AuthController.User)

export default Router