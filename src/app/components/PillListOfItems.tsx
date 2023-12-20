import ListItem from "@/components/ListItem";
import { BaseDBType, CrudClientType, UserProfile } from "@/next_cst/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./PillListOfItems.css";

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
  const [loading, setLoading] = useState<{
    del: { [key: string]: boolean };
    get: boolean;
    save: boolean;
  }>({ del: {}, get: false, save: false });

  const [newItem, updateNewItem] = useState<BaseDBType>({
    title: "new todo",
    order: "999",
    ownerEmail: user?.email!,
  });

  useEffect(() => {
    setLoading({ ...loading, get: true });
    getData(setData).then(() => setLoading({ ...loading, get: false }));
  }, []);

  function addItem(): void {
    const allIndexes = data.map((x) => x.order);
    const highestIndex = allIndexes?.sort((a, b) => b.localeCompare(a))[0] ?? 0;

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
      {loading.get && <p className="flash">Refreshing</p>}
      <ul>
        {data.map((t) => (
          <li
            key={t.order}
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "7px",
              alignItems: "center",
            }}
          >
            <ListItem title={`[${t.order}] ${t.title}`} />
            <span
              style={{
                margin: "5px",
                alignItems: "center",
                alignSelf: "center",
              }}
              onClick={() => {
                setLoading({
                  ...loading,
                  del: { ...loading.del, [t.order]: true },
                });
                deleteAndRefresh(t, setData).then(() => {
                  setLoading({
                    ...loading,
                    del: { ...loading.del, [t.order]: false },
                  });
                });
              }}
            >
              <FaTrash />
            </span>
            {(true || loading.del[t.order]) && (
              <p
                className="flash"
                style={{ alignItems: "center", alignSelf: "center" }}
              >
                ...
              </p>
            )}
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
