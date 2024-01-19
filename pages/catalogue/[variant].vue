<template>
  <section class="container mx-auto">
    <Banner title="catalogue" />

    <div class="mt-5 mb-5 lg:!mb-28">
      <h2
        class="bg-mustangLightGrey my-2 w-full py-2 text-center font-nunito font-bold sm:!my-4 sm:!py-4 sm:text-xl"
      >
        Selected variant: {{ state.selectedVariantFromParam }}
      </h2>

      <div
        class="flex flex-col flex-wrap justify-around gap-1 my-10 sm:items-center sm:flex-row"
      >
        <div class="mb-2 font-nunito sm:basis-[40%]">
          <label class="text-xs sm:text-sm">Select a specific variant:</label>
          <v-select
            type="text"
            density="compact"
            variant="outlined"
            hideDetails="true"
            @update:modelValue="getEngines"
            v-model="state.search.variant"
            :items="state.fullListOfVariants.sort()"
          />
        </div>

        <div class="mb-2 sm:basis-[40%]">
          <label class="text-xs sm:text-sm">Engine:</label>
          <v-select
            :disabled="!state.search.variant"
            type="text"
            hideDetails="true"
            @update:modelValue="getProducts"
            density="compact"
            variant="outlined"
            v-model="state.search.engine"
            :items="state.availableEnginesForSelectedVariant"
          />
        </div>
      </div>
    </div>

    <ProductList v-if="state.productList.length > 0" :products="filter" />
  </section>
</template>

<script setup>
const state = reactive({
  selectedVariantFromParam: "",
  fullListOfVariants: [],
  availableEnginesForSelectedVariant: [],
  productList: [],
  filteredList: [],
  search: {
    variant: "",
    engine: "",
  },
  queryString: "",
});

const getEngines = async (value) => {
  state.search.variant = value;
  state.search.engine = "";
  if (state.search.variant !== "") {
    state.availableEnginesForSelectedVariant = (
      await useGetEngines(true, state.search.variant)
    ).options.engine;
  }
  state.availableEnginesForSelectedVariant =
    state.availableEnginesForSelectedVariant.map((engine) =>
      engine === "" ? "none" : engine
    );
  navigateTo(
    `/catalogue/${state.selectedVariantFromParam}/?${state.queryString}`
  );
};

const getProducts = async (val) => {
  state.productList = [];
  state.search.engine = val;
  const res = (
    await useGetProducts(
      state.search.variant,
      state.search.engine === "none" ? "" : state.search.engine
    )
  ).results;

  state.productList = res;

  navigateTo(
    `/catalogue/${state.selectedVariantFromParam}/?${state.queryString}`
  );
};

onMounted(async () => {
  const { options } = await useGetApplications(true);
  state.selectedVariantFromParam = useRoute().params.variant;
  state.fullListOfVariants = getAllSpecificVariants(
    options.variant,
    state.selectedVariantFromParam
  );

  if (useRoute().query.variant && useRoute().query.engine) {
    state.search.variant = useRoute().query.variant;
    state.search.engine = useRoute().query.engine;
    state.availableEnginesForSelectedVariant = (
      await useGetEngines(true, state.search.variant)
    ).options.engine.map((engine) => (engine === "" ? "none" : engine));
    state.productList = [];
    state.productList = (
      await useGetProducts(
        state.search.variant,
        state.search.engine === "none" ? "" : state.search.engine
      )
    ).results;
  }
});

const filter = computed(() => {
  const filteredId = [];
  const properList = [];
  if (state.productList.length > 0) {
    state.productList.forEach((obj) => {
      if (!filteredId.includes(obj.item.id)) {
        filteredId.push(obj.item.id);
        properList.push(obj);
      }
    });
  }
  return properList;
});

watchEffect(() => {
  const qs = new URLSearchParams(state.search);
  state.queryString = qs.toString();
  return qs.toString();
});
</script>

<style scoped>
:deep(.v-select__selection-text) {
  font-size: 14px;
}
</style>
