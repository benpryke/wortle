export function logEvent(action, data) {
  if (window.gtag) {
    window.gtag("event", action, data);
  }
}
