import React from "react";

const PERSISTED_KEY = "persisted";

const darkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const lightPalette = {
  background: "#fff",
  text: "#222",
  key: "#d9d9d9",
  disabledKey: "#f3f3f3",
  green: "#5cad48",
  yellow: "#c9b545",
  grey: "#999999",
  outline: "lightgrey",
};

const darkPalette = {
  background: "#333333",
  text: "#fff",
  key: "#808080",
  disabledKey: "#404040",
  green: "#539b41",
  yellow: "#b8a223",
  grey: "#595959",
  outline: "#737373",
};

export const theme = {
  palette: darkMode ? darkPalette : lightPalette,
};

export const INITIAL_PERSISTED_STATE = {
  firstTime: true,
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
  return data;
}

export function setPersistedData(data) {
  const newData = { ...data };
  newData.currentGame = { ...newData.currentGame };
  newData.currentGame.greens = [...newData.currentGame.greens];
  return window.localStorage.setItem(PERSISTED_KEY, JSON.stringify(newData));
}

export const GameContext = React.createContext(INITIAL_STATE);
