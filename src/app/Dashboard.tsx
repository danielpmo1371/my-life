"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RiDashboard3Line } from "react-icons/ri";
import useFocusStore from "./stores/focusStore";
import useStore from "./stores/useStore";
import { FocusItems } from "./FocusItems";

export default function Dashboard() {
  return (
    <div className="card dashboard">
      <RiDashboard3Line className="icon" />
      <h2 style={{ marginBottom: 0 }}>Personal Dashboard</h2>
      <small style={{ margin: 0, padding: 0 }}>
        Overview of current focuses, events, deadlines.
      </small>
      <FocusItems />
    </div>
  );
}
