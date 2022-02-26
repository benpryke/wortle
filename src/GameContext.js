import React from "react";

const PERSISTED_KEY = "persisted";

export const theme = {
  palette: {
    green: "#4bd841",
    yellow: "#c9b545",
    grey: "#999999",
  },
};

const INITIAL_PERSISTED_STATE = {
  firstTime: true,
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
  },
};

export function getPersistedData() {
  return (
    JSON.parse(window.localStorage.getItem(PERSISTED_KEY)) ??
    INITIAL_PERSISTED_STATE
  );
}

export function setPersistedData(data) {
  return window.localStorage.setItem(PERSISTED_KEY, JSON.stringify(data));
}

export const GameContext = React.createContext(INITIAL_STATE);
