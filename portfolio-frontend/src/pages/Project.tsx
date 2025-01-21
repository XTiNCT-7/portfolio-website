// src/pages/Project.tsx
import React from 'react';

interface ProjectProps {
  title: string;
  description: string;
  link: string;
}

const Project: React.FC<ProjectProps> = ({ title, description, link }) => {
  return (
    <div className="project">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>
    </div>
  );
};

export default Project;
