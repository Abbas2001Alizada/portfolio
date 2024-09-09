// controllers/resumeController.js
import fs from 'fs';
import path from 'path';
import { Resume } from '../models/Resume.js';
import { fileURLToPath } from 'url';



// Controller function to handle resume download
export const downloadResume = async (req, res) => {
  try {
    // Fetch the resume record from the database (assuming one row)
    const resume = await Resume.findOne({
      where: { id: 1 } // Adjust the condition if needed (assumes the resume is stored under id 1)
    });

    // Check if resume record is found
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found in the database' });
    }

    const { filename, filepath } = resume;

    // Full path to the file on the server
    const resumePath = path.join(__dirname, '..', filepath);

    // Check if the file exists
    if (fs.existsSync(resumePath)) {
      // Send the file to the client
      res.download(resumePath, filename, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          return res.status(500).json({ error: 'Error downloading the file' });
        }
      });
    } else {
      // File does not exist in the server's file system
      return res.status(404).json({ error: 'Resume file not found on the server' });
    }
  } catch (error) {
    console.error('Error occurred while downloading the resume:', error);
    return res.status(500).json({ error: 'An error occurred while downloading the resume' });
  }
};




// Fix for ES module: Calculate __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadResume = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { filename, path: filepath } = req.file;

    // Find the existing resume (assuming one resume per user, change logic if needed)
    const existingResume = await Resume.findOne();

    if (existingResume) {
      // Delete the old resume file from the file system
      const fullPath = path.join(__dirname, '..', existingResume.filepath);
      
      // Check if file exists before attempting to delete
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error('Error deleting the old resume:', err);
          } else {
            console.log('Old resume deleted successfully');
          }
        });
      }

      // Update the existing resume with the new file's info
      existingResume.filename = filename;
      existingResume.filepath = filepath;
      await existingResume.save();

      return res.status(200).json({
        message: 'Resume replaced successfully',
        resume: existingResume,
      });
    } else {
      // No existing resume found, so create a new one
      const newResume = await Resume.create({
        filename: filename,
        filepath: filepath,
      });

      return res.status(201).json({
        message: 'Resume uploaded successfully',
        resume: newResume,
      });
    }
  } catch (error) {
    console.error('Error uploading resume:', error);
    return res.status(500).json({ error: 'An error occurred while uploading the resume' });
  }
};
