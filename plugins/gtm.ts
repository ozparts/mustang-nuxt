import type { DataLayerEvent } from "~/types/analytics";

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    gtag: (...args: any[]) => void;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    window.dataLayer = window.dataLayer || [];

    function gtag(...args: any[]): void {
      (window.dataLayer as any).push(arguments);
    }
    window.gtag = gtag;
  }
});

export const loadGtmScript = () => {
  // if (!import.meta.client) return;

  const runtimeConfig = useRuntimeConfig();
  const gtmId = runtimeConfig.public.gtmId;

  // Ensure gtag is initialized
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: any[]): void {
      (window.dataLayer as any).push(arguments);
    };
  }

  window.gtag("set", "url_passthrough", true);

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  (function (w: any, d: Document, s: string, l: string, i: string) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== "dataLayer" ? "&l=" + l : "";
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode!.insertBefore(j, f);
  })(window, document, "script", "dataLayer", gtmId);
};
