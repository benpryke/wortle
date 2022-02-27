import React from "react";

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
    background: "white",
  },
  close: {
    position: "absolute",
    top: "0.5rem",
    right: "1rem",
    fontSize: "1.5rem",
  },
};

export function Modal({ isOpen, close, children }) {
  return (
    isOpen && (
      <div onClick={close} style={styles.backdrop}>
        <div style={styles.modal}>
          <div style={styles.close}>✖</div>
          {children}
        </div>
      </div>
    )
  );
}
