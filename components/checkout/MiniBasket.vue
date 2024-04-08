<template>
  <div
    class="grid grid-cols-[100px_auto] sm:!grid-cols-[120px_auto] gap-2 px-1 py-4 font-nunito"
  >
    <div
      class="self-start p-1 border-[1px] border-mustangRed"
      :class="
        `${item.item.recordtype}` === 'service' ? 'bg-[#F6F6F6]' : 'bg-[white]'
      "
    >
      <nuxt-img
        v-if="item.item.photos[0]"
        :alt="item.item.urlcomponent"
        :src="`${item.item.photos[0].url}`"
        format="webp"
        width="125px"
        class="w-[100px] sm:!w-[120px] object-contain h-[100px]"
        :class="item.item.recordtype === 'service' ? '#F6F6F6' : 'white'"
      />
      <nuxt-img
        v-else
        src="/mustang/no_image.jpg"
        format="webp"
        alt="No image"
        provider="cloudinary"
        width="120px"
        height="100px"
        fit="contain"
        sizes="100px sm:120px"
        background="white"
      />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-1">
        <span class="text-sm font-bold sm:text-lg">
          {{ item.item.name }}
        </span>
        <span class="text-xs sm:text-sm"> {{ item.item.description }} </span>
      </div>

      <div class="flex gap-4 text-[13px] sm:gap-4 sm:text-sm">
        <div class="flex-col text-center">
          <p class="font-bold text-mustangRed">Quantity:</p>
          <p class="font-bold">{{ item.quantity }}</p>
        </div>

        <div class="flex-col text-center">
          <p class="font-bold text-mustangRed">Unit price:</p>
          <p class="font-bold">{{ currency }} {{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { item, currency } = defineProps(["item", "currency"]);
</script>
