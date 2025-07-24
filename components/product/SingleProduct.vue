<template>
  <div class="flex flex-col h-full font-nunito-sans">
    <div class="flex flex-col">
      <div class="flex justify-center">
        <div
          v-if="product.item.photos.length"
          class="w-[170px] h-[170px] bg-white flex justify-center overflow-hidden items-center"
        >
          <nuxt-img
            format="webp"
            width="180px"
            :src="`${product.item.photos[0].url}`"
            class="block bg-white h-[170px] w-[170px] object-contain"
            :alt="product.item.urlcomponent"
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
        class="flex flex-col pt-4 text-sm font-semibold text-center"
        v-if="
          product.item.manufacturergroup === Manufacturers.DBA.id &&
          product.categorydescription &&
          product.item.recordtype !== 'kititem'
        "
      >
        <p>{{ product.note || "Brake Caliper:" }}</p>
        <p>{{ product.parameter }}</p>
        <p>{{ product.description || "Brake Pads:" }}</p>
      </div>
      <div
        v-else-if="product.item.manufacturergroup === Manufacturers.PEDDERS.id"
        class="flex flex-col pt-4 text-sm font-semibold text-center"
      >
        <p>Parameter: {{ product.parameter }}</p>
      </div>
      <div class="w-full mt-4 mb-2">
        <InStock
          v-if="
            product.item.availabledetails[0].multilocationavailable ||
            product.item.available
          "
          size="26px"
        />
        <CheckAvailability size="26px" v-else />
      </div>
    </div>

    <div>
      <div class="flex flex-col justify-between px-2">
        <p
          class="mt-2 block w-full text-center text-[18px] font-medium uppercase text-red-600"
        >
          {{ product.item.name }}
        </p>
        <div class="my-2 text-sm text-center font-poppins">
          {{ product.item.description }}
        </div>
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
