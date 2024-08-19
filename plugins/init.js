import { loadGtmScript } from "./gtm";
import { loadHjScript } from "./hotJar";
import { initializeReCaptcha } from "./google-recaptcha";

const events = ["mousemove", "touchstart", "touchmove", "click"];

const loadScripts = () => {
  loadGtmScript();
  loadHjScript();
  initializeReCaptcha();
};

const onEventTriggered = () => {
  loadScripts();
  cleanupEventListeners();
};

const cleanupEventListeners = () => {
  events.forEach((event) =>
    window.removeEventListener(event, onEventTriggered)
  );
};

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    if (window.location.pathname === "/") {
      events.forEach((event) =>
        window.addEventListener(event, onEventTriggered)
      );
    } else {
      loadScripts();
    }
  }
});
