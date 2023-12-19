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

const { getData, saveDataAndRefresh, deleteAndRefresh } =
  getCrudFor<Project>("projects");

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
        />
      </div>
    )
  );

  function addProject(): void {
    const allIndexes = data?.map((x) => x.order);
    const highestIndex = allIndexes?.sort((a, b) => b.localeCompare(a))[0] ?? 0;

    const index = parseInt(highestIndex) + 1;

    saveDataAndRefresh(
      {
        ...newItem,
        ownerEmail: user?.email!,
        order: index.toString(),
      },
      setData
    );
  }
}
