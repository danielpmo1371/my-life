import PillListItem, { ListItemType } from "@/components/PillListItem";
import { BaseDBType, CrudClientType, UserProfile } from "@/next_cst/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaEdit, FaExternalLinkSquareAlt, FaTrash } from "react-icons/fa";
import "./PillListOfItems.css";
import useModalStore from "../stores/modalStore";
import TabbedEditComponent from "./TabbedEditComponent";
import Link from "next/link";
import { useMutation, useQuery } from "react-query";

type PillListOfItemsProps<T> = {
  crudClient: CrudClientType<T>;
  user: UserProfile;
  state: [T[], Dispatch<SetStateAction<T[]>>];
  typeOfListItem: ListItemType;
  parentId?: string;
  isGlobal?: boolean;
};

export default function PillListOfItems<T extends BaseDBType>(
  props: PillListOfItemsProps<T>
) {
  const { crudClient, user, state, typeOfListItem, parentId, isGlobal } = props;
  const { getData, saveItem, deleteItem, apiRoute } = crudClient;

  const [newItem, updateNewItem] = useState<BaseDBType>({
    title: "",
    order: "999",
    ownerEmail: user?.email!,
  });

  const { openModal, closeModal, setModalChildComponent } = useModalStore();
  const query = useQuery<T[]>(
    // (typeOfListItem + parentId + (isGlobal?.toString() ?? "false")).toString(),
    typeOfListItem,
    () => getData(parentId, isGlobal),
    { staleTime: 60 * 1000, cacheTime: 60 * 1000 } // 1 minute
  );
  const { isLoading, isError, data, error, refetch } = query;

  const saveMutation = useMutation(addItem, {
    onSuccess: () => {
      query.refetch();
    },
  });

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: () => {
      query.refetch();
    },
  });

  async function addItem() {
    const allIndexes = data?.map((x) => x.order);
    const highestIndex =
      allIndexes?.sort((a, b) => b.localeCompare(a))[0] ?? "0";

    const index = parseInt(highestIndex) + 1;

    const result = await saveItem({
      ...newItem,
      order: index.toString(),
      ownerEmail: user?.email!,
      parentId,
    } as T);
    updateNewItem({ ...newItem, title: "" });
    return result;
  }

  return (
    <>
      {isLoading && <p className="flash">Refreshing</p>}
      <button type="button" onClick={() => refetch()}>
        Refresh
      </button>
      <ul>
        {data?.map((t) => (
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
            {(!deleteMutation.isLoading ||
              deleteMutation.variables?.id !== t.id) && (
              <span
                style={iconStyle}
                onClick={() => {
                  deleteMutation.mutate(t);
                }}
              >
                <FaTrash />
              </span>
            )}
            {deleteMutation.isLoading &&
              deleteMutation.variables?.id === t.id && (
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
                  <TabbedEditComponent
                    originalValue={t}
                    apiEntity={apiRoute}
                    onSave={() => {
                      refetch().then(() => closeModal());
                    }}
                  />
                );
                openModal();
              }}
            />
            <Link href={`/canvas/${typeOfListItem}/${t.id}`} style={iconStyle}>
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
              if (e.key === "Enter") saveMutation.mutate();
            }}
          />
          <span className="label">New item</span>
          <span className="focus-bg"></span>
        </label>
      </div>

      {!saveMutation.isLoading && (
        <button
          type="button"
          className="button-10"
          role="button"
          onClick={() => saveMutation.mutate}
          disabled={false}
        >
          Add
        </button>
      )}
      {saveMutation.isLoading && (
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
