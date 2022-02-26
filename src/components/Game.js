import React from "react";

import { Grid } from "./Grid";
import { Keyboard } from "./Keyboard";
import { GameContext, theme } from "../GameContext";

import config from "../config.json";
import { HEADER_HEIGHT } from "./Header";

const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: `calc(100vh - ${HEADER_HEIGHT + 1}px)`,
};

export function Game() {
  const answer = config.answers[0];
  const [guesses, setGuesses] = React.useState([""]);
  const [greens, setGreens] = React.useState(new Set());
  const [yellows, setYellows] = React.useState([]);

  const state = {
    answer,
    guesses,
    setGuesses,
    greens,
    setGreens,
    yellows,
    setYellows,
    theme,
  };

  return (
    <GameContext.Provider value={state}>
      <div style={styles}>
        <Grid />
        <Keyboard />
      </div>
    </GameContext.Provider>
  );
}
