<template>
  <div>
    <div class="flex items-center justify-center bg-[#FFEACD] py-2 text-center">
      <Icon name="carbon:delivery" color="#FF9800" :size="size" />
      <span class="ml-2">Ready to order</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["size"]);
</script>
