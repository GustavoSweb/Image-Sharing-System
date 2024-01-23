import express from "express";
import UserController from "../controllers/User.js";
const Router = express.Router()

Router.post('/', UserController.Create)

export default Router