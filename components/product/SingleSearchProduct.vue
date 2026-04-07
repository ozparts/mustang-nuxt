<template>
  <div class="flex flex-col items-center border border-black font-nunito-sans">
    <div class="flex justify-center px-1">
      <div
        v-if="product.photos.length"
        class="w-[150px] h-[150px] bg-white object-contain flex justify-center items-center"
      >
        <img
          :src="`${product.photos[0].url}`"
          alt=""
          class="bg-white w-[150px] h-[150px] object-contain"
        />
      </div>
      <nuxt-img
        v-else
        src="/mustang/no_image.jpg"
        format="webp"
        alt="No image"
        provider="cloudinary"
        width="150"
        height="150"
        fit="contain"
      />
    </div>
    <div class="w-full mt-4 mb-2">
      <InStock v-if="product.available" size="26px" />
      <ToOrder
        size="26px"
        v-else-if="product.manufacturerstock || product.manufacturerstock2"
      />
      <OutOfStock v-else size="26px" />
    </div>

    <div>
      <nuxt-link
        :to="`/product/${product.urlcomponent}/`"
        class="my-2 px-1 block w-full text-center text-[18px] font-medium uppercase text-red-600"
        >{{ product.name }}</nuxt-link
      >
      <div class="px-1 my-2 text-sm text-center">
        {{ product.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>
