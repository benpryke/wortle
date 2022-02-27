import React from "react";
import { GameContext } from "../GameContext";

export const HEADER_HEIGHT = 45;

const styles = {
  root: {
    width: "100vw",
    height: HEADER_HEIGHT,
    fontFamily: "Sura",
    textAlign: "center",
    borderBottom: "1px solid lightgrey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    display: "flex",
    position: "absolute",
    right: 0,
  },
  action: {
    marginRight: "0.5rem",
    fontSize: "1.5rem",
    width: "2rem",
    height: "2.5rem",
    userSelect: "none",
    cursor: "pointer",
  },
};

export function Header() {
  const { ui } = React.useContext(GameContext);
  const openInstructions = () => ui.setInstructionsOpen(true);
  const openStats = () => ui.setStatsOpen(true);
  return (
    <div style={styles.root}>
      <h1 style={styles.title}>Wortle</h1>
      <div style={styles.actions}>
        <div onClick={openStats} style={styles.action}>
          📊
        </div>
        <div onClick={openInstructions} style={styles.action}>
          ?
        </div>
      </div>
    </div>
  );
}
