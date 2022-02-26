import React from "react";
import { Row } from "./Row";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexGrow: 1,
};

export function Grid() {
  return (
    <div style={styles}>
      {Array(6)
        .fill()
        .map((_, i) => (
          <Row key={i} index={i} />
        ))}
    </div>
  );
}
