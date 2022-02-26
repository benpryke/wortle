import React from "react";
import { GameContext } from "../GameContext";

import { Tile } from "./Tile";

const styles = {
  display: "flex",
};

export function Row({ index }) {
  const { answer, guesses } = React.useContext(GameContext);
  const word = guesses[index] || "";
  const fixed = guesses.length - 1 > index;
  return (
    <div style={styles}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <Tile
            key={i}
            letter={word[i]}
            fixed={fixed}
            green={fixed && word[i] === answer[i]}
            yellow={fixed && answer.includes(word[i])}
          />
        ))}
    </div>
  );
}
