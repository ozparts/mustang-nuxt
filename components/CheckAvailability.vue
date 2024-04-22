<template>
  <div>
    <div class="flex items-center justify-center bg-[#FFEACD] py-2 text-center">
      <Icon name="carbon:help" color="#FF9800" :size="size" />
      <span class="ml-2">Check availability</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["size"]);
</script>
