import React, { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('githubUrl', githubUrl);
    formData.append('photo', photo);

    try {
      const response = await axios.post('http://localhost:3002/project/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setMessage('Project created successfully!');
      console.log(response.data);
      
      // Clear form fields
      setName('');
      setDescription('');
      setGithubUrl('');
      setPhoto(null);
    } catch (error) {
      setMessage(error.response.data.error);
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      
      {message && <p className="mb-4 text-green-500">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea 
            id="description" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="githubUrl">GitHub URL</label>
          <input 
            type="url" 
            id="githubUrl" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={githubUrl} 
            onChange={(e) => setGithubUrl(e.target.value)} 
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="photo">Photo</label>
          <input 
            type="file" 
            id="photo" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            onChange={handleFileChange} 
           
          />
        </div>

        <div className="mb-4">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
