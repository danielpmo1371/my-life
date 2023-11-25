import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useStore from "./stores/useStore";
import useTodosStore, { Todo } from "./stores/todosStore";
import CustomButton from "@/components/CustomListItem";
import { Draggable } from "react-drag-reorder";

export function TodoItems() {
  const [newItem, updateNewItem] = useState<Todo>({
    title: "new todo",
    index: 999,
  });
  const todosState = useStore(useTodosStore, (state) => state);

  return (
    <div style={{ flex: 1 }}>
      <h4>Todo items</h4>
      {!todosState?.todosItems ? (
        <div>loading...</div>
      ) : (
        <Draggable>
          {todosState?.todosItems.map((t) => (
            <div
              key={t.index}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
                alignItems: "start",
              }}
            >
              <CustomButton title={`[${t.index}] ${t.title}`} />
              <span
                style={{ margin: "5px" }}
                onClick={() => todosState.removeItem(t)}
              >
                <FaTrash />
              </span>
            </div>
          ))}
        </Draggable>
      )}
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
    const allIndexes = todosState?.todosItems.map((x) => x.index);
    const highestIndex = allIndexes?.sort((a, b) => b - a)[0] ?? 0;

    const index = highestIndex + 1;

    return todosState?.addItem({
      ...newItem,
      index,
    });
  }
}
