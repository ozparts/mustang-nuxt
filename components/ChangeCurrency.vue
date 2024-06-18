<template>
  <div class="text-sm sm:text-base">
    <dialog id="my_modal_1" class="daisy-modal">
      <div class="daisy-modal-box font-nunito">
        <h3 class="text-base font-bold sm:text-lg">
          Would you like to change order currency?
        </h3>
        <p class="py-4">
          It seems that selected delivery address country could use
          <span class="font-bold uppercase"> {{ props.currency }}</span> instead
          of
          <span class="font-bold uppercase">
            {{ props.currency === "pln" ? "EUR" : "PLN" }} </span
          >. Would you like to change the currency?
        </p>
        <div class="daisy-modal-action">
          <form method="dialog" class="flex justify-between w-full">
            <button
              class="text-white normal-case bg-red-600 daisy-btn daisy-btn-sm sm:text-base"
              @click="handleChange(true)"
            >
              Yes, change to
              <span class="font-bold uppercase"> {{ props.currency }}</span>
            </button>
            <button
              class="normal-case daisy-btn-sm daisy-btn sm:text-base"
              @click="handleChange(false)"
            >
              No
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const props = defineProps(["changeCurrency", "currency"]);
const emit = defineEmits(["clicked"]);
const handleChange = (val) => {
  emit("clicked", val);
};

watch(
  () => props.changeCurrency,
  () => {
    if (props.changeCurrency) {
      my_modal_1.showModal();
    }
  }
);
</script>
