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
      <h4>Mantras</h4>
      <h6 className="text-with-hidden-explanation">
        Mantras or Abstract mind concepts (AMCs) are items that...
        <span className="hide">
          &nbsp; are abstract in nature and represent an idea, value, pattern,
          behaviour or habit to cultivate continuously. Examples are &quot;Be
          more patient&quot;, &quot;Review calendar frequently&quot;,
          &quot;Prioritise family over work&quot;, &quot;Focus on
          retirement&quot;, &quot;Save for trip&quot;. These are phrases or
          ideas that one repeats or focuses on regularly to guide behavior,
          cultivate certain habits, or reinforce personal values and goals. They
          act as guiding principles or reminders to shape one&#39;s mindset and
          actions.
        </span>
      </h6>
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
