import { VueReCaptcha } from "vue-recaptcha-v3";
import { RECAPTCHA } from "./../vars/index";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  console.log(runtimeConfig.public, "google-recap");
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: runtimeConfig.public.recaptcha_site_key || RECAPTCHA.SITE_KEY,
    loaderOptions: {
      autoHideBadge: false,
      explicitRenderParameters: {
        badge: "bottomright",
      },
    },
  });
});
