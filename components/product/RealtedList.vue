<template>
  <div class="mt-5 sm:!mt-10">
    <h3
      class="py-2 text-sm font-semibold text-center text-white uppercase rounded-lg bg-mustangRed font-nunito lg:text-base"
    >
      Related Items
    </h3>

    <div
      v-if="emptyObjectCheck(relatedItems).length"
      class="grid gap-1 mt-5 xs:grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1"
    >
      <div
        v-for="product in relatedItems"
        class="flex flex-col gap-1 overflow-hidden border border-gray-400 rounded-lg font-nunito"
      >
        <ProductSingleRelatedProduct :product="product" />
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
let relatedItems = ref([]);
const props = defineProps(["id"]);

onMounted(async () => {
  let filteredData = [];

  const data = await useGetRelatedItems(props.id);
  data.forEach((item) => {
    const found = filteredData.find((obj) => obj.id === item.id);
    if (!found) filteredData.push(item);
  });

  relatedItems.value = filteredData.sort((a, b) => {
    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;
    if (a.available && !b.manufacturerstock) return -1;
    if (!a.available && b.manufacturerstock) return 1;
    if (!a.available && !b.manufacturerstock) return -1;
    return 0;
  });
});

const emptyObjectCheck = (array) => {
  const hasEmptyObject = array.some((obj) => Object.keys(obj).length === 0);
  return hasEmptyObject ? [] : array;
};
</script>
