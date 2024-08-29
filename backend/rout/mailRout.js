import { Router } from "express";
import { mailer } from "../controller/mailController.js";
const mailrouter= Router()

mailrouter.post('/',mailer)



export default mailrouter