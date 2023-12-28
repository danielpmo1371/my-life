import PillListItem, { ListItemType } from "@/components/ListItem";
import { BaseDBType, CrudClientType, UserProfile } from "@/next_cst/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaEdit, FaExternalLinkSquareAlt, FaTrash } from "react-icons/fa";
import "./PillListOfItems.css";
import useModalStore from "../stores/modalStore";
import TabbedEditComponent from "./TabbedEditComponent";
import Link from "next/link";

type PillListOfItemsProps<T> = {
  crudClient: CrudClientType<T>;
  user: UserProfile;
  state: [T[], Dispatch<SetStateAction<T[]>>];
  typeOfListItem: ListItemType;
  parentId?: string;
};

export default function PillListOfItems<T extends BaseDBType>(
  props: PillListOfItemsProps<T>
) {
  const { crudClient, user, state, typeOfListItem, parentId } = props;
  const { getData, saveDataAndRefresh, deleteAndRefresh, apiRoute } =
    crudClient;
  const [data, setData] = state;
  const [loading, setLoading] = useState<{
    del: { [key: string]: boolean };
    get: boolean;
    save: boolean;
  }>({ del: {}, get: false, save: false });

  const [newItem, updateNewItem] = useState<BaseDBType>({
    title: "",
    order: "999",
    ownerEmail: user?.email!,
  });

  const { openModal, setModalChildComponent } = useModalStore();

  useEffect(() => {
    setLoading({ ...loading, get: true });
    getData(setData, parentId).then(() =>
      setLoading({ ...loading, get: false })
    );
  }, []);

  async function addItem() {
    const allIndexes = data.map((x) => x.order);
    const highestIndex = allIndexes?.sort((a, b) => b.localeCompare(a))[0] ?? 0;

    const index = parseInt(highestIndex) + 1;

    const result = await saveDataAndRefresh(
      {
        ...newItem,
        order: index.toString(),
        ownerEmail: user?.email!,
        parentId,
      } as T,
      setData
    );
    updateNewItem({ ...newItem, title: "" });
    return result;
  }

  const saveItem = () => {
    setLoading({
      ...loading,
      save: true,
    });
    addItem().then(() => {
      setLoading({
        ...loading,
        save: false,
      });
      updateNewItem({ ...newItem, title: "" });
    });
  };

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
            <PillListItem
              title={`[${t.order}] ${t.title}`}
              type={typeOfListItem}
            />
            <span
              style={iconStyle}
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
            {loading.del[t.order] && (
              <p
                className="flash"
                style={{ alignItems: "center", alignSelf: "center" }}
              >
                ...
              </p>
            )}
            <FaEdit
              style={iconStyle}
              onClick={() => {
                setModalChildComponent(
                  <TabbedEditComponent originalValue={t} apiEntity={apiRoute} />
                );
                openModal();
              }}
            />
            <Link href={`/canvas/${t.id}`} style={iconStyle}>
              <FaExternalLinkSquareAlt color="black" />
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <label htmlFor="inp" className="inp">
          <p></p>
          <input
            type="text"
            id="inp"
            placeholder="&nbsp;"
            onChange={(e) =>
              updateNewItem({ ...newItem, title: e.currentTarget.value })
            }
            value={newItem.title}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveItem();
            }}
          />
          <span className="label">New item</span>
          <span className="focus-bg"></span>
        </label>
      </div>

      {!loading.save && (
        <button
          type="button"
          className="button-10"
          role="button"
          onClick={saveItem}
          disabled={loading.save ? true : false}
        >
          Add
        </button>
      )}
      {loading.save && (
        <p
          className="flash"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            alignSelf: "end",
            margin: "5px",
            marginLeft: "auto",
          }}
        >
          ...
        </p>
      )}
    </>
  );
}

const iconStyle = {
  margin: "5px",
  alignItems: "center",
  alignSelf: "center",
};
