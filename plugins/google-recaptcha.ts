import { VueReCaptcha } from "vue-recaptcha-v3";

const events = ["mousemove", "touchstart", "touchmove"];

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const initializeReCaptcha = () => {
      nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: nuxtApp.$config.public.recaptchaSiteKey,
        loaderOptions: {
          autoHideBadge: false,
          explicitRenderParameters: {
            badge: "bottomright",
          },
        },
      });

      events.forEach((event) => {
        window.removeEventListener(event, initializeReCaptcha);
      });
    };

    events.forEach((event) => {
      window.addEventListener(event, initializeReCaptcha);
    });
  }
});
