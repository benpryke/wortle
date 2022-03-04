import React from "react";

import { GameContext } from "../GameContext";
import { theme } from "../Theme";

import config from "../config";
import { TRANSITION_DURATION } from "./Tile";

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
  background: theme.palette.key,
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
    style.background = theme.palette.disabledKey;
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
  const disabled = greens.size === 5 || guesses.length > 6;
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
    persisted,
    setPersisted,
    ui,
  } = React.useContext(GameContext);
  const guess = guesses[guesses.length - 1];
  const disabled = guess.length < 5 || config.valid.indexOf(guess) === -1;

  const checkGuess = React.useCallback(() => {
    const newGreens = new Set(greens);
    const newYellows = [...yellows];
    const newGuesses = [...guesses, ""];
    const newPersisted = { ...persisted };

    guess.split("").forEach((letter, i) => {
      if (answer[i] === letter) {
        newGreens.add(i);
      } else if (answer.includes(letter)) {
        newYellows.push(letter);
      }
    });

    if (newGreens.size === 5) {
      // Winner :D
      const wins = persisted.stats.wins + 1;
      const streak = persisted.stats.streak + 1;
      const bestStreak =
        streak > persisted.stats.bestStreak
          ? streak
          : persisted.stats.bestStreak;
      const tries = guesses.length;
      const solves = [...persisted.stats.solves];
      solves.splice(tries - 1, 1, persisted.stats.solves[tries - 1] + 1);
      newPersisted.stats = {
        ...persisted.stats,
        wins,
        streak,
        bestStreak,
        solves,
      };
      setTimeout(() => ui.setStatsOpen(true), TRANSITION_DURATION * 4);
    } else if (guesses.length === 6) {
      // Loser :(
      const losses = persisted.stats.losses + 1;
      const streak = 0;
      newPersisted.stats = { ...persisted.stats, losses, streak };
      setTimeout(() => ui.setStatsOpen(true), TRANSITION_DURATION * 4);
    }

    newPersisted.currentGame = {
      ...persisted.currentGame,
      guesses: newGuesses,
      greens: newGreens,
      yellows: newYellows,
      timestamp: Date.now(),
    };

    setGreens(newGreens);
    setYellows(newYellows);
    setGuesses(newGuesses);
    setPersisted(newPersisted);
  }, [
    answer,
    guesses,
    setGuesses,
    greens,
    setGreens,
    yellows,
    setYellows,
    guess,
    persisted,
    setPersisted,
    ui,
  ]);

  const handleClick = React.useCallback(() => {
    if (!disabled && guess.length === 5 && guesses.length <= 6) {
      checkGuess();
    }
  }, [disabled, guess, guesses, checkGuess]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  return (
    <Key onClick={handleClick} disabled={disabled} style={specialKeyStyle}>
      {"✔"}
    </Key>
  );
}
