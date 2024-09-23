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

const hasAnalytics = computed(() =>
  mustangCookieConsents.value.preferences?.includes("Analytics")
);

const handleInitialConsentResponse = (answer) => {
  answer === "manage" ? cookie.showModal() : acceptAll();
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

const removeEventListeners = () => {
  events.forEach((event) =>
    window.removeEventListener(event, onEventTriggered)
  );
};

const loadProductYears = async () => {
  const years = store.getProductYears();
  if (!years.length) {
    const { options } = await useGetApplications(false);
    store.setProductYears(options.peryear);
  }
};

const onEventTriggered = async () => {
  removeEventListeners();
  await loadProductYears();
  await cookieHandler();
  checkConstents();
};

const checkConstents = () => {
  if (hasAnalytics.value) {
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
  () => mustangCookieConsents.value,
  () => {
    showCookieModal.value = false;
    checkConstents();
  }
);
</script>
