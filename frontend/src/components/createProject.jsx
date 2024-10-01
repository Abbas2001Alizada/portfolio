import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Project name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!githubUrl) newErrors.githubUrl = 'GitHub URL is required';
    if (!photo) newErrors.photo = 'Project photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('githubUrl', githubUrl);
    formData.append('photo', photo);

    try {
      const response = await axios.post('http://localhost:3002/project/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('Project created successfully!');
      
      // Clear form fields
      setName('');
      setDescription('');
      setGithubUrl('');
      setPhoto(null);
      setErrors({});
    } catch (error) {
      setMessage(error.response.data.error);
      console.error('There was an error!', error);
    }
  };

  return (
    <div dir='ltr' className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      
      {message && <p className="mb-4 text-green-400">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            className="w-full p-2 text-black border border-gray-400 rounded focus:outline-none" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea 
            id="description" 
            className="w-full p-2 text-black border border-gray-400 rounded focus:outline-none" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="githubUrl">GitHub URL</label>
          <input 
            type="url" 
            id="githubUrl" 
            className="w-full p-2 text-black border border-gray-400 rounded focus:outline-none" 
            value={githubUrl} 
            onChange={(e) => setGithubUrl(e.target.value)} 
            required 
          />
          {errors.githubUrl && <p className="text-red-500 text-sm">{errors.githubUrl}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="photo">Photo</label>
          <input 
            type="file" 
            id="photo" 
            className="w-full p-2 text-white border border-gray-400 rounded focus:outline-none" 
            onChange={handleFileChange} 
            required
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
        </div>

        <div className="mb-4">
          <button 
            type="submit" 
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
