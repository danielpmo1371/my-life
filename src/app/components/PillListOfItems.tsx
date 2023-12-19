import CustomButton from "@/components/CustomListItem";
import { BaseDBType, CrudClientType, UserProfile } from "@/next_cst/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

type PillListOfItemsProps<T> = {
  crudClient: CrudClientType<T>;
  user: UserProfile;
  state: [T[], Dispatch<SetStateAction<T[]>>];
};

export default function PillListOfItems<T extends BaseDBType>(
  props: PillListOfItemsProps<T>
) {
  const { crudClient, user, state } = props;
  const { getData, saveDataAndRefresh, deleteAndRefresh } = crudClient;
  const [data, setData] = state;

  const [newItem, updateNewItem] = useState<BaseDBType>({
    title: "new todo",
    order: "999",
    ownerEmail: user?.email!,
  });

  useEffect(() => {
    getData(setData);
  }, []);

  function addItem(): void {
    const allIndexes = data.map((x) => x.order);
    const highestIndex = allIndexes?.sort((a, b) => b - a)[0] ?? 0;

    const index = parseInt(highestIndex) + 1;

    saveDataAndRefresh(
      {
        ...newItem,
        order: index.toString(),
        ownerEmail: user?.email!,
      } as T,
      setData
    );
  }

  return (
    <>
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
          if (e.key === "Enter") addItem();
        }}
      />
      <button type="button" onClick={() => addItem()}>
        Add
      </button>
    </>
  );
}
