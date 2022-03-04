import React from "react";

import { GameContext } from "../GameContext";
import { Tile } from "./Tile";
import { isGreen, isYellow } from "../utils";

export function Row({ index }) {
  const { answer, guesses } = React.useContext(GameContext);
  const guess = guesses[index] || "";
  const fixed = guesses.length - 1 > index;
  const green = (index) => isGreen(answer, guess, index);
  const yellow = (index) => isYellow(answer, guess, index);

  return Array(5)
    .fill()
    .map((_, i) => (
      <Tile
        key={i}
        index={i}
        rowIndex={index}
        letter={guess[i]}
        fixed={fixed}
        green={fixed && green(i)}
        yellow={fixed && !green(i) && yellow(i)}
      />
    ));
}
