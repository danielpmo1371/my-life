"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { RiDashboard3Line } from "react-icons/ri";
import { MantraItems } from "./FocusItems";
import { TodoItems } from "./TodoItems";
import ProjectItems from "./ProjectItems";

export default function Dashboard() {
  const user = useUser();
  return (
    <div className="card dashboard">
      <RiDashboard3Line className="icon" />
      <h2 style={{ marginBottom: 0 }}>Personal Dashboard</h2>
      <small style={{ margin: 0, padding: 0 }}>
        Overview of current focuses, events, deadlines.
      </small>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        className="dashboard-sections"
      >
        <MantraItems />
        <TodoItems />
        <ProjectItems />
      </div>
    </div>
  );
}
