import { log } from "console";
import { Project } from "../models/project.js";
import fs from 'fs'
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
    const project = await Project.create({ name, description, githubUrl, imagePath: image,view:true });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all users
export const getAllprojects= async (req, res) => {
  try {
    const projects = await Project.findAll({where:{view:true}});
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteProjectByName = async (req, res) => {
  const { name } = req.params; // Assuming the project name is passed as a URL parameter

  try {
    // Find the project by its name
    const project = await Project.findOne({ where: { name } });

    if (!project) {
      return res.status(404).json({ error: `Project with name "${name}" not found.` });
    }

    // Delete the found project
    await Project.destroy({ where: { name } });

    res.status(200).json({ message: `Project "${name}" deleted successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
