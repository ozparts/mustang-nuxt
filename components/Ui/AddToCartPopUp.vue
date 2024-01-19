<template>
  <section class="p-1">
    <div class="z-20 daisy-toast daisy-toast-center daisy-toast-top">
      <div class="daisy-alert bg-mustangRed font-nunito">
        <span class="text-sm font-semibold text-white sm:!text-lg"
          >{{ name }} added to the cart</span
        >
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["name"]);
</script>
