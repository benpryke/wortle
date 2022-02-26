import React from "react";

import {
  GameContext,
  getPersistedData,
  setPersistedData,
  theme,
} from "./GameContext";
import { Grid } from "./components/Grid";
import { Header, HEADER_HEIGHT } from "./components/Header";
import { Instructions } from "./components/Instructions";
import { Keyboard } from "./components/Keyboard";

import config from "./config.json";

/**
 * TODOS
 *
 * Statistics
 * Winning
 * Persist game state
 * Animations
 */

const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: `calc(100vh - ${HEADER_HEIGHT + 1}px)`,
};

function chooseAnswer() {
  const start = new Date("Feb 26 2022").getTime();
  const now = new Date().getTime();
  const elapsedDays = Math.floor((now - start) / (24 * 60 * 60 * 1000));
  return config.answers[elapsedDays % config.answers.length];
}

export function App() {
  const answer = chooseAnswer();
  const [guesses, setGuesses] = React.useState([""]);
  const [greens, setGreens] = React.useState(new Set());
  const [yellows, setYellows] = React.useState([]);
  const [persisted, setPersisted] = React.useState(getPersistedData());
  const [instructionsOpen, setInstructionsOpen] = React.useState(
    persisted.firstTime
  );

  const handleSetPersisted = (data) => {
    setPersisted(data);
    setPersistedData(data);
  };

  const state = {
    answer,
    guesses,
    setGuesses,
    greens,
    setGreens,
    yellows,
    setYellows,
    theme,
    persisted,
    setPersisted: handleSetPersisted,
    ui: {
      instructionsOpen,
      setInstructionsOpen,
    },
  };

  return (
    <GameContext.Provider value={state}>
      <Instructions />
      <Header />
      <div style={styles}>
        <Grid />
        <Keyboard />
      </div>
    </GameContext.Provider>
  );
}
