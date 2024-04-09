<template>
  <div class="container mx-auto py-5 sm:!py-10 md:!py-20 px-3 h-max">
    <div class="grid gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
      <div class="flex flex-col flex-grow mb-2 font-nunito">
        <label class="text-xs sm:!text-sm">Make:</label>
        <v-text-field
          :readonly="true"
          type="text"
          density="compact"
          variant="outlined"
          value="Ford"
        />
      </div>
      <div class="flex flex-col flex-grow mb-2 font-nunito">
        <label class="text-xs sm:!text-sm">Model:</label>
        <v-text-field
          :readonly="true"
          type="text"
          density="compact"
          variant="outlined"
          value="Mustang VI"
        />
      </div>
      <div class="flex flex-col flex-grow mb-2 font-nunito">
        <label class="text-xs sm:!text-sm">Year:</label>
        <v-select
          type="text"
          @update:modelValue="(year) => getVariants(year)"
          density="compact"
          variant="outlined"
          :items="state.years"
          v-model="state.search.year"
        />
      </div>
      <div class="flex flex-col flex-grow mb-2 font-nunito">
        <label class="text-xs sm:!text-sm">Variant:</label>
        <v-select
          type="text"
          :disabled="!state.search.year"
          @update:modelValue="(variant) => getProducts(variant)"
          v-model="state.search.variant"
          density="compact"
          variant="outlined"
          :loading="state.loading.variants"
          :items="state.variants"
        />
      </div>
    </div>
    <Loader v-if="state.loader" />
    <p id="start"></p>
    <ProductList
      v-if="state.products.length > 0"
      :products="filter"
      class="pt-10"
    />
  </div>
</template>

<script setup>
const store = useStore();
const { variant, year } = useRoute().query;
const state = reactive({
  search: {
    variant: "",
    year: "",
  },
  loading: {
    variants: false,
  },
  variants: [],
  products: [],
  years: [],
  loader: false,
});

const getVariants = async (year) => {
  state.products = [];
  state.search.variant = "";
  state.loading.variants = true;
  const { options } = await useGetProductsToCatalogue(year, false);
  state.variants = options.variant.sort();
  state.loading.variants = false;

  navigateTo(`/catalogue/?year=${state.search.year}`);
};

const getProducts = async (variant) => {
  state.products = [];
  state.loader = true;

  const { results } = await useGetProductsToCatalogue(
    state.search.year,
    true,
    variant
  );

  state.products = results;
  state.loader = false;

  navigateTo(
    `/catalogue/?year=${state.search.year}&variant=${state.search.variant}`
  );
};

onMounted(async () => {
  state.years = store.getProductYears();
  if (year && !variant) {
    await getVariants(year);
  } else if (year && variant) {
    state.search.year = year;
    state.search.variant = variant;
    await getProducts(variant);
  }
  if (state.products) {
    document.getElementById("start").scrollIntoView({
      behavior: "smooth",
    });
  }
});

watch(
  () => state.products,
  async () => {
    if (state.products.length !== 0) {
      document.getElementById("start").scrollIntoView({
        behavior: "smooth",
      });
    }
  }
);

const filter = computed(() => {
  const filteredId = [];
  const properList = [];
  if (state.products.length > 0) {
    state.products.forEach((obj) => {
      if (!filteredId.includes(obj.item.id)) {
        filteredId.push(obj.item.id);
        properList.push(obj);
      }
    });
  }
  return properList;
});
</script>

<style scoped>
:deep(.v-input__details) {
  display: none !important;
}
:deep(.v-select__selection-text) {
  font-size: 14px;
}
</style>
