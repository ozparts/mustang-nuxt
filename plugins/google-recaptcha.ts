import { VueReCaptcha } from "vue-recaptcha-v3";
const runtimeConfig = useRuntimeConfig();
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: runtimeConfig.public.recaptcha_site_key,
    loaderOptions: {
      autoHideBadge: false,
      explicitRenderParameters: {
        badge: "bottomright",
      },
    },
  });
});
