const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * @returns The number of days since the first Wortle
 */
export function getElapsedDays() {
  const start = new Date("Feb 27 2022").getTime();
  return Math.floor((Date.now() - start) / ONE_DAY_MS);
}

/**
 * @param {number} timestamp A timestamp
 * @returns True if the timestamp occurs within the current day
 */
export function isTimestampToday(timestamp) {
  const today = new Date().setHours(0, 0, 0, 0);
  const past = new Date(timestamp).setHours(0, 0, 0, 0);
  return today === past;
}

export function didMissDay(timestamp) {
  const yesterday = new Date(new Date().setHours(0, 0, 0, 0) - ONE_DAY_MS);
  return timestamp < yesterday;
}

/**
 * @returns The number of milliseconds to midnight
 */
export function getMSToMidnight() {
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today + ONE_DAY_MS).getTime();
  return tomorrow - Date.now();
}
