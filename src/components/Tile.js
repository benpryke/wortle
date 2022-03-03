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
  const { guesses, theme } = React.useContext(GameContext);
  const style = fixed ? { ...styles, ...fixedStyles } : { ...styles };

  const handleClick = () => {
    const guess = guesses[guesses.length - 1];

    if (guess.length === 5) {
      window.open(
        `https://www.dict.cc/?s=${guess.toLowerCase()}`,
        "_blank",
        "noopener noreferrer"
      );
    }
  };

  if (green) {
    style.background = theme.palette.green;
  } else if (yellow) {
    style.background = theme.palette.yellow;
  } else if (fixed) {
    style.background = theme.palette.grey;
  }

  return (
    <div onClick={handleClick} style={styles}>
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
