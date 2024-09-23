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

const state = reactive({
  variantsWithHorsepower: [],
  categories: [],
  variants: [],
  years: [],
});

const updateState = (options) => {
  state.categories = options.categorymaster;
  state.variants = options.variant;
  state.years = options.peryear;
  state.variantsWithHorsepower = parseVariantsAndHorsepower(options.variant);
};

const getApplications = async () => {
  try {
    const { options } = await useGetApplications(false);
    updateState(options);
    store.setProductYears(options.peryear);
  } catch (err) {
    console.error("Error fetching application data:", err);
  }
};

onMounted(async () => {
  await getApplications();
});
</script>
