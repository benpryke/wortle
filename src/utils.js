function getElapsedDays() {
  const start = new Date("Feb 27 2022").getTime();
  return Math.floor((Date.now() - start) / (24 * 60 * 60 * 1000));
}

export function chooseAnswer(config) {
  return config.answers[getElapsedDays() % config.answers.length];
}

export function isTimestampToday(timestamp) {
  const today = new Date().setHours(0, 0, 0, 0);
  const past = new Date(timestamp).setHours(0, 0, 0, 0);
  return today === past;
}

export function getMSToMidnight() {
  const today = new Date().setHours(0, 0, 0, 0);
  const oneDay = 24 * 60 * 60 * 1000;
  const tomorrow = new Date(today + oneDay).getTime();
  return tomorrow - Date.now();
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

export function generateShareBlocks(answer, guesses) {
  const day = getElapsedDays() + 1;
  const nGuesses = guesses.length - 1;
  let result = `Wortle ${day} ${nGuesses}/6\n\n`;

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

  return result + "\nSpielen bei wortle.pages.dev";
}
