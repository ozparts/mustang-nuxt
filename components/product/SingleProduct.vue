<template>
  <div class="flex flex-col h-full font-nunito-sans">
    <div class="flex justify-center">
      <div
        v-if="product.item.photos.length"
        class="w-[170px] h-[170px] bg-white flex justify-center overflow-hidden items-center"
      >
        <!-- <nuxt-img
          :src="`${product.item.photos[0].url}`"
          alt=""
          fit="contain"
          width="180"
          height="180"
          background:true
          background="white"
          class="w-[180px] h-[180px] object-contain"
          loading="lazy"
        /> -->
        <img
          :src="`${product.item.photos[0].url}`"
          class="block bg-white h-[170px] w-[170px] object-contain"
          alt=""
        />
      </div>

      <nuxt-img
        v-else
        format="webp"
        alt="No image"
        src="/mustang/no_image.jpg"
        provider="cloudinary"
        width="170"
        height="170"
        fit="contain"
        class="w-[170px] h-[170px] object-contain"
      />
    </div>
    <div
      class="flex flex-col mb-auto text-sm font-semibold text-center"
      v-if="
        product.item.manufacturergroup === Manufacturers.DBA.id &&
        product.categorydescription
      "
    >
      <p>{{ product.note }}</p>
      <p>{{ product.parameter }}</p>
      <p>{{ product.description }}</p>
    </div>

    <div class="w-full mt-4 mb-2">
      <InStock v-if="product.item.available" size="26px" />
      <ToOrder
        size="26px"
        v-else-if="
          product.item.manufacturerstock || product.item.manufacturerstock2
        "
      />
      <OutOfStock v-else size="26px" />
    </div>

    <div class="flex flex-col">
      <p
        class="my-2 px-1 block w-full text-center text-[18px] font-medium uppercase text-red-600"
      >
        {{ product.item.name }}
      </p>
      <div class="px-1 my-2 text-sm text-center font-poppins">
        {{ product.item.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { Manufacturers } from "../../vars/index";
const { product } = defineProps({
  product: Object,
});
</script>
