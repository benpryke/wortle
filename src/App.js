import React from "react";

import {
  GameContext,
  getPersistedData,
  INITIAL_PERSISTED_STATE,
  setPersistedData,
} from "./GameContext";
import { theme } from "./theme";
import {
  GlobalErrorBoundary,
  GlobalSnackbar,
  Grid,
  Header,
  Instructions,
  Keyboard,
  Stats,
} from "./components";
import { HEADER_HEIGHT } from "./components/Header";
import { chooseAnswer } from "./lib/gameplay";
import { didMissDay, isTimestampToday } from "./lib/timing";

import config from "./config.json";

/** Possible TODOs
 * Listen for window re-focus to improve reload at/after midnight
 * PWA - install button
 * Localisation
 * Create store
 * Modal show/hide animation
 * Delay key highlight until after flip animations
 * High contrast mode
 * Hard mode
 * Feedback form
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

  React.useEffect(() => {
    if (
      persisted.stats.streak > 0 &&
      didMissDay(persisted.lastFinishTimestamp)
    ) {
      const newPersisted = { ...persisted };
      newPersisted.stats = { ...newPersisted.stats, streak: 0 };
      setPersisted(newPersisted);
    }
  }, [persisted]);

  return (
    <GlobalErrorBoundary>
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
    </GlobalErrorBoundary>
  );
}
