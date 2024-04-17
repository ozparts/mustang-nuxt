<template>
  <noscript
    ><iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-KWZSWWQV"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    ></iframe
  ></noscript>
  <HomeMainBanner />
  <HomeSectionVariantsDesktop
    :variantsWithHorsepower="state.variantsWithHorsepower"
  />
  <HomeSectionBrands />
  <HomeSectionCatalogue :variants="state.variants" />
</template>

<script setup>
const store = useStore();

const state = reactive({
  variantsWithHorsepower: [],
  categories: [],
  variants: [],
  years: [],
});

const { options } = await useGetApplications(false);

state.variantsWithHorsepower = parseVariantsAndHorsepower(options.variant);
state.categories = options.categorymaster;
state.variants = options.variant;
state.years = options.peryear;
store.setProductYears(options.peryear);
</script>
