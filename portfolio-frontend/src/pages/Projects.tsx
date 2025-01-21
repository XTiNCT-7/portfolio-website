// src/pages/Projects.tsx
import React from 'react';

const Projects: React.FC = () => {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="project">
        <h3>Project 1</h3>
        <p>Description of your project.</p>
        <a href="link-to-project" target="_blank" rel="noopener noreferrer">View Project</a>
      </div>
    </section>
  );
};

export default Projects;
