<template>
  <div class="flex flex-col mx-auto text-xs font-nunito sm:!mx-0 sm:text-base">
    <div class="flex items-center mb-2">
      <Icon
        :name="
          showDeliveryInfo
            ? 'mdi-checkbox-marked-circle-outline'
            : 'mdi-close-circle'
        "
        :color="productInfo.av.color"
        :size="iconSize"
        :aria-hidden="true"
      />
      <p class="mx-1 sm:mx-2">{{ productInfo.av.message }}</p>
    </div>
    <div v-if="showDeliveryInfo" class="flex items-center">
      <Icon
        name="carbon:delivery"
        :color="productInfo.av.color"
        :size="iconSize"
        :aria-hidden="true"
      />
      <p class="mx-1 sm:mx-2">{{ productInfo.av.days }}</p>

      <Icon
        v-if="isAirfreight"
        name="carbon:information"
        :color="productInfo.av.color"
        class="ml-1 text-gray-500 size-4 cursor-help hover:text-gray-700"
        @mouseenter="showMessage = true"
        @mouseleave="showMessage = false"
        @click="showMessage = !showMessage"
      />
    </div>
    <p>{{ productInfo.av.case }}</p>
    <div
      v-if="isAirfreight && showMessage"
      class="p-3 mt-2 text-xs text-blue-800 rounded-lg bg-blue-50"
    >
      <p>{{ productInfo.av.badgeText }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  productInfo: {
    type: Object,
    required: true,
  },
});

const windowWidth = ref(0);
const showMessage = ref(false);

const showDeliveryInfo = computed(() => {
  return props.productInfo.av.case !== "outofstock";
});

const iconSize = computed(() => {
  return windowWidth.value >= 640 ? "24px" : "20px";
});

const isAirfreight = computed(() => {
  return props.productInfo.av.case === "airfreight";
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  if (process.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", handleResize);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>
