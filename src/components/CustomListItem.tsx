import React from "react";
import { FaCheckCircle, FaInfoCircle, FaRegCircle } from "react-icons/fa";
import PillButton from "./PillButton";

function CustomButton(props: {
  checked?: boolean;
  emoji?: string;
  title: string;
  type?: "focus" | "todo";
}) {
  const { checked, emoji, title, type } = props;

  const buttonStyle = {
    display: "flex",
    // alignItems: "center",
    // backgroundColor: getRandomBlueShade(), // Replace with the exact color code
    borderRadius: "20px",
    padding: "10px 20px",
    maxWidth: "200px",
    fontColor: "white",
    // margin: "auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Adjust shadow as needed
  };

  const iconStyle = {
    marginRight: "15px",
    // Add styles for the icon
  };

  const titleStyle: React.CSSProperties = {
    flex: 1,
    height: "18px",
    borderRadius: "5px",
    backgroundColor: "#grey", // Replace with the exact color code
    margin: "0 10px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    // Add styles for the slider track
  };

  const sliderThumbStyle = {
    // Add styles for the slider thumb
  };

  const crystalStyle = {
    // Add styles for the crystals
  };

  return (
    <PillButton>
      <div style={iconStyle}>
        {type === "focus" ? (
          <FaInfoCircle />
        ) : checked ? (
          <FaCheckCircle />
        ) : (
          <FaRegCircle />
        )}
      </div>{" "}
      <div style={titleStyle} title={title}>
        {title}
      </div>
      <div style={crystalStyle}>{emoji ?? ""}</div>
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
export default CustomButton;
