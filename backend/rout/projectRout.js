import { Router } from "express";
import { createProject, deleteProjectByName, editProject, getAllprojects } from "../controller/projectController.js";
import upload from "../multer.js";
const projectrouter= Router()
projectrouter.post('/create',upload.single("photo") ,createProject)
projectrouter.post('/login',(req,res)=>{
    res.json("done")
})
projectrouter.get('/',getAllprojects)
projectrouter.delete('/delete/:deleteConfirmation',deleteProjectByName)
projectrouter.put('/edit/:id', editProject);



export default projectrouter