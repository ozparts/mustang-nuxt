<template>
  <div
    class="mx-auto flex h-[40px] items-center font-nunito text-[12px] sm:!mx-0 sm:text-base md:text-base"
  >
    <Icon
      :name="getDeliveryIcon"
      :color="props.productStatus === 'outOfStock' ? 'red' : '#38C659'"
      :size="iconSize"
    />
    <p class="mx-1 sm:mx-2">{{ availabilityStatusInfo }}</p>
    <div
      class="daisy-tooltip daisy-tooltip-left flex cursor-pointer items-center text-xs sm:daisy-tooltip-top before:text-xs before:content-[attr(data-tip)] before:sm:!text-sm"
      :data-tip="`Expected in stock: ${arrivalDate}.`"
      v-if="props.productStatus === 'inTransit'"
    >
      <Icon name="radix-icons:question-mark-circled" :size="iconSize" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "availabilityStatusInfo",
  "productStatus",
  "arrivalDate",
]);
const windoWidth = ref(null);

const iconSize = computed(() => {
  return windoWidth.value > 320 ? "24px" : "20px";
});

onMounted(() => {
  windoWidth.value = window.innerWidth;
  window.addEventListener("resize", () => {
    windoWidth.value = window.innerWidth;
  });
});

const deliveryIcons = {
  air: "mdi:airplane-clock",
  inStock: "ic:sharp-check",
  outOfStock: "iconamoon:unavailable-light",
  inTransit: "carbon:delivery",
};

const getDeliveryIcon = computed(() => {
  return deliveryIcons[props.productStatus];
});
</script>
