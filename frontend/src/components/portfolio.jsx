import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState({}); // State to track which project is expanded

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

  return (
    <section id="portfolio" className="bg-gray-100">
      <div className="mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white p-4 rounded shadow">
                <img 
                  src={`http://localhost:3002/uploads/${project.imagePath}`} 
                  alt={project.name} 
                  className="w-full h-48 object-cover rounded mb-4"
                />
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

                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-700 block mt-4"
                >
                  View on GitHub
                </a>
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

export default Portfolio;
