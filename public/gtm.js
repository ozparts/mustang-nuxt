window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

gtag("set", "url_passthrough", true);

gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
});

// Google Tag Manager

// (function (w, d, s, l, i) {
//   w[l] = w[l] || [];
//   w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
//   var f = d.getElementsByTagName(s)[0],
//     j = d.createElement(s),
//     dl = l != "dataLayer" ? "&l=" + l : "";
//   j.async = true;
//   j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
//   f.parentNode.insertBefore(j, f);
// })(window, document, "script", "dataLayer", "GTM-KWZSWWQV");

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  // Preload the script
  var link = d.createElement("link");
  link.rel = "preload";
  link.as = "script";
  link.href = "https://www.googletagmanager.com/gtm.js?id=" + i;
  d.head.appendChild(link);

  // Attach the script after preloading
  link.onload = function () {
    var f = d.getElementsByTagName(s)[0];
    var j = d.createElement(s);
    var dl = l != "dataLayer" ? "&l=" + l : "";
    j.defer = true;
    // j.async = true;
    j.src = link.href;
    f.parentNode.insertBefore(j, f);
  };
})(window, document, "script", "dataLayer", "GTM-KWZSWWQV");

// End Google Tag Manager

function consentGrantedAdStorage() {
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
}
