import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import React, { HTMLAttributes, ReactNode, ReactPropTypes } from "react";

const PillButton = ({
  children,
  style,
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) => {
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

  return <div style={{ ...buttonStyle, ...style }}>{children}</div>;
};

export default PillButton;
