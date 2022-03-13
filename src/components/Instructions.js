import React from "react";
import { GameContext } from "../GameContext";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Tile } from "./Tile";

const styles = {
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
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    width: "70%",
    maxWidth: 250,
    margin: "1rem",
  },
  caption: {
    marginTop: -10,
  },
};

export function Instructions() {
  const { persisted, setPersisted, ui } = React.useContext(GameContext);

  const close = () => {
    setPersisted({ ...persisted, firstTime: false });
    ui.setInstructionsOpen(false);
  };

  return (
    <Modal isOpen={ui.instructionsOpen} close={close}>
      <h2 style={styles.heading}>Anweisungen</h2>
      <p>Errate das WORTLE mit sechs Versuchen.</p>
      <p>
        Jede Vermutung muss ein gültiges Wort aus fünf Buchstaben sein. Drücke
        die Eingabetaste ✔, um zu senden.
      </p>
      <p>
        Nach jeder Vermutung ändert sich die Farbe der Kacheln, um anzuzeigen,
        wie nah deine Vermutung am Wort war.
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
          Der Buchstabe S ist im Wort und am richtigen Platz.
        </p>

        <div style={styles.example}>
          <Tile letter="H" />
          <Tile letter="I" />
          <Tile letter="N" fixed yellow />
          <Tile letter="Z" />
          <Tile letter="U" />
        </div>
        <p style={styles.caption}>
          Der Buchstabe N ist im Wort, aber am falschen Platz.
        </p>

        <div style={styles.example}>
          <Tile letter="S" />
          <Tile letter="U" />
          <Tile letter="P" />
          <Tile letter="E" />
          <Tile letter="R" fixed />
        </div>
        <p style={styles.caption}>
          Der Buchstabe R kommt im Wort gar nicht vor.
        </p>

        <p>
          <strong>Jeden Tag wird ein neues WORTLE verfügbar sein!</strong>
        </p>

        <Button>Spiel es!</Button>
      </section>
    </Modal>
  );
}
