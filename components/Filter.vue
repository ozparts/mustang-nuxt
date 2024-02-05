<template>
  <section class="p-2 border bg-slate-100">
    <div class="flex gap-2 mb-2 sm:!mb-4">
      <p class="mr-auto font-nunito text-xl sm:text-[22px]">Filter</p>

      <Icon
        v-if="state.show"
        name="mdi:filter-minus-outline"
        color="black"
        size="22px"
        @click="store.setAllFiltersFalse()"
        class="cursor-pointer"
      />
      <Icon
        v-if="state.show"
        name="mdi:filter-plus-outline"
        color="black"
        size="22px"
        @click="store.setAllFiltersTrue()"
        class="cursor-pointer"
      />

      <Icon
        :name="state.show ? 'mdi:filter-off-outline' : 'mdi:filter-outline'"
        size="22px"
        @click="turnOnAndOf"
        class="cursor-pointer"
      />
    </div>

    <div v-if="state.show" class="space-y-2 sm:!space-y-4">
      <div v-for="masterCategory in state.products" :key="masterCategory">
        <p class="font-nunito md:text-xl">
          {{ masterCategory.masterCategory }}
        </p>

        <div
          v-for="groupedProducts in masterCategory.subCategories.sort(
            (a, b) => {
              if (a.category.includes('Varex')) return -1;
              if (b.category.includes('Varex')) return 1;
              return a.category.localeCompare(b.category);
            }
          )"
          class="my-1 flex items-center gap-0.5 border border-gray-300 bg-gray-200 pr-0.5"
        >
          <div>
            <v-checkbox
              :name="groupedProducts.category"
              hide-details="true"
              v-model="store.filter[groupedProducts.category]"
              :id="groupedProducts.category"
            ></v-checkbox>
          </div>
          <label
            class="text-xs capitalize cursor-pointer font-nunito sm:text-xs md:text-[13px] md:text-sm"
            :for="groupedProducts.category"
          >
            {{ groupedProducts.category.toLowerCase() }} ({{
              groupedProducts.products.length
            }})
          </label>
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
  show: true,
  filterOn: false,
  products: props.products,
  filter: props.filter,
  selected: [],
});

onMounted(() => {
  state.filter = store.getFilter;
});

onUpdated(() => {
  state.products = props.products;
});

const turnOnAndOf = () => {
  state.show = !state.show;
  if (!state.show) {
    store.setAllFiltersTrue();
  }
};
</script>
