import React from "react";

import { GameContext } from "../GameContext";
import { theme } from "../Theme";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: `2px solid ${theme.palette.outline}`,
  boxSizing: "border-box",
  position: "relative",
  aspectRatio: "1 / 1",
  fontWeight: "bold",
  userSelect: "none",
  fontSize: "1rem",
};

const fixedStyles = {
  border: "none",
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

  return (
    <div style={style}>
      <svg viewBox="0 0 24 24" height="100%">
        <text
          x="50%"
          y="57%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={fixed ? "white" : theme.palette.text}
        >
          {letter}
        </text>
      </svg>
    </div>
  );
}
