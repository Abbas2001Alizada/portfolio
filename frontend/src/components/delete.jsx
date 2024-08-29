import React, { useState } from 'react';
import axios from 'axios';

const DeleteProject = () => {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3002/project/delete/${projectName}`);
      setStatus(`Project "${projectName}" deleted successfully.`);
      setProjectName('');
    } catch (error) {
      setStatus(`Error deleting project: ${error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-200 rounded-lg ">
      <h2 className="text-2xl font-bold mb-4 text-center">Delete Project</h2>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Enter project name"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleDelete}
        className="w-full p-2 bg-black text-white rounded hover:bg-blue-400"
      >
        Delete Project
      </button>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
};

export default DeleteProject;
