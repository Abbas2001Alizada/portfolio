import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {Project} from './models/project.js';
import sequelize from './dbConnection.js';
import projectrouter from './rout/projectRout.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mailrouter from './rout/mailRout.js';
import MessageRouter from './rout/Message.js';
import UserRouter from './rout/userRout.js';
import resumerouter from './rout/resumeRout.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to serve static files (images)
const uploadsDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDirectory));

app.use(cors());
app.use(bodyParser.json());
app.use('/project',projectrouter)
app.use('/sendMail',mailrouter)
app.use('/messages',MessageRouter)
app.use('/user',UserRouter)
app.use('/resume',resumerouter)


sequelize.sync({alter:true})

// Start the server
const PORT =  3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
