import React from "react";

import { Tile } from "./Tile";
import { GameContext } from "../GameContext";
import { isGreen, isYellow } from "../utils";

const styles = {
  display: "flex",
};

export function Row({ index }) {
  const { answer, guesses } = React.useContext(GameContext);
  const guess = guesses[index] || "";
  const fixed = guesses.length - 1 > index;
  const green = (index) => isGreen(answer, guess, index);
  const yellow = (index) => isYellow(answer, guess, index);

  return (
    <div style={styles}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <Tile
            key={i}
            letter={guess[i]}
            fixed={fixed}
            green={fixed && green(i)}
            yellow={fixed && !green(i) && yellow(i)}
          />
        ))}
    </div>
  );
}
