import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState({}); // State to track which project is expanded
  const [loading, setLoading] = useState(false); // Loading state for deletion process
  const [deleteConfirmation, setDeleteConfirmation] = useState(); // Store the project to be deleted

  // Fetch all projects from the database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3002/project'); // Adjust the URL as per your API endpoint
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching the projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Helper function to toggle the read more/less
  const toggleReadMore = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  // Helper function to truncate text
  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  // Function to confirm deletion
  const confirmDelete = (id) => {
    setDeleteConfirmation(id); // Show the confirmation dialog
  };

  // Function to delete a project by its ID
  const deleteProject = async (deleteConfirmation) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3002/project/delete/${deleteConfirmation}`); // Send DELETE request
      // Remove the deleted project from the state
      setProjects(projects.filter(project => project.id !== deleteConfirmation));
      setLoading(false);
      setDeleteConfirmation(null); // Close the confirmation modal
    } catch (error) {
      console.error('Error deleting the project:', error);
      setLoading(false);
    }
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setDeleteConfirmation(null); // Close the confirmation modal without deleting
  };

  return (
    <section id="portfolio" className="bg-gray-100">
      <div className="mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded shadow">
                {/* Display project image */}
                <img 
                  src={`http://localhost:3002/uploads/${project.imagePath}`} 
                  alt={project.name} 
                  className="w-full h-48 object-cover rounded mb-4"
                />
                
                {/* Display project ID */}
                {/* <p className="text-gray-500 text-sm">Project ID: {project.id}</p> */}

                {/* Display project name */}
                <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                
                {/* Show truncated or full description based on the expanded state */}
                <p className="text-gray-700 mb-2">
                  {expanded[project.id] 
                    ? project.description 
                    : truncateText(project.description, 50)}
                </p>
                
                {/* Toggle between "Read more" and "Read less" */}
                {project.description.length > 50 && (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => toggleReadMore(project.id)}
                  >
                    {expanded[project.id] ? 'Read less' : 'Read more'}
                  </button>
                )}

                {/* GitHub link */}
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-700 block mt-4"
                >
                  View on GitHub
                </a>

                {/* Delete button */}
                <button
                  onClick={() => confirmDelete(project.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors duration-300"
                  disabled={loading} // Disable button if loading
                >
                  Delete Project
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">Loading projects...</p>
          )}
        </div>

        {/* Delete confirmation popup */}
        {deleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this project? This action cannot be undone.</p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={cancelDelete}
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteProject(deleteConfirmation)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
                  disabled={loading} // Disable button if loading
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
