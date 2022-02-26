import React from "react";
import { GameContext } from "../GameContext";

import config from "../config";

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "9%",
  maxWidth: 50,
  maxHeight: 80,
  margin: 2,
  borderRadius: "5px",
  cursor: "pointer",
  userSelect: "none",
  fontSize: "1rem",
  lineHeight: "4rem",
  fontWeight: "500",
  background: "#d9d9d9",
};

const specialKeyStyle = {
  width: "14%",
  maxWidth: 80,
  fontSize: "1.5rem",
};

export function Key({ onClick, disabled = false, style = {}, children }) {
  const handleClick = (event) => !disabled && onClick(event);
  style = { ...styles, ...style };

  if (disabled) {
    style.background = "#f3f3f3";
  }

  return (
    <div onClick={handleClick} style={style}>
      {children}
    </div>
  );
}

export function LetterKey({ letter }) {
  const { answer, guesses, setGuesses, greens, yellows, theme } =
    React.useContext(GameContext);
  const style = {};
  const isGreen = answer
    .split("")
    .map((c, i) => c === letter && greens.has(i))
    .some((x) => x === true);

  if (isGreen) {
    style.background = theme.palette.green;
  } else {
    const isYellow = yellows.indexOf(letter) >= 0;
    if (isYellow) {
      style.background = theme.palette.yellow;
    } else {
      const isGrey = guesses
        .map((guess, i) => i < guesses.length - 1 && guess.includes(letter))
        .some((x) => x === true);

      if (isGrey) {
        style.background = theme.palette.grey;
      }
    }
  }

  const handleClick = () => {
    const guess = guesses[guesses.length - 1];

    if (guess.length < 5) {
      const newGuesses = [...guesses];
      const newGuess = guess + letter;
      newGuesses.splice(guesses.length - 1, 1, newGuess);
      setGuesses(newGuesses);
    }
  };

  return (
    <Key onClick={handleClick} style={style}>
      {letter}
    </Key>
  );
}

export function BackspaceKey() {
  const { guesses, setGuesses } = React.useContext(GameContext);
  const disabled = guesses[guesses.length - 1].length === 0;

  const handleClick = () => {
    const guess = guesses[guesses.length - 1];

    if (guess.length > 0) {
      const newGuesses = [...guesses];
      const newGuess = guess.substr(0, guess.length - 1);
      newGuesses.splice(guesses.length - 1, 1, newGuess);
      setGuesses(newGuesses);
    }
  };

  return (
    <Key onClick={handleClick} disabled={disabled} style={specialKeyStyle}>
      {"⬅"}
    </Key>
  );
}

export function EnterKey() {
  const {
    answer,
    guesses,
    setGuesses,
    greens,
    setGreens,
    yellows,
    setYellows,
  } = React.useContext(GameContext);
  const guess = guesses[guesses.length - 1];
  const disabled = guess.length < 5 || config.valid.indexOf(guess) === -1;

  const checkGuess = () => {
    const newGreens = new Set(greens);
    const newYellows = [...yellows];

    guess.split("").forEach((letter, i) => {
      if (answer[i] === letter) {
        newGreens.add(i);
      } else if (answer.includes(letter)) {
        // TODO
        // (temp.match(/is/g) || []).length
        newYellows.push(letter);
      }
    });

    setGreens(newGreens);
    setYellows(newYellows);
  };

  const handleClick = () => {
    if (guess.length === 5 && guesses.length <= 6) {
      checkGuess();
      setGuesses([...guesses, ""]);
    }
  };

  return (
    <Key onClick={handleClick} disabled={disabled} style={specialKeyStyle}>
      {"✔"}
    </Key>
  );
}