<template>
  <div class="flex items-center justify-center bg-[#CCFFCC] py-2 text-center">
    <Icon
      name="streamline:interface-validation-check-circle-checkmark-addition-circle-success-check-validation-add-form"
      color="#4CAF50"
      :size="size"
    />
    <span class="ml-2">In stock</span>
  </div>
</template>

<script setup>
const props = defineProps(["size"]);
</script>
