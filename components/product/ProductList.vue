<template>
  <section class="container mx-auto mb-5">
    <div class="flex flex-col gap-2 md:flex-row">
      <div class="basis-[25%]">
        <Filter :products="state.groupedProducts" class="sticky top-3" />
      </div>

      <div class="basis-[75%]">
        <div
          v-for="products in state.groupedProducts"
          :key="products.masterCategory"
        >
          <div
            v-for="groupedProducts in products.subCategories"
            :key="groupedProducts.category"
          >
            <div v-if="store.filter[groupedProducts.category]">
              <h4
                class="mb-3 border-b-4 border-mustangRed py-2 font-nunito text-lg capitalize sm:!mb-4 sm:text-[22px]"
              >
                {{ products.masterCategory }} |
                {{ groupedProducts.category.toLowerCase() }}
              </h4>
              <div
                class="mb-5 grid min-h-[250px] grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3"
              >
                <nuxt-link
                  :to="`/product/${product.item.number}`"
                  v-for="product in groupedProducts.products"
                  class="flex flex-col h-full border border-gray-400"
                >
                  <ProductSingleProduct :product="product" :key="product._id" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  products: Array,
});
const store = useStore();
const state = reactive({
  products: props.products,
  groupedProducts: [],
  categorydescription: [],
});

const createFilterSchema = (arr) => {
  const filterSchema = {};
  arr.forEach(({ subCategories }) => {
    subCategories.forEach((obj) => {
      filterSchema[obj.category] = true;
    });
  });

  return { filterSchema };
};

const checkFilterKeysInCategories = (products) => {
  const categories = [];
  products.subCategories.forEach((obj) => categories.push(obj.category));
  const filterKeys = [];
  for (const key in store.getFilter) {
    if (store.getFilter[key]) {
      filterKeys.push(key);
    }
  }
  return categories.some((r) => filterKeys.includes(r));
};

onMounted(async () => {
  state.groupedProducts = groupProductsByMasterCategory(
    groupProductsByCategory(
      state.products.sort((a, b) => {
        if (a.item.available && !b.item.available) return -1;
        if (!a.item.available && b.item.available) return 1;

        let [prefixA, suffixA] = a.item.urlcomponent.split("-");
        let [prefixB, suffixB] = b.item.urlcomponent.split("-");

        if (prefixA !== prefixB) {
          return prefixA.localeCompare(prefixB);
        }
        if (suffixA === "STD") return -1;
        if (suffixB === "STD") return 1;
        return a.item.urlcomponent.localeCompare(b.item.urlcomponent);
      })
    )
  );

  const { filterSchema } = createFilterSchema(state.groupedProducts);
  store.setFilter(filterSchema);
});
</script>
