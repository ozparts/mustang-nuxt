import { VueReCaptcha } from "vue-recaptcha-v3";
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
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
