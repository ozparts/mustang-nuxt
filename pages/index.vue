<template class="debug-screens">
  <HomeMainBanner />
  <HomeSectionVariantsDesktop
    :variantsWithHorsepower="state.variantsWithHorsepower"
  />
  <HomeSectionBrands />
  <HomeSectionCatalogue :variants="state.variants" />
</template>

<script setup>
const state = reactive({
  variantsWithHorsepower: [],
  categories: [],
  variants: [],
});

const { options } = await useGetApplications(true);
state.variantsWithHorsepower = parseVariantsAndHorsepower(options.variant);
state.categories = options.categorymaster;
state.variants = options.variant;
</script>
