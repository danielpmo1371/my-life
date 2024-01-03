import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import PillListOfItems from "./PillListOfItems";
import { Tooltip } from "react-tooltip";
type Mantra = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export function MantraItems({ parentId }: { parentId?: string }) {
  const { user } = useUser();

  const state = useState<Mantra[]>([]);
  const crudClient = getApiCrudClientFor<Mantra>("mantras", true);

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>Mantras</h4>
        <h6 className="text-with-hidden-explanation" id="mantras-are">
          Mantras or Abstract mind concepts (AMCs) are items that...
          <Tooltip anchorSelect="#mantras-are" place="top">
            <p style={{ maxWidth: "250px", fontSize: "14px" }}>
              &nbsp; are abstract in nature and represent an idea, value,
              pattern, behaviour or habit to cultivate continuously. Examples
              are &quot;Be more patient&quot;, &quot;Review calendar
              frequently&quot;, &quot;Prioritise family over work&quot;,
              &quot;Focus on retirement&quot;, &quot;Save for trip&quot;. These
              are phrases or ideas that one repeats or focuses on regularly to
              guide behavior, cultivate certain habits, or reinforce personal
              values and goals. They act as guiding principles or reminders to
              shape one&#39;s mindset and actions.
            </p>
          </Tooltip>
        </h6>
        <PillListOfItems<Mantra>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="mantra"
          parentId={parentId}
        />
      </div>
    )
  );
}
