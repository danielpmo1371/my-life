"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { RiDashboard3Line } from "react-icons/ri";
import { MantraItems } from "./FocusItems";
import { TodoItems } from "./TodoItems";
import ProjectItems from "./ProjectItems";
import { HighLevelGoals } from "./HighLevelGoals";
import useSectionsStore, {
  Sections,
  SectionsKeys,
} from "../stores/sectionTogglesStore";
import PillButton from "@/components/PillButton";
import WishListItems from "./WishListItems";

export default function Dashboard({ parentId }: { parentId?: string }) {
  const { showSection, toggleSection } = useSectionsStore();
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
          <h2 style={{ marginBottom: 0 }}>Personal Dashboard</h2>
          <small style={{ margin: 0, padding: 0 }}>
            Overview of current focuses, events, deadlines.
          </small>
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
        >
          {Sections.map((s) => (
            <PillButton
              style={{
                flex: 1,
                backgroundColor: showSection(s as SectionsKeys)
                  ? "lightblue"
                  : "gray",
              }}
              key={s}
              onClick={() => {
                toggleSection(s as SectionsKeys);
              }}
            >
              {s}
            </PillButton>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        className="dashboard-sections"
      >
        {showSection("highLevelGoals") && (
          <HighLevelGoals parentId={parentId} />
        )}
        {showSection("mantras") && <MantraItems parentId={parentId} />}
        {showSection("todos") && <TodoItems parentId={parentId} />}
        {showSection("projects") && <ProjectItems parentId={parentId} />}
        {showSection("wishList") && <WishListItems parentId={parentId} />}
      </div>
    </div>
  );
}
