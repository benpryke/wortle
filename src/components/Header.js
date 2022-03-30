import React from "react";
import { GameContext } from "../GameContext";
import { theme } from "../theme";

export const HEADER_HEIGHT = 45;

const styles = {
  root: {
    width: "100%",
    height: HEADER_HEIGHT,
    fontFamily: "Sura",
    textAlign: "center",
    borderBottom: `1px solid ${theme.palette.outline}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background,
    color: theme.palette.text,
    userSelect: "none",
  },
  left: {
    display: "flex",
    position: "absolute",
    left: "0.25rem",
  },
  right: {
    display: "flex",
    position: "absolute",
    right: "0.25rem",
  },
  action: {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    fontSize: "1.5rem",
    width: "2rem",
    height: "2.5rem",
    userSelect: "none",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
  },
};

export function Header() {
  const { ui } = React.useContext(GameContext);
  const openInstructions = () => ui.setInstructionsOpen(true);
  const openStats = () => ui.setStatsOpen(true);
  return (
    <div style={styles.root}>
      <div style={styles.left}>
        <div style={styles.action}>
          <a
            href="https://github.com/benpryke/wortle"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            👨‍💻
          </a>
        </div>
      </div>
      <h1 style={styles.title}>Wortle</h1>
      <div style={styles.right}>
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
