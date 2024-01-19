<template>
  <dialog
    id="dealerEnquiryModal"
    class="daisy-modal daisy-modal-middle sm:daisy-modal-middle"
  >
    <div class="p-4 daisy-modal-box font-nunito">
      <h3 class="mb-3 text-base font-bold text-center sm:text-lg">
        {{ title }}
      </h3>
      <p class="mb-3 text-sm text-center sm:py-4 sm:text-base">{{ info }}</p>
      <div class="daisy-modal-action">
        <form method="dialog">
          <button class="daisy-btn daisy-btn-sm sm:daisy-btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
const props = defineProps(["info", "title"]);
</script>
