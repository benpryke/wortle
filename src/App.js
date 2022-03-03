import React from "react";

import {
  GameContext,
  getPersistedData,
  INITIAL_PERSISTED_STATE,
  setPersistedData,
} from "./GameContext";
import { theme } from "./Theme";
import { Grid } from "./components/Grid";
import { Header, HEADER_HEIGHT } from "./components/Header";
import { Instructions } from "./components/Instructions";
import { Keyboard } from "./components/Keyboard";

import config from "./config.json";
import { Stats } from "./components/Stats";
import { chooseAnswer, isTimestampToday } from "./utils";
import { GlobalSnackbar } from "./components/GlobalSnackbar";

/**
 * TODOS
 *
 * Animations
 */

const SNACKBAR_DELAY = 5000;

const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: `calc(100% - ${HEADER_HEIGHT + 1}px)`,
  color: theme.palette.text,
};

export function App() {
  const answer = chooseAnswer(config);
  const persistedData = getPersistedData();
  const rehydrate = isTimestampToday(persistedData.currentGame.timestamp);
  const [guesses, setGuesses] = React.useState(
    rehydrate
      ? persistedData.currentGame.guesses
      : INITIAL_PERSISTED_STATE.currentGame.guesses
  );
  const [greens, setGreens] = React.useState(
    rehydrate
      ? persistedData.currentGame.greens
      : INITIAL_PERSISTED_STATE.currentGame.greens
  );
  const [yellows, setYellows] = React.useState(
    rehydrate
      ? persistedData.currentGame.yellows
      : INITIAL_PERSISTED_STATE.currentGame.yellows
  );
  const [persisted, setPersisted] = React.useState(persistedData);
  const [statsOpen, setStatsOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const [instructionsOpen, setInstructionsOpen] = React.useState(
    persisted.firstTime
  );

  const openSnackbar = (msg) => {
    setSnackbarOpen(true);
    setSnackbarMsg(msg);
    setTimeout(() => setSnackbarOpen(false), SNACKBAR_DELAY);
  };

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
      statsOpen,
      setStatsOpen,
      instructionsOpen,
      setInstructionsOpen,
      snackbarOpen,
      snackbarMsg,
      openSnackbar,
    },
  };

  return (
    <GameContext.Provider value={state}>
      <Instructions />
      <Stats />
      <Header />
      <div style={styles}>
        <Grid />
        <Keyboard />
      </div>
      <GlobalSnackbar />
    </GameContext.Provider>
  );
}
