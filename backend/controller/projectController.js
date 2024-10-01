import { log } from "console";
import { Project } from "../models/project.js";
import fs from 'fs';
import path from 'path';import { fileURLToPath } from 'url';

// ES6 arrow function to edit a project
export const editProject = async (req, res) => {
  const { id } = req.params; // Destructure project ID from request parameters
  const { name, description, githubUrl } = req.body; // Destructure updated project details from request body

  try {
    // Find the project by its ID
    const project = await Project.findByPk(id);

    // If project not found, return a 404 error
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update the project with new data or retain existing values
    await project.update({
      name: name || project.name,
      description: description || project.description,
      githubUrl: githubUrl || project.githubUrl,
    });

    // Send success response with updated project details
    return res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ error: 'An error occurred while updating the project' });
  }
};


// Fix for ES module: Calculate __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new project
export const createProject = async (req, res) => {
  const { name, description, githubUrl } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    // Check if a project with the same name already exists
    const existingProject = await Project.findOne({ where: { name } });

    if (existingProject) {
      return res.status(400).json({ error: 'A project with this name already exists. Please choose another name.' });
    }

    // Create a new project
    const project = await Project.create({ name, description, githubUrl, imagePath: image, view: true });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all projects
export const getAllprojects = async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { view: true } });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a project by its name and associated image file
export const deleteProjectByName = async (req, res) => {
  const {deleteConfirmation} = req.params;
  try {
    console.log(deleteConfirmation);
    // Find the project by its name
    const project = await Project.findOne({ where: {id:deleteConfirmation} });

    if (!project) {
      return res.status(404).json({ error: `Project with name "${project.name}" not found.` });
    }

    // Retrieve the image path from the project
    const imagePath = project.imagePath;

    // If the project has an associated image, delete the image file first
    if (imagePath) {
      const filePath = path.join(__dirname, '..', 'uploads', imagePath);
      try {
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
          console.log(`Image file ${imagePath} deleted successfully.`);
        }
      } catch (err) {
        console.error(`Failed to delete image file: ${err.message}`);
        return res.status(500).json({ error: 'Error occurred while deleting the image file.' });
      }
    }

    // Delete the project record from the database
    await Project.destroy({ where: { id:deleteConfirmation} });

    res.status(200).json({ message: `Project "${project.name}" and its associated image deleted successfully.` });
  } catch (err) {
    
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the project.' });
  }
};