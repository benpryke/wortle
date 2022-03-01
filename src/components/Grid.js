import React from "react";
import { Row } from "./Row";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateRows: "repeat(6, 1fr)",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: 4,
    aspectRatio: "5 / 6",
    maxWidth: "100%",
    padding: "0.5rem",
    boxSizing: "border-box",
    height: "100%",
    maxHeight: "100vw",
  },
};

export function Grid() {
  return (
    <div className="grid-container" style={styles.container}>
      <div style={styles.grid}>
        {Array(6)
          .fill()
          .map((_, i) => (
            <Row key={i} index={i} />
          ))}
      </div>
    </div>
  );
}
