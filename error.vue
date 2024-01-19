<template>
  <div class="grid h-screen px-4 bg-white place-content-center font-roboto">
    <div class="text-center">
      <h1 class="font-black text-black text-9xl">{{ error.statusCode }}</h1>

      <p class="mt-4 text-black">
        {{ error.message }}
      </p>

      <button
        @click="errorHandler"
        class="my-5 text-white daisy-btn daisy-btn-primary font-nunito"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["error"]);

const errorHandler = () => {
  clearError({ redirect: "/" });
};
</script>
