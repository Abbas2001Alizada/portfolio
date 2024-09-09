import axios from 'axios';
import React from 'react';

const DownloadResume = () => {
  const handleDownload = async () => {
    try {
      // Make a GET request to trigger the download
      const res = await axios({
        url: 'http://localhost:3002/resume/download',
        method: 'GET',
        responseType: 'blob', // Important for handling binary data
      });

      // Create a URL for the file and open it in a new tab
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf'); // Specify the file name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM after the download starts
    } catch (err) {
      console.error('Error downloading the resume:', err);
    }
  };

  return (
 <button
          onClick={handleDownload}
          className="ml-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Download Resume
        </button>

  );
};

export default DownloadResume;
