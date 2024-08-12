import { loadGtmScript } from "./gtm";
import { loadHjScript } from "./hotJar";

const events = ["mousemove", "touchstart", "touchmove", "click"];

const onEventTriggered = () => {
  loadGtmScript();
  loadHjScript();
  events.forEach((event) =>
    window.removeEventListener(event, onEventTriggered)
  );
};

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    events.forEach((event) => window.addEventListener(event, onEventTriggered));
  }
});
