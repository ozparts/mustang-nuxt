<template>
  <header>
    <Header class="relative z-2 max-w-[1140px] px-[15px] pt-3" />
  </header>
  <LazyCookieConsent v-if="cookieConsentIsOpen" />
  <main>
    <div class="z-11 mx-auto max-w-[1140px] px-[15px]">
      <slot />
    </div>
  </main>
  <footer>
    <LazyFooter />
  </footer>
</template>

<script setup>
const events = ["mousemove", "touchstart", "touchmove"];

const store = useStore();
const years = store.getProductYears();
const mustangCookieConsent = useCookie("mustang-consent");
const mustangCookieCountry = useCookie("mustang-country");
const cookieConsentIsOpen = ref(false);

onMounted(async () => {
  events.forEach((event) => window.addEventListener(event, onEventTriggered));
});

const onEventTriggered = async () => {
  events.forEach((event) =>
    window.removeEventListener(event, onEventTriggered)
  );

  await cookieHandler();

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

const cookieHandler = async () => {
  if (!mustangCookieConsent.value && !store.cookiesConsent) {
    cookieConsentIsOpen.value = true;
  }
  if (!mustangCookieCountry.value) {
    const country = await useCountry();
    store.setCountry(country);
    mustangCookieCountry.value = country;
  } else {
    store.setCountry(mustangCookieCountry.value);
  }
  if (mustangCookieConsent.value) {
    window.consentGrantedAdStorage();
  }
};

watch(
  () => mustangCookieConsent.value,
  () => {
    cookieConsentIsOpen.value = false;
  }
);
</script>
