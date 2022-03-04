import React from "react";

import { GameContext } from "../GameContext";
import { theme } from "../Theme";

export const TRANSITION_DURATION = 600;

const styles = {
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "1 / 1",
    fontWeight: "bold",
    userSelect: "none",
    fontSize: "1rem",
    perspective: 1000,
  },
  inner: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: `transform ${TRANSITION_DURATION}ms`,
    transformStyle: "preserve-3d",
  },
  letter: {
    boxSizing: "border-box",
    position: "absolute",
    backfaceVisibility: "hidden",
    border: `2px solid ${theme.palette.outline}`,
    fill: theme.palette.text,
  },
  letterBack: {
    border: "none",
    transform: "rotateY(180deg)",
    fill: "white",
  },
  fixed: {
    transform: "rotateY(180deg)",
  },
};

function Letter({ letter, style }) {
  return (
    <svg viewBox="0 0 24 24" height="100%" style={style}>
      <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle">
        {letter}
      </text>
    </svg>
  );
}

export function Tile({ letter, index, rowIndex, fixed, green, yellow }) {
  const { guesses, theme } = React.useContext(GameContext);
  const guess = guesses[rowIndex];
  const rowIsFull = guess && guess.length === 5;
  const backStyle = { ...styles.letter, ...styles.letterBack };
  const innerStyle = fixed
    ? { ...styles.inner, ...styles.fixed }
    : { ...styles.inner };
  innerStyle.transitionDelay = `${TRANSITION_DURATION * index * 0.5}ms`;

  const handleClick = () => {
    if (rowIsFull) {
      window.open(
        `https://www.dict.cc/?s=${guess.toLowerCase()}`,
        "_blank",
        "noopener noreferrer"
      );
    }
  };

  if (green) {
    backStyle.background = theme.palette.green;
  } else if (yellow) {
    backStyle.background = theme.palette.yellow;
  } else if (fixed) {
    backStyle.background = theme.palette.grey;
  }

  if (rowIsFull) {
    innerStyle.cursor = "pointer";
  }

  return (
    <div onClick={handleClick} style={styles.root}>
      <div style={innerStyle}>
        <Letter letter={letter} style={styles.letter} />
        <Letter letter={letter} style={backStyle} />
      </div>
    </div>
  );
}
