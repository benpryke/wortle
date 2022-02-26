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
  const disabled = greens.size === 5;
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

  const handleClick = React.useCallback(() => {
    const guess = guesses[guesses.length - 1];

    if (guess.length < 5) {
      const newGuesses = [...guesses];
      const newGuess = guess + letter;
      newGuesses.splice(guesses.length - 1, 1, newGuess);
      setGuesses(newGuesses);
    }
  }, [letter, guesses, setGuesses]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!disabled && event.key.toUpperCase() === letter) {
        handleClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [letter, disabled, handleClick]);

  return (
    <Key onClick={handleClick} disabled={disabled} style={style}>
      {letter}
    </Key>
  );
}

export function BackspaceKey() {
  const { guesses, setGuesses } = React.useContext(GameContext);
  const disabled = guesses[guesses.length - 1].length === 0;

  const handleClick = React.useCallback(() => {
    const guess = guesses[guesses.length - 1];

    if (guess.length > 0) {
      const newGuesses = [...guesses];
      const newGuess = guess.substr(0, guess.length - 1);
      newGuesses.splice(guesses.length - 1, 1, newGuess);
      setGuesses(newGuesses);
    }
  }, [guesses, setGuesses]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!disabled && event.key === "Backspace") {
        handleClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [disabled, handleClick]);

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

  const checkGuess = React.useCallback(() => {
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
  }, [answer, greens, setGreens, yellows, setYellows, guess]);

  const handleClick = React.useCallback(() => {
    if (guess.length === 5 && guesses.length <= 6) {
      checkGuess();
      setGuesses([...guesses, ""]);
    }
  }, [guess, guesses, setGuesses, checkGuess]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!disabled && event.key === "Enter") {
        handleClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [disabled, handleClick]);

  return (
    <Key onClick={handleClick} disabled={disabled} style={specialKeyStyle}>
      {"✔"}
    </Key>
  );
}
