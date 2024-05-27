<template>
  <header>
    <Header class="relative z-2 max-w-[1140px] px-[15px] pt-3" />
  </header>
  <cookie-consent />
  <main>
    <div class="z-11 mx-auto max-w-[1140px] px-[15px]">
      <slot />
    </div>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<script setup>
const store = useStore();
const years = store.getProductYears();
const mustangCookieConsent = useCookie("mustang-consent");
const mustangCookieCountry = useCookie("mustang-country");

onMounted(async () => {
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
});

const cookieHandler = async () => {
  if (!mustangCookieCountry.value) {
    const country = await useCountry();
    store.setCustomerCountry(country);
    mustangCookieCountry.value = country;
  } else {
    store.setCustomerCountry(mustangCookieCountry.value);
  }
  if (mustangCookieConsent.value) {
    window.consentGrantedAdStorage();
  }
};

watch(
  () => mustangCookieConsent.value,
  () => {
    if (mustangCookieConsent.value) {
      window.consentGrantedAdStorage();
    }
  }
);
</script>
