import { log } from "console";
import { Project } from "../models/project.js";
import fs from 'fs';
import path from 'path';import { fileURLToPath } from 'url';

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
  const {projectName } = req.params;
  try {
    // Find the project by its name
    console.log("name:" ,projectName);
    const project = await Project.findOne({ where: { name:projectName } });

    if (!project) {
      return res.status(404).json({ error: `Project with name "${projectName}" not found.` });
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
    await Project.destroy({ where: { name:projectName } });

    res.status(200).json({ message: `Project "${projectName}" and its associated image deleted successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the project.' });
  }
};