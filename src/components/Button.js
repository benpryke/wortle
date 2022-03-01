import React from "react";
import { theme } from "../Theme";

const styles = {
  fontSize: "2rem",
  border: "none",
  padding: 10,
  borderRadius: 5,
  color: "white",
  background: theme.palette.green,
  cursor: "pointer",
};

export function Button({ onClick, style = {}, children }) {
  return (
    <button onClick={onClick} style={{ ...styles, ...style }}>
      {children}
    </button>
  );
}
