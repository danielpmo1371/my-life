"use client";

import { RiDashboard3Line } from "react-icons/ri";
import { FocusItems } from "./FocusItems";
import { TodoItems } from "./TodoItems";
import ProjectItems from "./ProjectItems";

export default function Dashboard() {
  return (
    <div className="card dashboard">
      <RiDashboard3Line className="icon" />
      <h2 style={{ marginBottom: 0 }}>Personal Dashboard</h2>
      <small style={{ margin: 0, padding: 0 }}>
        Overview of current focuses, events, deadlines.
      </small>
      <div
        style={{ display: "flex", flexDirection: "row", padding: "30px" }}
        className="dashboard-sections"
      >
        <FocusItems />
        <TodoItems />
        <ProjectItems />
      </div>
    </div>
  );
}
