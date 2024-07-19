const events = ["mousemove", "touchstart", "touchmove"];

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

function consentGrantedAdStorage() {
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
}

const loadScript = () => {
  gtag("set", "url_passthrough", true);

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-KWZSWWQV");
};

const init = () => {
  events.forEach((event) => window.addEventListener(event, onEventTriggered));
};

const onEventTriggered = () => {
  events.forEach((event) =>
    window.removeEventListener(event, onEventTriggered)
  );
  loadScript();
};

init();
