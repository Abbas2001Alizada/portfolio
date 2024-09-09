// components/UploadResume.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadResume = () => {
  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', pdf);

    try {
      const response = await axios.post('http://localhost:3002/resume/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      setMessage('Resume uploaded successfully!');
      setPdf(null);
    } catch (error) {
      setMessage('Error uploading resume.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Resume</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium mb-2">
              Choose a PDF:
            </label>
            <input
              id="file"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default UploadResume;
