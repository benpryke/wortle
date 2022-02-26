import React from "react";

export const HEADER_HEIGHT = 45;

const styles = {
  position: "sticky",
  top: 0,
  width: "100vw",
  height: HEADER_HEIGHT,
  fontFamily: "Sura",
  textAlign: "center",
  borderBottom: "1px solid lightgrey",
};

export function Header() {
  return (
    <div style={styles}>
      <h1 style={{ margin: 0 }}>Wortle</h1>
    </div>
  );
}
