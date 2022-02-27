import React from "react";
import { theme } from "../GameContext";

const styles = {
  fontSize: "2rem",
  border: "none",
  padding: 10,
  borderRadius: 5,
  color: "white",
  background: theme.palette.green,
};

export function Button({ onClick, style = {}, children }) {
  return (
    <button onClick={onClick} style={{ ...styles, ...style }}>
      {children}
    </button>
  );
}
