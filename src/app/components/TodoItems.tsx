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
        <PillListOfItems<Todo>
          crudClient={crudClient}
          user={user}
          state={state}
        />
      </div>
    )
  );
}
