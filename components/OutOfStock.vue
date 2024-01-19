<template>
  <div>
    <div class="flex items-center justify-center bg-[#FFCCCC] py-2 text-center">
      <Icon name="solar:danger-circle-outline" color="#FF3333" :size="size" />
      <span class="ml-2">Out Of Stock</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["size"]);
</script>
