<template>
  <div class="grid h-screen px-4 bg-white place-content-center font-roboto">
    <div class="text-center">
      <h1 class="font-black text-black text-9xl">
        {{ error?.statusCode || "404" }}
      </h1>
      <p class="mt-4 text-black">
        {{ pageMessage }}
      </p>
      <button
        @click="handleBackToHome"
        class="my-5 text-white daisy-btn daisy-btn-primary font-nunito"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script setup>
const page = ref(null);
const message = ref(null);

const props = defineProps({
  error: {
    type: Object,
  },
});

const errorMessages = {
  product: {
    incorrect: "Incorrect product number",
    default: "Product is not available",
  },
  default: "Page not found",
};

const pageMessage = computed(() => {
  if (page.value === "product") {
    return (
      errorMessages.product[message.value] || errorMessages.product.default
    );
  }
  return errorMessages.default;
});

const handleBackToHome = () => {
  clearError({ redirect: "/" });
};

onMounted(() => {
  if (process.client) {
    const url = new URL(window.location.href);
    page.value = url.searchParams.get("page");
    message.value = url.searchParams.get("message");
  }
});
</script>
