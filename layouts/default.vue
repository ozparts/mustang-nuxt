<template class="debug-screens">
  <header>
    <Header class="relative z-20 max-w-[1140px] px-[15px] pt-3" />
  </header>
  <cookie-consent />
  <main>
    <div class="z-11 mx-auto max-w-[1140px] px-[15px] debug-screens">
      <slot />
    </div>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<script setup>
const store = useStore();
const country = await useCountry();
store.setCountry(country);
onMounted(() => {
  if (process.client) {
    window.location.host === "localhost:3000" ||
    window.location.host === "mustangperformance.eu"
      ? store.setHost("EU")
      : store.setHost("UK");
  }
});
</script>
