//tsx page component for projects
import React from 'react';
import { Project } from '../types/project';
import ProjectCard from '@/components/ProjectCard';
// import { ProjectCard } from './card';

export default function Projects() {
    let projects: Project[];
    let updateProjects: React.Dispatch<any>;

    projects = [
        {
            id: 1,
            user_id: 1,
            user: {
                id: 1,
                name: "John",
                email: "J@g.c",
            },
            name: "Project 1",
            description: "This is project 1",
            status: "Active",
            startDate: "2021-01-01",
            endDate: "2021-12-31",
            budget: 1000000,
            expenses: 500000,
            progress: 0,
            tasks: [
                {
                    id: 1,
                    name: "Task 1",
                    description: "This is task 1",
                    status: "Active",
                    startDate: "2021-01-01",
                    endDate: "2021-12-31",
                    budget: 100000,
                    expenses: 50000,
                    issues: 5,
                    risks: 2,
                    documents: 10,
                    notes: 5,
                    project_id: 1,
                    progress: 0,
                },
            ],
            issues: 5,
            risks: 2,
            documents: 10,
            notes: 5,
        },
    ];

    return (
        <div className="">
        <h1>Projects</h1>
        <div className="flex items-center space-x-4 mt-3">
            {projects.map((project) => (
                <ProjectCard
                key={project.id}
                project={project}
                />
                ))}
        </div>
        </div>
    );
};