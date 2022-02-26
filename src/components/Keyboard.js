import React from "react";
import { BackspaceKey, EnterKey, LetterKey } from "./Keys";

const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  bottom: 0,
  marginTop: "1rem",
  marginBottom: "1rem",
  width: "95vw",
  maxWidth: 500,
};

const rowStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

export function Keyboard() {
  return (
    <div style={styles}>
      <div style={rowStyle}>
        <LetterKey letter="Q" />
        <LetterKey letter="W" />
        <LetterKey letter="E" />
        <LetterKey letter="R" />
        <LetterKey letter="T" />
        <LetterKey letter="Y" />
        <LetterKey letter="U" />
        <LetterKey letter="I" />
        <LetterKey letter="O" />
        <LetterKey letter="P" />
      </div>
      <div style={rowStyle}>
        <LetterKey letter="A" />
        <LetterKey letter="S" />
        <LetterKey letter="D" />
        <LetterKey letter="F" />
        <LetterKey letter="G" />
        <LetterKey letter="H" />
        <LetterKey letter="J" />
        <LetterKey letter="K" />
        <LetterKey letter="L" />
      </div>
      <div style={rowStyle}>
        <EnterKey />
        <LetterKey letter="Z" />
        <LetterKey letter="X" />
        <LetterKey letter="C" />
        <LetterKey letter="V" />
        <LetterKey letter="B" />
        <LetterKey letter="N" />
        <LetterKey letter="M" />
        <BackspaceKey />
      </div>
    </div>
  );
}
