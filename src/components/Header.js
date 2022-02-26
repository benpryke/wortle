import React from "react";
import { GameContext } from "../GameContext";

export const HEADER_HEIGHT = 45;

const styles = {
  root: {
    position: "sticky",
    top: 0,
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
    position: "absolute",
    right: 0,
    marginRight: "1rem",
  },
  action: {
    fontSize: "1.5rem",
    border: "1px solid lightgrey",
    borderRadius: "100%",
    width: "2.5rem",
    height: "2.5rem",
    userSelect: "none",
    cursor: "pointer",
  },
};

export function Header() {
  const { ui } = React.useContext(GameContext);
  const openInstructions = () => ui.setInstructionsOpen(true);
  return (
    <div style={styles.root}>
      <h1 style={styles.title}>Wortle</h1>
      <div style={styles.actions}>
        <div onClick={openInstructions} style={styles.action}>
          ?
        </div>
      </div>
    </div>
  );
}
