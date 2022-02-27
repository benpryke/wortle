import React from "react";
import { GameContext } from "../GameContext";

const styles = {
  zIndex: 99999,
  position: "absolute",
  textAlign: "center",
  width: "100%",
  boxSizing: "border-box",
  padding: "0.5rem",
  fontSize: "1.5rem",
  bottom: "2rem",
  background: "lightblue",
};

export function GlobalSnackbar() {
  const { ui } = React.useContext(GameContext);
  return ui.snackbarOpen && <div style={styles}>{ui.snackbarMsg}</div>;
}
