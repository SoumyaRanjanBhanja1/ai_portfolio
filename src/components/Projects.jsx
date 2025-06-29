import { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data));
  }, []);

  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-4 shadow rounded">
            <img src={project.image} alt={project.title} className="rounded mb-2" />
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" className="text-indigo-600">Live Demo</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
