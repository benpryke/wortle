const lightPalette = {
  "--theme-background": "#fff",
  "--theme-text": "#222",
  "--theme-key": "#d9d9d9",
  "--theme-disabledKey": "#f3f3f3",
  "--theme-green": "#5cad48",
  "--theme-yellow": "#c9b545",
  "--theme-grey": "#999999",
  "--theme-outline": "lightgrey",
};

const darkPalette = {
  "--theme-background": "#333333",
  "--theme-text": "#fff",
  "--theme-key": "#808080",
  "--theme-disabledKey": "#404040",
  "--theme-green": "#539b41",
  "--theme-yellow": "#b8a223",
  "--theme-grey": "#595959",
  "--theme-outline": "#737373",
};

export const theme = {
  palette: {
    background: "var(--theme-background)",
    text: "var(--theme-text)",
    key: "var(--theme-key)",
    disabledKey: "var(--theme-disabledKey)",
    green: "var(--theme-green)",
    yellow: "var(--theme-yellow)",
    grey: "var(--theme-grey)",
    outline: "var(--theme-outline)",
  },
};

function setTheme(palette) {
  const rootStyle = document.querySelector(":root").style;

  for (const [key, value] of Object.entries(palette)) {
    rootStyle.setProperty(key, value);
  }
}

export function setInitialTheme() {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(isDarkMode ? darkPalette : lightPalette);
}

export function listenForThemeChanges() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) =>
      setTheme(event.matches ? darkPalette : lightPalette)
    );
}
