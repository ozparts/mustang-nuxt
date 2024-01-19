<template>
  <div v-if="loader" class="w-[calc(100%_-_64px)]">
    <v-progress-linear
      color="red"
      indeterminate
      rounded
      height="4"
    ></v-progress-linear>
  </div>
</template>

<script setup>
const props = defineProps(["loader"]);
const loader = computed(() => props.loader);
</script>
