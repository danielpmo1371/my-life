"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import PillListOfItems from "./PillListOfItems";

type Project = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export default function ProjectItems({ id }: { id?: string }) {
  const { user } = useUser();

  const state = useState<Project[]>([]);
  const crudClient = getApiCrudClientFor<Project>("projects", true);

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>Projects</h4>
        <h6 className="text-with-hidden-explanation">
          Projects are structured endeavors that...
          <span className="hide">
            involve multiple tasks, requiring coordination, planning, and a
            dedicated timeline for completion. Unlike abstract mind concepts
            (AMCs) or to-do items, projects involve various steps and
            components. They are defined by specific objectives, a start and end
            date, and often require resources such as time, skills, and
            resources. Examples of projects could include organizing a trip,
            developing a new business strategy, or renovating a home. Each
            project is a journey towards a defined goal, involving
            problem-solving, decision-making, and often teamwork. They provide a
            sense of accomplishment upon completion and contribute significantly
            to personal or professional growth.
          </span>
        </h6>
        <PillListOfItems<Project>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="project"
          id={id}
        />
      </div>
    )
  );
}
