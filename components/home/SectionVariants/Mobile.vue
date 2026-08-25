<template>
  <nuxt-link
    :to="`/catalogue/${data.variant}`"
    class="mx-auto mb-3 flex w-[250px] flex-col overflow-hidden rounded-lg border border-mustangLightGrey bg-white text-left shadow-sm transition-shadow duration-200 active:shadow-md"
  >
    <figure
      class="flex h-[150px] items-center justify-center bg-mustangLightGrey"
    >
      <nuxt-img
        v-if="getVariantImage(data.variant) && !imageError"
        :src="`/images/variants/${getVariantImage(data.variant)}`"
        width="250px"
        height="150px"
        fit="contain"
        format="webp"
        loading="lazy"
        :alt="`Mustang variant ${data.variant}`"
        @error="imageError = true"
        class="object-contain w-full h-full"
      />
      <div
        v-else
        class="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400"
      >
        <Icon name="material-symbols:image-not-supported-outline" size="24px" />
        <p class="text-xs normal-case">No image available</p>
      </div>
    </figure>
    <div
      class="flex items-center justify-between gap-2 px-3 py-2 border-t border-mustangLightGrey"
    >
      <h3
        class="truncate font-roboto text-sm font-bold uppercase text-[#040503]"
      >
        {{ data.variant }}
      </h3>
      <Icon
        name="mingcute:arrows-right-line"
        size="18px"
        class="shrink-0 text-mustangRed"
      />
    </div>
    <div class="flex flex-wrap gap-1 px-3 pb-3 font-open-sans">
      <span
        v-for="hp in data.horsePorwer"
        :key="hp"
        class="rounded-full bg-mustangLightGrey px-2 py-0.5 text-[11px] font-medium text-gray-600"
      >
        {{ hp }}
      </span>
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps(["data"]);

const imageError = ref(false);

const variantImages = {
  "2.3 EcoBoost": "mustang-performance-2.3-ecoboost.jpg",
  "3.7 V6": "mustang-performance-3.7-v6.jpg",
  "5.0 Bullitt": "mustang-performance-5.0-bullitt.jpg",
  "5.0 GT": "mustang-performance-5.0-gt.jpg",
  "5.0": "mustang-performance-5.0.jpg",
  "5.2 Shelby GT500": "mustang-performance-5.2-v8-shelby.jpg",
};

const getVariantImage = (variant) => variantImages[variant];
</script>
