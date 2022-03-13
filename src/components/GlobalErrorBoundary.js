import React from "react";

import { Button } from "./Button";
import { theme } from "../Theme";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: `20% 2rem`,
    backgroundColor: theme.palette.background,
  },
  h2: {
    marginBottom: "3rem",
  },
  p: {
    marginTop: "3rem",
  },
  icon: {
    fontSize: 100,
  },
};

export class GlobalErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    const reload = () => window.location.reload();

    if (this.state.hasError) {
      return (
        <div style={styles.root}>
          <span style={styles.icon}>🐛</span>
          <h1>Oops, our bad!</h1>
          <h2 style={styles.h2}>We're really sorry, something broke</h2>
          <Button onClick={reload}>Reload</Button>
          <p style={styles.p}>
            If reloading doesn't work or you want to help track down the bug,
            give developer{" "}
            <a
              href="https://twitter.com/BenjaminPryke"
              target="_blank"
              rel="noopener noreferrer"
            >
              @BenjaminPryke
            </a>{" "}
            a shout on Twitter!
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
