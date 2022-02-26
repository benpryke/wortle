import React from "react";
import { GameContext, theme } from "../GameContext";
import { Tile } from "./Tile";

const styles = {
  backdrop: {
    zIndex: 9999,
    position: "absolute",
    width: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    padding: "2rem",
    margin: "3rem",
    width: "80%",
    background: "white",
  },
  heading: {
    margin: 0,
  },
  examples: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  example: {
    display: "flex",
    transform: "scale(0.6)",
  },
  caption: {
    marginTop: -10,
  },
  play: {
    fontSize: "2rem",
    border: "none",
    padding: 10,
    borderRadius: 5,
    color: "white",
    background: theme.palette.green,
  },
};

export function Instructions() {
  const { persisted, setPersisted, ui } = React.useContext(GameContext);
  const close = () => {
    setPersisted({ ...persisted, firstTime: false });
    ui.setInstructionsOpen(false);
  };
  return (
    ui.instructionsOpen && (
      <div onClick={close} style={styles.backdrop}>
        <div style={styles.modal}>
          <h2 style={styles.heading}>Anweisungen</h2>
          <p>Erraten Sie das WORTLE in sechs Versuchen.</p>
          <p>
            Jede Vermutung muss ein gültiges Wort aus fünf Buchstaben sein.
            Drücken Sie die Eingabetaste ✔, um zu senden.
          </p>
          <p>
            Nach jeder Vermutung ändert sich die Farbe der Kacheln, um
            anzuzeigen, wie nah Ihre Vermutung am Wort war.
          </p>
          <section style={styles.examples}>
            <h3 style={styles.heading}>Beispielen</h3>
            <div style={styles.example}>
              <Tile letter="S" fixed green />
              <Tile letter="A" />
              <Tile letter="G" />
              <Tile letter="E" />
              <Tile letter="N" />
            </div>
            <p style={styles.caption}>
              Der Buchstabe S ist im Wort und an der richtigen Stelle.
            </p>

            <div style={styles.example}>
              <Tile letter="H" />
              <Tile letter="I" />
              <Tile letter="N" fixed yellow />
              <Tile letter="Z" />
              <Tile letter="U" />
            </div>
            <p style={styles.caption}>
              Der Buchstabe N ist im Wort, aber an der falschen Stelle.
            </p>

            <div style={styles.example}>
              <Tile letter="S" />
              <Tile letter="U" />
              <Tile letter="P" />
              <Tile letter="E" />
              <Tile letter="R" fixed />
            </div>
            <p style={styles.caption}>
              Der Buchstabe R kommt an keiner Stelle im Wort vor.
            </p>

            <p>
              <strong>Jeden Tag wird ein neues WORTLE verfügbar sein!</strong>
            </p>

            <button style={styles.play}>Spielen Sie!</button>
          </section>
        </div>
      </div>
    )
  );
}
