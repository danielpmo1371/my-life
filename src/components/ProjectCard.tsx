import React, { MouseEventHandler } from "react";
import { Project, User } from "@/pages/types/project";
import styled from "styled-components";
import ThreeDots from "./ThreeDots";

const ProjectCardWrapper = styled.div`
    width: 240px;
    background-color: #5C469C;
    border-radius: 0.5rem;
    padding: 1rem; 
    }`;

const TeamMember: React.FC<{ member: User }> = ({ member }) => {
  return (
    <div className="flex m-2">
      <img
        src={member.avatar}
        alt={member.name}
        className="w-[30px] h-[30px] rounded-lg"
      />
      <span className="text-sm">{member.name}</span>
    </div>
  );
};

const ProjectImage = styled.img`
  width: 100%;
  height: 7rem;
`;

const Progress = styled.div`
  height: 0.25rem;
  background-color: #4caf50;
`;

const ProgressBar = styled.div`
  height: 0.25rem;
  background-color: #e0e0e0;
`;

const ProjectDescription = styled.p`
  font-size: 0.875rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Status = styled.p`
  text-align: right;
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  color: #4caf50;
`;

const TextXs = styled.p`
  font-size: 0.75rem;
`;

const Flex = styled.div`
  display: flex;
`;

interface ProjectCardProps {
  project: Project;
  onView: MouseEventHandler<HTMLAnchorElement>;
  onEdit: MouseEventHandler<HTMLAnchorElement>;
  onDelete: MouseEventHandler<HTMLAnchorElement>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onView,
  onEdit,
  onDelete,
}) => {
  const { name, team, imageUrl, description, progress, status, startDate } =
    project;

  return (
    <ProjectCardWrapper>
      <Flex style={{ justifyContent: "space-between" }}>
        <Title>{name}</Title>

        <Flex>
          <Flex style={{ flexDirection: "column", alignSelf: "center" }}>
            <TextXs>{startDate}</TextXs>
            <Status>{status}</Status>
          </Flex>
          <ThreeDots
            options={[
              { name: "View", onClick: onView },
              { name: "Edit", onClick: onEdit },
              { name: "Delete", onClick: onDelete },
            ]}
          />
        </Flex>
      </Flex>
      <ProjectImage src={imageUrl} alt="Project" />
      <ProjectDescription>{description}</ProjectDescription>
      <ProgressBar>
        <Progress style={{ width: `${progress}%` }}></Progress>
      </ProgressBar>
      <Flex>
        {team.map((member) => (
          <TeamMember key={member.email} member={member}></TeamMember>
        ))}
      </Flex>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
