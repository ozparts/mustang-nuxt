<template>
  <input type="checkbox" class="daisy-modal-toggle" :checked="checked" />
  <div class="daisy-modal" role="dialog">
    <div class="relative bg-white border-2 border-black">
      <nuxt-img
        :src="url"
        fit="contain"
        class="w-[90vw] md:max-w-[70vw] max-h-[85vh]"
      />
      <div class="absolute -top-5 right-2 daisy-modal-action">
        <button
          class="daisy-btn daisy-btn-circle daisy-btn-outline"
          @click="$emit('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["url", "checked"]);
const emit = defineEmits(["close"]);
const url = computed(() => {
  return props.url;
});
</script>
