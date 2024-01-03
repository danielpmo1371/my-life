import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import PillListOfItems from "./PillListOfItems";
import { Tooltip } from "react-tooltip";
type HighLevelGoal = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export function HighLevelGoals({ parentId }: { parentId?: string }) {
  const { user } = useUser();

  const state = useState<HighLevelGoal[]>([]);
  const crudClient = getApiCrudClientFor<HighLevelGoal>("highLevelGoals", true);

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>High-Level Goals</h4>
        <h6 className="text-with-hidden-explanation" id="high-level-goals-are">
          High-Level Goals are overarching objectives that...
          <Tooltip anchorSelect="#high-level-goals-are" place="top">
            <p style={{ maxWidth: "250px", fontSize: "14px" }}>
              provide direction and purpose in both personal and professional
              contexts. Unlike projects or to-do items, high-level goals are
              broader in scope and more strategic in nature, often serving as
              the driving force behind various projects and daily tasks. These
              goals encapsulate your long-term vision and major aspirations,
              such as &quot;Achieving financial independence,&quot;
              &quot;Becoming a leader in your industry,&quot; or
              &quot;Maintaining a healthy work-life balance.&quot; High-level
              goals are typically less specific and more inspirational, setting
              a path for more detailed planning through projects and tasks. They
              require regular review and reflection to stay aligned with
              one&#x27;s evolving priorities and circumstances. High-level goals
              are crucial for guiding decision-making, focusing efforts, and
              measuring progress over time.\n
            </p>
          </Tooltip>
        </h6>
        <PillListOfItems<HighLevelGoal>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="highLevelGoals"
          parentId={parentId}
        />
      </div>
    )
  );
}
