import React from "react";

export const theme = {
  palette: {
    green: "#4bd841",
    yellow: "#c9b545",
    grey: "#999999",
  },
};

export const GameContext = React.createContext({
  answer: "",
  guesses: [],
  setGuesses: null,
  greens: [],
  setGreens: [],
  yellows: [],
  setYellows: [],
  theme,
});
