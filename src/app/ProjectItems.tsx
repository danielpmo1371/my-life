import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import CustomButton from "@/components/CustomListItem";

type Project = {
  title: string;
  index: number;
};

export default function ProjectItems() {
  const [newItem, updateNewItem] = useState<Project>({
    title: "new project",
    index: 999,
  });

  const projectsState = {
    projectItems: [
      {
        title: "Prooj 1 ",
        index: 1,
      },
      {
        title: "Second proj",
        index: 2,
      },
    ],
  };

  return (
    <div style={{ flex: 1 }}>
      <h4>Project items</h4>
      <ul>
        {projectsState?.projectItems.map((t) => (
          <li
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
              onClick={() => console.log("projectsState.removeItem(t)")}
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
    const allIndexes = projectsState?.projectItems.map((x) => x.index);
    const highestIndex = allIndexes?.sort((a, b) => b - a)[0] ?? 0;

    const index = highestIndex + 1;

    // return projectsState?.addItem({
    //   ...newItem,
    //   index,
    // });
  }
}
