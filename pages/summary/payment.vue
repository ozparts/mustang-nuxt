<template>
  <Navigation :route="name" />

  <div
    class="my-6 space-y-5 text-xl font-bold text-center uppercase sm:my-8 sm:text-2xl font-nunito"
  >
    <Icon
      name="material-symbols:check-circle-outline"
      size="64px"
      color="#4CAF50"
    ></Icon>
    <h2 class="mx-4">Thank you!</h2>
    <h2 class="mx-4">Your order has been paid</h2>
    <button
      class="font-semibold uppercase btn-red sm:btn-red daisy-btn daisy-btn-sm sm:daisy-btn hover:bg-red-800"
    >
      <NuxtLink to="/">Home Page</NuxtLink>
    </button>
  </div>
</template>

<script setup>
const route = useRoute();
const name = computed(() => route);
</script>
