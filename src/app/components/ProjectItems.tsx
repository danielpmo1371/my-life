"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getCrudFor } from "@/next_cst/crudClient";
import PillListOfItems from "./PillListOfItems";

type Project = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export default function ProjectItems() {
  const { user } = useUser();

  const state = useState<Project[]>([]);
  const crudClient = getCrudFor<Project>("projects", true);

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>Projects</h4>
        <PillListOfItems<Project>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="project"
        />
      </div>
    )
  );
}
