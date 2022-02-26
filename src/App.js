import { Game } from "./components/Game";
import { Header } from "./components/Header";

/**
 * TODOS
 *
 * Winning
 * Statistics
 * How to play
 * Proper yellows handling
 * Handle ss in valid answers
 * Deploy
 * Persist game state
 * Answers
 * Handle umlauts
 * Animations
 * Keyboard input
 */

function App() {
  return (
    <>
      <Header />
      <Game />
    </>
  );
}

export default App;
