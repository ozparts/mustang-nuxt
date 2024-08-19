import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin(() => {});

export const initializeReCaptcha = () => {
  const nuxtApp = useNuxtApp();

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: nuxtApp.$config.public.recaptchaSiteKey,
    loaderOptions: {
      autoHideBadge: false,
      explicitRenderParameters: {
        badge: "bottomright",
      },
    },
  });
};
