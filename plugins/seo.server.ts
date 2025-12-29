export default defineNuxtPlugin(() => {
  const route = useRoute();
  const url = useRequestURL();

  const euUrl = `https://mustangperformance.eu${route.path}`;
  const currentUrl = `${url.protocol}//${url.host}${route.path}`;

  useHead({
    link: [
      { rel: "canonical", href: currentUrl },

      { rel: "alternate", hreflang: "x-default", href: euUrl },
      { rel: "alternate", hreflang: "en-EU", href: euUrl },
    ],
  });
});
