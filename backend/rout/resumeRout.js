import { Router } from 'express';
import upload from '../resumeMulter.js';
import { downloadResume, uploadResume } from '../controller/resumeController.js';

const resumerouter = Router();

// Route for uploading resumes (PDFs)
resumerouter.post('/create', upload.single('resume'), uploadResume);
resumerouter.get('/download', downloadResume);

export default resumerouter;
