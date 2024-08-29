import { Router } from "express";
import { createUser, login } from "../controller/userController.js";
const UserRouter= Router()

UserRouter.post('/',createUser)
UserRouter.post('/login',login)



export default UserRouter