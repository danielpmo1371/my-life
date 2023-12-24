import React from "react";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaProjectDiagram,
  FaRegCircle,
} from "react-icons/fa";
import PillButton from "./PillButton";
import useModalStore from "@/app/stores/editModalStore";

export type ListItemType = "mantra" | "todo" | "project" | "highLevelGoals";

function PillListItem(props: {
  checked?: boolean;
  emoji?: string;
  title: string;
  type?: ListItemType;
}) {
  const { checked, emoji, title, type } = props;
  const { setModalChildComponent, openModal } = useModalStore();

  const iconStyle = {
    marginRight: "0px",
  };

  const titleStyle: React.CSSProperties = {
    flex: 1,
    height: "22px",
    borderRadius: "5px",
    backgroundColor: "#grey",
    margin: "0 10px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
    <PillButton style={{ maxWidth: "80%" }}>
      <div style={iconStyle}>
        {type === "mantra" ? (
          <FaInfoCircle />
        ) : type === "project" ? (
          <FaProjectDiagram />
        ) : checked ? (
          <FaCheckCircle />
        ) : (
          <FaRegCircle />
        )}
      </div>
      <div
        style={titleStyle}
        title={title}
        onClick={() => {
          setModalChildComponent(<p style={{ fontSize: "28px" }}>{title}</p>);
          openModal();
        }}
      >
        {title}
      </div>
      <div>{emoji ?? ""}</div>
    </PillButton>
  );
}

function getRandomBlueShade() {
  // Generate a random value for the blue component (0-255)
  const blue = Math.floor(Math.random() * 256);

  // Red and Green components are set to 0
  const color = `rgb(0, 0, ${blue})`;

  return color;
}

// function getRandomBlueShade() {
//   // Generate random values for the red and green components (0-255)
//   const red = Math.floor(Math.random() * 256);
//   const green = Math.floor(Math.random() * 256);

//   // Blue component is set to the maximum (255)
//   const blue = 255;

//   // Convert to a hexadecimal string
//   const color = `rgb(${red}, ${green}, ${blue})`;

//   return color;
// }
export default PillListItem;
