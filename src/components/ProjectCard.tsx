import React from 'react';
import './ProjectCard.module.css';
import { Project } from '@/pages/types/project';

// const ProjectCard = (prop: { project: Project }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-4">
//       <h3 className="text-lg font-bold">{prop.project.name}</h3>
//       <p className="text-gray-700">{prop.project.description}</p>
//       <p className="text-gray-500 text-sm">Created: {prop.project.startDate}</p>
//     </div>
//   );
// };
interface ProjectCardProps {
  project: Project;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView, onEdit, onDelete }) => {
    const { name, team, imageUrl, description, progress, status, startDate } = project;

    return (
        <div className="project-card">
            <h2 className="project-title">{name}</h2>
            <img src={imageUrl} alt="Project" className="project-image" />
            <p className="project-description">{description}</p>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="project-status">{status}</p>
            <p className="project-date">{startDate}</p>
            <div className="team-members">
                {team.map(member => <img key={member.email} src={member.avatar} alt={member.name} className="member" />)}
            </div>
            <div className="project-actions">
                <button onClick={onView}>View</button>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ProjectCard;
