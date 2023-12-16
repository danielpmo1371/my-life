"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import CustomButton from "@/components/CustomListItem";
import { useUser } from "@auth0/nextjs-auth0/client";

type Project = {
  title: string;
  order: string;
  ownerEmail: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const getProjectsUrl = `${BASE_URL}api/projects`;

async function getData() {
  return await fetch(getProjectsUrl).then(async (response) => {
    return await response.json().then((data) => {
      return data;
    });
  });
}

async function saveDataAndRefresh(
  newProject: Project,
  setData: Dispatch<SetStateAction<Project[]>>
) {
  return await fetch(getProjectsUrl, {
    method: "POST",
    body: JSON.stringify(newProject),
  }).then(async (response) => {
    return await response.json().then((data) => {
      console.log(JSON.stringify(data));
      setData(data);
      return data;
    });
  });
}

export default function ProjectItems() {
  const { user } = useUser();
  const [data, setData] = useState([] as Project[]);

  useEffect(() => {
    getData().then((x) => {
      setData(x);
    });
  }, []);

  const [newItem, updateNewItem] = useState<Project>({
    title: "new project",
    order: "999",
    ownerEmail: user?.email!,
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
    const allIndexes = data?.map((x) => x.order);
    const highestIndex = allIndexes?.sort((a, b) => b.localeCompare(a))[0] ?? 0;

    const index = parseInt(highestIndex) + 1;

    saveDataAndRefresh(
      {
        ...newItem,
        ownerEmail: user?.email!,
        order: index.toString(),
      },
      setData
    );
  }
}
