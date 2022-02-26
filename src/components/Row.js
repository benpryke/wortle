import React from "react";
import { GameContext } from "../GameContext";

import { Tile } from "./Tile";

const styles = {
  display: "flex",
};

export function Row({ index }) {
  const { answer, guesses } = React.useContext(GameContext);
  const guess = guesses[index] || "";
  const fixed = guesses.length - 1 > index;
  const count = (letter, string) =>
    (string.match(new RegExp(letter, "g")) || []).length;

  const isGreen = (index) => guess[index] === answer[index];
  const isYellow = (letter, index) => {
    // Does the number of repetitions of `letter` in the answer that are green
    // use up all available repetitions of `letter`?
    const repeats = count(letter, answer);
    const greens = answer
      .split("")
      .map((c, i) => letter === c && letter === guess[i])
      .reduce((a, b) => a + b, 0);

    if (greens >= repeats) return false;

    // Is the number of repetitions of `letter` in the answer is more than the
    // number of repetitions of `letter` prior to the `index` of `letter` in
    // `guess`?
    const priors = count(letter, guess.substr(0, index));
    return priors < repeats;
  };

  return (
    <div style={styles}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <Tile
            key={i}
            letter={guess[i]}
            fixed={fixed}
            green={fixed && isGreen(i)}
            yellow={fixed && !isGreen(i) && isYellow(guess[i], i)}
          />
        ))}
    </div>
  );
}
// sagen
// kruaa
// We can highight the first a yellow because there is 1 a in the answer and it is the first instance
// We cannot highlight the second a yellow because the number of as before this position in the word is greater than the number of as in the answer
