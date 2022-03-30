import { getElapsedDays } from "./timing";

/**
 * Selects today's answer from the config
 * @param {Object} config Game config object
 * @returns Today's answer
 */
export function chooseAnswer(config) {
  return config.answers[getElapsedDays() % config.answers.length];
}

export function isGreen(answer, guess, index) {
  return guess[index] === answer[index];
}

export function isYellow(answer, guess, index) {
  const letter = guess[index];
  const count = (string) =>
    (string.match(new RegExp(letter, "g")) || []).length;

  // Does the number of repetitions of `letter` in the answer that are green
  // use up all available repetitions of `letter`?
  const repeats = count(answer);
  const greens = answer
    .split("")
    .map((c, i) => letter === c && letter === guess[i])
    .reduce((a, b) => a + b, 0);

  if (greens >= repeats) return false;

  // Is the number of repetitions of `letter` in the answer is more than the
  // number of repetitions of `letter` prior to the `index` of `letter` in
  // `guess`?
  const priors = count(guess.substr(0, index));
  return priors < repeats;
}

export function hasWon(greens) {
  return greens.size === 5;
}
