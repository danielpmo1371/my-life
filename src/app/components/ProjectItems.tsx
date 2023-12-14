"use client";
import { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import CustomButton from "@/components/CustomListItem";

type Project = {
  title: string;
  order: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const getProjectsUrl = `${BASE_URL}api/project`;

async function getData() {
  return await fetch(getProjectsUrl).then(async (response) => {
    return await response.json().then((data) => {
      console.log(getProjectsUrl);
      console.log(JSON.stringify(data));
      return data;
    });
  });
}

export default function ProjectItems() {
  const [data, setData] = useState([] as Project[]);

  useEffect(() => {
    getData().then((x) => {
      console.log(x);
      setData(x);
    });
  }, []);
  console.log(JSON.stringify(data));

  const [newItem, updateNewItem] = useState<Project>({
    title: "new project",
    order: "999",
  });

  const projectsState = {
    projectItems: [
      {
        title: "Prooj 1 ",
        order: "1",
      },
      {
        title: "Second proj",
        order: "2",
      },
    ],
  };

  return (
    <div style={{ flex: 1 }}>
      <h4>Project items</h4>
      {/* <p>{JSON.stringify(data.current)}</p> */}
      <ul>
        {data?.map((t) => (
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
    const allIndexes = projectsState?.projectItems.map((x) => x.order);
    const highestIndex = allIndexes?.sort((a, b) => b.localeCompare(a))[0] ?? 0;

    const index = highestIndex + 1;

    // return projectsState?.addItem({
    //   ...newItem,
    //   index,
    // });
  }
}
