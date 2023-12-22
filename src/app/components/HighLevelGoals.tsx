import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getCrudFor } from "@/next_cst/crudClient";
import PillListOfItems from "./PillListOfItems";
type HighLevelGoal = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export function HighLevelGoals() {
  const { user } = useUser();

  const state = useState<HighLevelGoal[]>([]);
  const crudClient = getCrudFor<HighLevelGoal>("highLevelGoals", true);

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>High-Level Goals</h4>
        <h6 className="text-with-hidden-explanation">
          High-Level Goals are overarching objectives that...
          <span className="hide">
            provide direction and purpose in both personal and professional
            contexts. Unlike projects or to-do items, high-level goals are
            broader in scope and more strategic in nature, often serving as the
            driving force behind various projects and daily tasks. These goals
            encapsulate your long-term vision and major aspirations, such as
            &quot;Achieving financial independence,&quot; &quot;Becoming a
            leader in your industry,&quot; or &quot;Maintaining a healthy
            work-life balance.&quot; High-level goals are typically less
            specific and more inspirational, setting a path for more detailed
            planning through projects and tasks. They require regular review and
            reflection to stay aligned with one&#x27;s evolving priorities and
            circumstances. High-level goals are crucial for guiding
            decision-making, focusing efforts, and measuring progress over
            time.\n
          </span>
        </h6>
        <PillListOfItems<HighLevelGoal>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="highLevelGoals"
        />
      </div>
    )
  );
}
