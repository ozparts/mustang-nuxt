import { loadGtmScript } from "./gtm";
import { initializeReCaptcha } from "./google-recaptcha";

const events = ["mousemove", "touchstart", "touchmove", "click"];

const loadScripts = () => {
  loadGtmScript();
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
