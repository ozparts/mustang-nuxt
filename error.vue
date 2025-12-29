<template>
  <div v-if="error" class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
    <div class="w-full max-w-md text-center">
      <h1 class="text-6xl font-bold text-gray-300 mb-4">
        {{ error.statusCode || '500' }}
      </h1>

      <p class="text-lg text-gray-700 mb-8">
        {{ error.statusMessage || "Something went wrong" }}
      </p>

      <button
        @click="handleClearError"
        class="px-6 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleClearError = async () => {
  await clearError({ redirect: "/" });
};
</script>
