import React, { useState } from 'react';
import axios from 'axios';

const DeleteProject = () => {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!projectName) {
      setError('Project name is required');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3002/project/delete/${projectName}`);
      setStatus(`Project "${projectName}" deleted successfully.`);
      setProjectName('');
      setError('');
    } catch (error) {
      setStatus(`Error deleting project: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Delete Project</h2>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        className="w-full p-2 mb-4 text-black border border-gray-400 rounded focus:outline-none"
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        onClick={handleDelete}
        className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-300"
      >
        Delete Project
      </button>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
};

export default DeleteProject;
