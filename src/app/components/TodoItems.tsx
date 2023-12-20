import { useState } from "react";
import { getCrudFor } from "@/next_cst/crudClient";
import { useUser } from "@auth0/nextjs-auth0/client";
import PillListOfItems from "./PillListOfItems";

type Todo = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export function TodoItems() {
  const { user } = useUser();

  const state = useState<Todo[]>([]);
  const crudClient = getCrudFor<Todo>("todos", true);

  return (
    user && (
      <div style={{ flex: 1 }}>
        <h4>Todo items</h4>
        <h6 className="text-with-hidden-explanation">
          Todo items, are items that...
          <span className="hide">
            &nbsp; are concrete in nature and represent an achieveable task that
            is small in size and effort. It should be able to be done in your
            day without impacting your main activities or may require
            pre-planning to mitigate their impating. One example is "call to
            book dentist" and another example is "dentist appointment" - you
            need to ask time off of work. They act as reminders and give you a
            list to tick off. Todos can be ad-hoc or come from a project.
          </span>
        </h6>
        <PillListOfItems<Todo>
          crudClient={crudClient}
          user={user}
          state={state}
          typeOfListItem="todo"
        />
      </div>
    )
  );
}
