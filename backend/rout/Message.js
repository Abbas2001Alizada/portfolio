import { Router } from "express";
import { Messaging } from "../controller/MessageController.js";
const MessageRouter= Router()

MessageRouter.get('/',Messaging)



export default MessageRouter