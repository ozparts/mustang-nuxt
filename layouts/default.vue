<template>
  <header>
    <Header class="relative z-2 max-w-[1140px] px-[15px] pt-3" />
  </header>
  <LazyCookieConsent
    v-if="showCookieModal"
    @cookie-consent-response="handleInitialConsentResponse"
  />
  <main>
    <div class="z-11 mx-auto max-w-[1140px] px-[15px]">
      <slot />
    </div>
  </main>
  <footer>
    <LazyFooter />
    <CookiesManager @save-preferences="handleCookiePreferences" />
  </footer>
</template>

<script setup>
const { $loadHjScript } = useNuxtApp();
const store = useStore();
const mustangCookieConsents = useCookie("mustang-cookie-consents", {
  default: () => ({ accepted: false, preferences: ["mandatory"] }),
  watch: true,
  maxAge: 60 * 60 * 24 * 7,
});
const mustangCookieCountry = useCookie("mustang-country");

const showCookieModal = ref(false);

const events = ["mousemove", "touchstart", "touchmove", "click"];

const years = store.getProductYears();

const handleInitialConsentResponse = (answer) => {
  if (answer === "manage") {
    cookie.showModal();
  } else {
    acceptAll();
  }
};

const acceptAll = () => {
  saveCookiePreferences(true, [
    "Mandatory",
    "Functional",
    "Analytics",
    "Advertisement",
  ]);
};

const saveCookiePreferences = (accepted, preferences) => {
  mustangCookieConsents.value = { accepted, preferences };

  if (accepted) {
    window.consentGrantedAdStorage();
  }
};

const handleCookiePreferences = (data) => {
  const preferences = data
    .filter((pref) => pref.enabled)
    .map((pref) => pref.label);

  saveCookiePreferences(true, preferences);
};

const onEventTriggered = async () => {
  events.forEach((event) =>
    window.removeEventListener(event, onEventTriggered)
  );

  await cookieHandler();
  checkConstents();
  if (!years.length) {
    const { options } = await useGetApplications(false);
    store.setProductYears(options.peryear);
  }
  if (process.client) {
    window.location.host === "localhost:3000" ||
    window.location.host === "mustangperformance.eu"
      ? store.setHost("EU")
      : store.setHost("UK");
  }
};

const checkConstents = () => {
  const hasAnalytics =
    mustangCookieConsents.value.preferences &&
    mustangCookieConsents.value.preferences.includes("Analytics");

  if (hasAnalytics) {
    $loadHjScript();
  }
};

const cookieHandler = async () => {
  if (!mustangCookieConsents.value.accepted) {
    showCookieModal.value = true;
  } else {
    window.consentGrantedAdStorage();
  }

  if (!mustangCookieCountry.value) {
    const country = await useCountry();
    store.setCountry(country);
    mustangCookieCountry.value = country;
  } else {
    store.setCountry(mustangCookieCountry.value);
  }
};

onMounted(async () => {
  events.forEach((event) => window.addEventListener(event, onEventTriggered));
});

watch(
  () => mustangCookieConsents.value.accepted,
  () => {
    showCookieModal.value = false;
    checkConstents();
  }
);
</script>
