<template>
  <div>
    <Banner :title="`search results: ${state.params}`" />
    <div
      class="flex flex-col m-2 font-nunito lg:mt-0 sm:mx-3 sm:my-5 md:m-6 lg:m-10 items-start-start sm:flex-row sm:items-center sm:justify-between"
    >
      <p
        v-if="!state.loading"
        class="my-3 text-sm font-bold uppercase sm:!my-0 sm:text-base"
      >
        {{
          `${
            state.filtered ? state.filtered.length : state.products.length
          } products`
        }}
      </p>
      <span v-else class="daisy-loading"></span>
      <div class="flex items-center mb-3 sm:!mb-0">
        <div class="flex items-center text-sm">
          <v-select
            class="text-sm uppercase"
            v-model="state.selectedItem"
            :items="state.items"
            bg-color="transparent"
            variant="plain"
            hide-details="true"
          >
          </v-select>
        </div>
      </div>
    </div>
    <div
      class="grid xs:grid-cols-[repeat(auto-fill,minmax(45%,1fr))] gap-2.5 m-2 sm:m-3 md:m-6 lg:m-10 sm:grid-cols-[repeat(auto-fill,minmax(30%,1fr))] sm:gap-5 lg:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
    >
      <ProductSingleSearchProduct
        v-for="product in sortBy(state.products, state.selectedItem)"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
const { params } = useRoute();
const state = reactive({
  products: "",
  filtered: "",
  params: params.name,
  items: [
    "Default sorting",
    "Sort by price: low to hight",
    "Sort by price: hight to low",
    "Sort by name: A to Z",
    "Sort by name: Z to A",
  ],
  selectedItem: "Default sorting",
  filter: false,
  minPrice: "",
  maxPrice: "",
  loading: false,
});

onMounted(async () => {
  state.loading = true;
  const data = await useSearch(params.name);
  state.products = data;
  state.filtered = data;
  const sorted = sortBy(state.products, "Sort by price: low to hight");
  state.loading = false;
  state.minPrice = sorted[0].price.grossprice;
  state.maxPrice = sorted[state.products.length - 1].price.grossprice;
});

function sortBy(array, option) {
  const copy = [...array];
  return copy.sort((a, b) => {
    switch (option) {
      case "Default sorting":
        return b.available - a.available;
      case "Sort by price: low to hight":
        return a.price.grossprice - b.price.grossprice;
      case "Sort by price: hight to low":
        return b.price.grossprice - a.price.grossprice;
      case "Sort by name: A to Z":
        return a.urlcomponent.localeCompare(b.urlcomponent);
      case "Sort by name: Z to A":
        return b.urlcomponent.localeCompare(a.urlcomponent);
    }
  });
}

function filter(min, max) {
  const products = state.products;
  state.filtered = products.filter((item) => {
    return (
      item.price.grossprice >= Number(min) &&
      item.price.grossprice <= Number(max)
    );
  });
  state.filter = !state.filter;
}
</script>

<style lang="scss" scoped>
:deep(.v-select__selection-text) {
  font-size: 13px;
  font-weight: 700;
}

@media screen and (min-width: "640px") {
  :deep(.v-select__selection-text) {
    font-size: 16px;
  }
}
</style>
