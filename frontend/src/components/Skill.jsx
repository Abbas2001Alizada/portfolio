import React from 'react';

const Skill = () => {
  return (
    <div id='skills' className="bg-black p-8 rounded-lg shadow-md max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Full Stack Developer</h2>
      <p className="text-white text-center mb-8">
        I am a full stack developer skilled in building and maintaining scalable applications. I work with both frontend and backend technologies to deliver high-quality software solutions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Frontend Skills */}
        <div>
          <h3 className="text-2xl font-semibold text-white italic mb-4">Frontend</h3>
          <ul className="space-y-3">
            <li className="bg-white p-4 rounded-md shadow-md flex items-center">
              <span className="text-black font-semibold text-lg">React</span>
            </li>
            <li className="bg-white p-4 rounded-md shadow-md flex items-center">
              <span className="text-black font-semibold text-lg">Tailwind CSS</span>
            </li>
          </ul>
        </div>

        {/* Backend Skills */}
        <div>
          <h3 className="text-2xl font-semibold text-white italic mb-4">Backend</h3>
          <ul className="space-y-3">
            <li className="bg-white p-4 rounded-md shadow-md flex items-center">
              <span className="text-black font-semibold text-lg">Node.js</span>
            </li>
            <li className="bg-white p-4 rounded-md shadow-md flex items-center">
              <span className="text-black font-semibold text-lg">MySQL</span>
            </li>
            <li className="bg-white p-4 rounded-md shadow-md flex items-center">
              <span className="text-black font-semibold text-lg">Sequelize</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skill;
