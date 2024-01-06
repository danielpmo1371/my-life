"use client";

import { ReactQueryDevtools } from "react-query/devtools";
import { RiDashboard3Line } from "react-icons/ri";
import { MantraItems } from "./FocusItems";
import { TodoItems } from "./TodoItems";
import ProjectItems from "./ProjectItems";
import { HighLevelGoals } from "./HighLevelGoals";
import useSectionsStore from "../stores/sectionTogglesStore";
import PillButton from "@/components/PillButton";
import WishListItems from "./WishListItems";
import { Sections, SectionsKeys } from "../common/types";
import { QueryClient, QueryClientProvider } from "react-query";
import DoItNextItems from "./DoItNextItems";

export default function Dashboard({ parentId }: { parentId?: string }) {
  const { showSection, toggleSection } = useSectionsStore();
  const queryClient = new QueryClient();

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
          <h2 style={{ marginBottom: 0 }}>Dashboard</h2>
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          className="dashboard-sections"
        >
          <div hidden={!showSection("doItNextItems")}>
            <DoItNextItems parentId={parentId} />
          </div>

          <div hidden={!showSection("todos")}>
            <TodoItems parentId={parentId} />
          </div>

          <div hidden={!showSection("projects")}>
            <ProjectItems parentId={parentId} />
          </div>

          <div hidden={!showSection("highLevelGoals")}>
            <HighLevelGoals parentId={parentId} />
          </div>

          <div hidden={!showSection("mantras")}>
            <MantraItems parentId={parentId} />
          </div>

          <div hidden={!showSection("wishListItems")}>
            <WishListItems parentId={parentId} />
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}
