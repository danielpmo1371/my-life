import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useFocusStore from "../stores/focusStore";
import useStore from "../stores/useStore";
import ListItem from "@/components/ListItem";

export function FocusItems() {
  const [newItem, updateNewItem] = useState("new focus");
  const focusState = useStore(useFocusStore, (state) => state);

  return (
    <div style={{ flex: 1 }}>
      <h4>Focus items</h4>
      <ul>
        {focusState?.focusItems.map((i) => (
          <li
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "10px",
              alignItems: "start",
            }}
          >
            <ListItem title={`${i}`} type="focus" />
            <span
              style={{ margin: "5px" }}
              onClick={() => focusState.removeItem(i)}
            >
              <FaTrash />
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onChange={(e) => updateNewItem(e.currentTarget.value)}
        value={newItem}
        onKeyDown={(e) => {
          if (e.key === "Enter") focusState?.addItem(newItem);
        }}
      />
      <button type="button" onClick={() => focusState?.addItem(newItem)}>
        Add
      </button>
    </div>
  );
}
