const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getElapsedDays() {
  const start = new Date("Feb 27 2022").getTime();
  return Math.floor((Date.now() - start) / ONE_DAY_MS);
}

export function chooseAnswer(config) {
  return config.answers[getElapsedDays() % config.answers.length];
}

export function isTimestampToday(timestamp) {
  const today = new Date().setHours(0, 0, 0, 0);
  const past = new Date(timestamp).setHours(0, 0, 0, 0);
  return today === past;
}

export function didMissDay(timestamp) {
  const yesterday = new Date(new Date().setHours(0, 0, 0, 0) - ONE_DAY_MS);
  return timestamp < yesterday;
}

export function getMSToMidnight() {
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today + ONE_DAY_MS).getTime();
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

export function hasWon(greens) {
  return greens.size === 5;
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

function isObject(thing) {
  return (
    thing instanceof Object && Object.getPrototypeOf(thing) === Object.prototype
  );
}

/**
 * Ensures `obj` has the same fields as `template`, recursing for nested objects
 * Note: does not handle type changes
 * @param {Object} obj Object to normalise
 * @param {Object} template Basis
 */
export function normaliseObject(obj, template) {
  obj = { ...obj };

  // Copy over missing values from the template
  Object.entries(template).forEach(([key, value]) => {
    if (!obj.hasOwnProperty(key)) {
      obj[key] = value;
    } else if (isObject(template[key])) {
      obj[key] = normaliseObject(obj[key], template[key]);
    }
  });

  // Remove values not in the template
  Object.entries(obj).forEach(([key, value]) => {
    if (!template.hasOwnProperty(key)) {
      delete obj[key];
    }
  });

  return obj;
}
