import { Router } from "express";
import { createUser, forgotPassword, login, resetPassword, updateCredentials, } from "../controller/userController.js";
const UserRouter= Router()

UserRouter.post('/',createUser)
UserRouter.post('/login',login)
UserRouter.post('/forgot-password', forgotPassword);
UserRouter.post('/reset-password/:token', resetPassword);
UserRouter.post('/update-credentials', updateCredentials);

export default UserRouter