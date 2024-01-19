<template>
  <div
    class="flex flex-col gap-2 p-4 !border font-nunito-sans !border-mustangRed"
  >
    <div v-if="!promoCode" class="flex flex-col gap-5">
      <p class="text-lg text-center">Apply promo code</p>
      <v-text-field
        v-model="state.newCode"
        label="Enter promo code"
        density="compact"
        variant="outlined"
        hide-details="true"
        color="mustangRed"
      ></v-text-field>
      <button
        @click="promoCodeHandler"
        class="bg-gray-300 daisy-btn daisy-btn-block daisy-btn-sm"
      >
        {{ "Apply code" }}
      </button>
    </div>
    <div v-else class="flex flex-col gap-5">
      <p class="text-lg text-center">
        Current promo code:
        <span class="font-bold">
          {{ promoCode }}
        </span>
      </p>
      <button
        @click="promoCodeHandler"
        class="bg-gray-300 daisy-btn daisy-btn-sm"
      >
        {{ "Change code" }}
      </button>
    </div>
  </div>
</template>

<script setup>
const { promoCode } = defineProps(["promoCode"]);
const emit = defineEmits(["promoCodeHandler"]);
const state = reactive({
  newCode: "",
});

const promoCodeHandler = async () => {
  emit("promoCodeHandler", state.newCode);
  state.newCode = "";
};
</script>

<style lang="scss" scoped></style>
