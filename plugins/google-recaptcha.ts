import { VueReCaptcha } from "vue-recaptcha-v3";
import { RECAPTCHA } from "./../vars/index";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: RECAPTCHA.SITE_KEY,
    loaderOptions: {
      autoHideBadge: false,
      explicitRenderParameters: {
        badge: "bottomright",
      },
    },
  });
});
