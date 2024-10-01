import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProject = () => {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState({}); // State to track which project is expanded
  const [editProjectId, setEditProjectId] = useState(null); // Store the project being edited
  const [editData, setEditData] = useState({ name: '', description: '', githubUrl: '' });
  const [loading, setLoading] = useState(false);

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

  // Function to set the project to be edited
  const editProject = (project) => {
    setEditProjectId(project.id);
    setEditData({ name: project.name, description: project.description, githubUrl: project.githubUrl });
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to submit the edit form
  const submitEdit = async (id) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3002/project/edit/${id}`, editData); // Send PUT request with new data
      const updatedProjects = projects.map((project) =>
        project.id === id ? { ...project, ...editData } : project
      );
      setProjects(updatedProjects);
      setEditProjectId(null); // Close the edit form
      setLoading(false);
    } catch (error) {
      console.error('Error updating the project:', error);
      setLoading(false);
    }
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setEditProjectId(null);
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

                {/* If the project is being edited, show edit form */}
                {editProjectId === project.id ? (
                  <div>
                    {/* Edit project form */}
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="githubUrl"
                      value={editData.githubUrl}
                      onChange={handleInputChange}
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => submitEdit(project.id)}
                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Display project details */}
                    <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-700 mb-2">
                      {expanded[project.id]
                        ? project.description
                        : truncateText(project.description, 50)}
                    </p>
                    {project.description.length > 50 && (
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => toggleReadMore(project.id)}
                      >
                        {expanded[project.id] ? 'Read less' : 'Read more'}
                      </button>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 block mt-4"
                    >
                      View on GitHub
                    </a>

                    {/* Edit button */}
                    <button
                      onClick={() => editProject(project)}
                      className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors duration-300"
                    >
                      Edit Project
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700">Loading projects...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditProject;
