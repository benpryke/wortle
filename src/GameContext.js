import React from "react";

import { theme } from "./theme";
import { normaliseObject } from "./lib/object";

const PERSISTED_KEY = "persisted";

export const INITIAL_PERSISTED_STATE = {
  firstTime: true,
  lastFinishTimestamp: Date.now(),
  stats: {
    wins: 0,
    losses: 0,
    solves: [0, 0, 0, 0, 0, 0],
    streak: 0,
    bestStreak: 0,
  },
  currentGame: {
    timestamp: Date.now(),
    guesses: [""],
    greens: new Set(),
    yellows: [],
  },
};

const INITIAL_STATE = {
  answer: "",
  guesses: [],
  setGuesses: null,
  greens: [],
  setGreens: null,
  yellows: [],
  setYellows: null,
  theme,
  persisted: getPersistedData(),
  setPersistedData: null,
  ui: {
    instructionsOpen: false,
    setInstructionsOpen: null,
    statsOpen: false,
    setStatsOpen: null,
    snackbarOpen: false,
    snackbarMsg: null,
    openSnackbar: null,
  },
};

export function getPersistedData() {
  const data =
    JSON.parse(window.localStorage.getItem(PERSISTED_KEY)) ??
    INITIAL_PERSISTED_STATE;
  data.currentGame.greens = new Set(data.currentGame.greens);
  return normaliseObject(data, INITIAL_PERSISTED_STATE);
}

export function setPersistedData(data) {
  const newData = { ...data };
  newData.currentGame = { ...newData.currentGame };
  newData.currentGame.greens = [...newData.currentGame.greens];
  return window.localStorage.setItem(PERSISTED_KEY, JSON.stringify(newData));
}

export const GameContext = React.createContext(INITIAL_STATE);
