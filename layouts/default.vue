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
const mustangConsent = useCookie("mustang-consent");
const country = await useCountry();
store.setCountry(country);

onMounted(() => {
  if (process.client) {
    window.location.host === "localhost:3000" ||
    window.location.host === "mustangperformance.eu"
      ? store.setHost("EU")
      : store.setHost("UK");

    if (mustangConsent.value) {
      window.consentGrantedAdStorage();
    }
  }
});
</script>
