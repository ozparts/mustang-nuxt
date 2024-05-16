<template>
  <HomeMainBanner />
  <HomeSectionVariantsDesktop
    :variantsWithHorsepower="state.variantsWithHorsepower"
  />
  <HomeSectionBrands />
  <HomeSectionCatalogue :variants="state.variants" />
</template>

<script setup>
const store = useStore();
const config = useRuntimeConfig();
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

console.log(config);
</script>
