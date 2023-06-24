import { Project } from '@/app/types/project';
import React from 'react';

const ProjectCard = (prop: { project: Project }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold">{prop.project.name}</h3>
      <p className="text-gray-700">{prop.project.description}</p>
      <p className="text-gray-500 text-sm">Created: {prop.project.startDate}</p>
    </div>
  );
};

export default ProjectCard;
