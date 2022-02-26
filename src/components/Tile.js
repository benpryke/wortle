import React from "react";
import { GameContext } from "../GameContext";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 65,
  height: 65,
  border: "2px solid lightgrey",
  boxSizing: "border-box",
  margin: 2,
  fontSize: "2rem",
  fontWeight: "bold",
  userSelect: "none",
};

const fixedStyles = {
  border: "none",
  color: "white",
};

export function Tile({ letter, fixed, green, yellow }) {
  const { theme } = React.useContext(GameContext);
  const style = fixed ? { ...styles, ...fixedStyles } : { ...styles };

  if (green) {
    style.background = theme.palette.green;
  } else if (yellow) {
    style.background = theme.palette.yellow;
  } else if (fixed) {
    style.background = theme.palette.grey;
  }

  return <div style={style}>{letter}</div>;
}
