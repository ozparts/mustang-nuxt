<template>
  <div class="container mx-auto py-5 sm:!py-10 md:!py-20 px-3">
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
        <label class="text-xs sm:!text-sm">Category:</label>
        <v-select
          type="text"
          @update:modelValue="(cat) => getVariants(cat)"
          density="compact"
          variant="outlined"
          v-model="state.search.category"
          :items="categories"
        />
      </div>
      <div class="flex flex-col flex-grow mb-2 font-nunito">
        <label class="text-xs sm:!text-sm">Variant:</label>
        <v-select
          type="text"
          :disabled="!state.search.category"
          @update:modelValue="(variant) => getEngines(variant)"
          v-model="state.search.variant"
          density="compact"
          variant="outlined"
          :items="state.variants"
        />
      </div>
      <div class="flex flex-col flex-grow mb-2 font-nunito">
        <label class="text-xs sm:!text-sm">Engine:</label>
        <v-select
          type="text"
          :disabled="!state.search.variant"
          @update:modelValue="(engine) => getProducts(engine)"
          v-model="state.search.engine"
          density="compact"
          variant="outlined"
          :items="state.engines"
        />
      </div>
    </div>
    <ProductList
      v-if="state.products.length > 0"
      :products="filter"
      class="pt-10"
    />
  </div>
</template>

<script setup>
import { categories } from "../vars/index";
const { category, variant, engine } = useRoute().query;
const state = reactive({
  search: {
    category: "",
    variant: "",
    engine: "",
  },
  variants: [],
  engines: [],
  products: "",
});

const getVariants = async (category) => {
  state.search.variant = "";
  state.search.engine = "";
  const { options } = await useGetProductsToCatalogue(category, false);
  state.variants = options.variant.sort();
  navigateTo(`/catalogue/?category=${state.search.category}`);
};

const getEngines = async (variant) => {
  state.search.engine = "";
  const { options } = await useGetProductsToCatalogue(
    state.search.category,
    false,
    variant
  );
  navigateTo(
    `/catalogue/?category=${state.search.category}&variant=${state.search.variant}`
  );
  state.engines = options.engine.sort();
};

const getProducts = async (engine) => {
  state.products = [];
  const { options, results } = await useGetProductsToCatalogue(
    state.search.category,
    true,
    state.search.variant,
    engine
  );
  state.products = results;
  navigateTo(
    `/catalogue/?category=${state.search.category}&variant=${state.search.variant}&engine=${state.search.engine}`
  );
};

onMounted(async () => {
  if (category && !variant && !engine) {
    state.search.category = category;
    await getVariants(category);
  } else if (category && variant && !engine) {
    state.search.category = category;
    state.search.variant = variant;
    await getEngines(variant);
  } else if (category && variant && engine) {
    state.search.category = category;
    state.search.variant = variant;
    state.search.engine = engine;
    await getProducts(engine);
  }
});

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
