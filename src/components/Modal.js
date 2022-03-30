import React from "react";

import { Button } from "./Button";
import { theme } from "../theme";

const styles = {
  backdrop: {
    zIndex: 9999,
    position: "absolute",
    width: "100%",
    minHeight: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    position: "relative",
    padding: "2rem",
    margin: "3rem",
    width: "80%",
    maxWidth: 500,
    background: theme.palette.background,
    color: theme.palette.text,
  },
  close: {
    position: "absolute",
    top: "0.5rem",
    right: "1rem",
    fontSize: "1.5rem",
    background: "none",
    color: theme.palette.text,
  },
};

export function Modal({ isOpen, close, children }) {
  return (
    isOpen && (
      <div onClick={close} style={styles.backdrop}>
        <div style={styles.modal}>
          <Button style={styles.close}>✖</Button>
          {children}
        </div>
      </div>
    )
  );
}
