import React from "react";

import { Button } from "./Button";
import { GameContext } from "../GameContext";
import { Modal } from "./Modal";
import { theme } from "../Theme";
import { generateShareBlocks, getMSToMidnight } from "../utils";

const styles = {
  heading: {
    margin: 0,
  },
  stats: {
    textAlign: "center",
    display: "flex",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    margin: 5,
  },
  statValue: {
    fontSize: "1.5rem",
  },
  barChart: {
    display: "flex",
    alignItems: "center",
  },
  bar: {
    minWidth: "0.8rem",
    height: "1rem",
    background: theme.palette.grey,
    marginTop: 4,
    marginLeft: 5,
    paddingRight: 5,
    color: "white",
    textAlign: "right",
    lineHeight: "0.8rem",
  },
  timer: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
  },
  shareButton: {
    display: "flex",
    margin: "1.5rem auto 0",
  },
};

function getTimeRemaining() {
  const ms = getMSToMidnight();
  const date = new Date(ms);
  const hours = String(Math.floor(ms / 1000 / 60 / 60)).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function Stat({ name, value }) {
  return (
    <div style={styles.stat}>
      <span style={styles.statValue}>{value}</span>
      <span>{name}</span>
    </div>
  );
}

function BarChart({ label, value, maxValue }) {
  const style = {
    ...styles.bar,
    width: `${(100 * value) / (maxValue || 1)}%`,
  };
  return (
    <div style={styles.barChart}>
      <span>{label}</span>
      <div style={style}>{value}</div>
    </div>
  );
}

export function Stats() {
  const { answer, guesses, greens, persisted, ui } =
    React.useContext(GameContext);
  const [timeRemaining, setTimeRemaining] = React.useState(getTimeRemaining());
  const played = persisted.stats.wins + persisted.stats.losses;
  const winPercent =
    Math.round(
      (100 * persisted.stats.wins) /
        (persisted.stats.wins + persisted.stats.losses)
    ) || 0;
  const streak = persisted.stats.streak;
  const bestStreak = persisted.stats.bestStreak;
  const shareVisible = greens.size === 5 || guesses.length >= 6;
  const close = () => ui.setStatsOpen(false);

  const share = (event) => {
    const text = generateShareBlocks(answer, guesses);
    window.navigator.clipboard.writeText(text);
    ui.openSnackbar("In die Zwischenablage kopiert");
    event.stopPropagation();
  };

  React.useEffect(() => {
    const interval = setInterval(
      () => setTimeRemaining(getTimeRemaining()),
      1000
    );
    return () => clearInterval(interval);
  }, [setTimeRemaining]);

  return (
    <Modal isOpen={ui.statsOpen} close={close}>
      <h2 style={styles.heading}>Statistik</h2>
      <div style={styles.stats}>
        <Stat name="Gespielt" value={played} />
        <Stat name="Gewinnen %" value={winPercent} />
      </div>
      <div style={styles.stats}>
        <Stat name="Aktuelle Gewinnserie" value={streak} />
        <Stat name="Beste Gewinnserie" value={bestStreak} />
      </div>
      <br />
      <h3 style={styles.heading}>Verteilung Erraten</h3>
      <div>
        {persisted.stats.solves.map((value, i) => (
          <BarChart
            key={i}
            label={i + 1}
            value={value}
            maxValue={Math.max(...persisted.stats.solves)}
          />
        ))}
      </div>
      <span style={styles.timer}>Nächstes Wortle in {timeRemaining}</span>
      {shareVisible && (
        <Button onClick={share} style={styles.shareButton}>
          Teilen
        </Button>
      )}
    </Modal>
  );
}
