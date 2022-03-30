import { isGreen, isYellow } from "./gameplay";
import { getElapsedDays } from "./timing";

export function generateShareBlocks(answer, guesses) {
  const day = getElapsedDays() + 1;
  const nGuesses = guesses.length - 1;
  let result = `wortle.pages.dev ${day} ${nGuesses}/6\n\n`;

  for (let i = 0; i < nGuesses; i++) {
    for (let j = 0; j < answer.length; j++) {
      if (isGreen(answer, guesses[i], j)) {
        result += "🟩";
      } else if (isYellow(answer, guesses[i], j)) {
        result += "🟨";
      } else {
        result += "⬜";
      }
    }

    result += "\n";
  }

  return result;
}
