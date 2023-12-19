import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useStore from "../stores/useStore";
import CustomButton from "@/components/CustomListItem";
import { getCrudFor } from "@/next_cst/crudClient";
import { useUser } from "@auth0/nextjs-auth0/client";

type Todo = {
  id?: string;
  title: string;
  order: string;
  ownerEmail: string;
};

export function TodoItems() {
  const { user } = useUser();
  const [newItem, updateNewItem] = useState<Todo>({
    title: "new todo",
    order: "999",
    ownerEmail: user?.email!,
  });
  const [data, setData] = useState<Todo[]>([]);
  const { getData, saveDataAndRefresh, deleteAndRefresh } = getCrudFor<Todo>(
    "todos",
    true
  );

  useEffect(() => {
    getData(setData);
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <h4>Todo items</h4>
      <ul>
        {data.map((t) => (
          <li
            key={t.order}
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "10px",
              alignItems: "start",
            }}
          >
            <CustomButton title={`[${t.order}] ${t.title}`} />
            <span
              style={{ margin: "5px" }}
              onClick={() => deleteAndRefresh(t, setData)}
            >
              <FaTrash />
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onChange={(e) =>
          updateNewItem({ ...newItem, title: e.currentTarget.value })
        }
        value={newItem.title}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />
      <button type="button" onClick={() => addTodo()}>
        Add
      </button>
    </div>
  );

  function addTodo(): void {
    const allIndexes = data.map((x) => x.order);
    const highestIndex = allIndexes?.sort((a, b) => b - a)[0] ?? 0;

    const index = parseInt(highestIndex) + 1;

    saveDataAndRefresh(
      {
        ...newItem,
        order: index.toString(),
        ownerEmail: user?.email!,
      },
      setData
    );
  }
}
