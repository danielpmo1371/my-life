import { useState } from "react";
import { getApiCrudClientFor } from "@/next_cst/crudClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import PillListOfItems from "./PillListOfItems";
import { Tooltip } from "react-tooltip";

type Todo = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export function TodoItems({ parentId }: { parentId?: string }) {
  const { user } = useUser();

  const state = useState<Todo[]>([]);
  const crudClient = getApiCrudClientFor<Todo>("todos", true);

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>Todo items</h4>
        <h6 className="text-with-hidden-explanation" id="todos-are">
          Todo items, are items that...
          <Tooltip anchorSelect="#todos-are" place="top">
            <p style={{ maxWidth: "250px", fontSize: "14px" }}>
              &nbsp; are concrete in nature and represent an achievable task
              that is small in size and effort. It should be able to be done in
              your day without impacting your main activities or may require
              pre-planning to mitigate their impacting. One example is
              &quot;call to book dentist&quot; and another example is
              &quot;dentist appointment&quot; - you need to ask time off of
              work. They act as reminders and give you a list to tick off. Todos
              can be ad-hoc or come from a project .
            </p>
          </Tooltip>
        </h6>
        <PillListOfItems<Todo>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="todo"
          parentId={parentId}
        />
      </div>
    )
  );
}
