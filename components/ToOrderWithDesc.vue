<template>
  <div>
    <div
      class="flex items-center justify-around border-2 border-[#FF9800] p-2 text-center"
    >
      <div class="hover-trigger group relative">
        <Icon
          name="teenyicons:exclamation-circle-outline"
          :size="size"
          color="#FF9800"
          class="cursor-pointer"
        />
        <span
          class="absolute left-0 top-0 -translate-y-full transform whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          >Extra costs may be charged</span
        >
      </div>
      <span class="hover: font-light"
        >Available in 14-21 days with air freight</span
      >
      <Icon name="carbon:delivery" color="#FF9800" :size="size" />
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps({
  size: String,
});
</script>
