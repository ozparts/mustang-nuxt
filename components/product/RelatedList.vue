<template>
  <div class="mt-5 sm:!mt-10">
    <h3
      class="py-2 text-sm font-semibold text-center text-white uppercase rounded-lg bg-mustangRed font-nunito lg:text-base"
    >
      Related Items
    </h3>

    <div
      v-if="filterRelatedItems.length"
      class="grid gap-1 mt-5 xs:grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1"
    >
      <div v-for="product in filterRelatedItems">
        <NuxtLink
          :to="`/product/${product.number}`"
          class="flex flex-col gap-1 overflow-hidden border border-gray-400 rounded-lg font-nunito"
        >
          <ProductSingleRelatedProduct :product="product" />
        </NuxtLink>
      </div>
    </div>
    <p v-else class="px-2 my-5 text-sm font-nunito">
      At this time, we regret to inform you that we do not have any related
      products available for the specified item. We continuously strive to
      expand our inventory to better serve our Mustang enthusiasts. We
      appreciate your patience and encourage you to check back soon for updates.
    </p>
  </div>
</template>

<script setup>
const route = useRoute();

const props = defineProps(["id"]);

const record = ref(route.params.record);
const state = reactive({
  relatedItems: [],
});

const filterRelatedItems = computed(() => {
  return state.relatedItems
    .filter((item) => item.number !== Number(record.value))
    .sort((a, b) => {
      if (a.available !== b.available) return b.available ? 1 : -1;

      const [prefixA, suffixA] = a.urlcomponent.split("-");
      const [prefixB, suffixB] = b.urlcomponent.split("-");

      if (prefixA !== prefixB) return prefixA.localeCompare(prefixB);
      if (suffixA === "STD") return -1;
      if (suffixB === "STD") return 1;
      return a.urlcomponent.localeCompare(b.urlcomponent);
    })
    .reduce((acc, item) => {
      if (!acc.some((i) => i.id === item.id)) {
        acc.push(item);
      }
      return acc;
    }, []);
});

const isValidArray = (arr) => {
  return Array.isArray(arr) && arr.length > 0 && Object.keys(arr[0]).length > 0;
};

onMounted(async () => {
  try {
    const result = await useGetRelatedItems(props.id);

    if (isValidArray(result)) {
      state.relatedItems = result;
    } else {
      state.relatedItems = [];
    }
  } catch (error) {
    console.error("Error fetching related items:", error);
    state.relatedItems = [];
  }
});
</script>
