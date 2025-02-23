export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
  }
});

export const loadGtmScript = () => {
  const runtimeConfig = useRuntimeConfig();
  const gtmId = runtimeConfig.public.gtmId;

  gtag("set", "url_passthrough", true);

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  gtag("js", new Date());
  gtag("config", "AW-16769394046");

  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l !== "dataLayer" ? "&l=" + l : "";
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", gtmId);
};
