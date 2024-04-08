<template>
  <p class="px-1 font-bold text-center">
    {{
      product.groupdescription ||
      product.categorydescription ||
      product.manufacturer
    }}
  </p>
  <div class="flex flex-col justify-start w-full gap-1 px-1">
    <p class="block text-[15px] font-normal text-center text-red-600 uppercase">
      {{ product.name }}
    </p>
  </div>
  <div class="flex items-center justify-center px-1">
    <img
      v-if="product.photos.length"
      :src="`${product.photos[0].url}`"
      width="120px"
      height="120px"
      background="white"
      fit="contain"
      class="w-[120px] h-[120px] object-contain bg-white"
    />
    <nuxt-img
      v-else
      src="/mustang/no_image.jpg"
      format="webp"
      alt="No image"
      provider="cloudinary"
      class="aspect-square h-[120px] w-[120px] object-contain"
    />
  </div>

  <div
    class="px-1 mb-auto text-[13px] font-light text-center justify-self-stretch"
  >
    {{ product.description }}
  </div>
  <div>
    <InStock v-if="product.available" size="1.2rem" />
    <ToOrder
      size="1.2rem"
      v-else-if="product.manufacturerstock || product.manufacturerstock2"
    />
    <OutOfStock v-else size="1.2rem" />
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});
</script>
