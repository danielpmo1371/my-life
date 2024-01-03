"use client";

import { RiDashboard3Line } from "react-icons/ri";
import { QueryClient } from "react-query";

export default function ItemDetailsCard({ parentId }: { parentId?: string }) {
  return (
    <div className="card dashboard">
      <RiDashboard3Line className="icon" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginBottom: 0 }}>Details</h2>
          <small style={{ margin: 0, padding: 0 }}></small>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            scale: 0.6,
            flexWrap: "wrap",
          }}
        ></div>
      </div>
    </div>
  );
}
