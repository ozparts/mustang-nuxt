<template>
  <section class="pb-10">
    <h2
      class="py-4 text-center font-open-sans text-lg font-bold uppercase text-[#040503] sm:!py-10 sm:text-[32px]"
    >
      catalogue
    </h2>
    <div
      class="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-3"
    >
      <div class="font-open-sans">
        <label class="mb-1 ml-1 text-[10px] font-bold uppercase tracking-widest"
          >Make</label
        >
        <v-text-field
          type="text"
          density="compact"
          variant="outlined"
          value="FORD"
          :readonly="true"
        />
      </div>

      <div class="font-open-sans">
        <label class="mb-1 ml-1 text-[10px] font-bold uppercase tracking-widest"
          >Model</label
        >
        <v-text-field
          :readonly="true"
          type="text"
          density="compact"
          variant="outlined"
          value="MUSTANG VI"
        />
      </div>
      <div class="font-open-sans">
        <label class="mb-1 ml-1 text-[10px] font-bold uppercase tracking-widest"
          >Year</label
        >
        <v-select
          type="text"
          density="compact"
          variant="outlined"
          v-model="state.selectedYear"
          :items="store.getProductYears()"
        />
      </div>
      <div class="font-open-sans">
        <label class="mb-1 ml-1 text-[10px] font-bold uppercase tracking-widest"
          >Variant</label
        >
        <v-select
          type="text"
          :disabled="!state.selectedYear"
          density="compact"
          variant="outlined"
          v-model="state.selectedVariant"
          :items="state.variants"
        />
      </div>
      <div class="flex items-end font-open-sans">
        <v-btn
          color="#c22025"
          :style="{ height: '40px' }"
          block
          variant="flat"
          density="default"
          :disabled="!state.selectedVariant"
          @click="search"
          >Search</v-btn
        >
      </div>
    </div>
  </section>
</template>

<script setup>
const store = useStore();

const state = reactive({
  selectedVariant: "",
  selectedYear: "",
  variants: [],
});

watch(
  () => state.selectedYear,

  async () => {
    state.selectedVariant = "";
    const { options } = await useGetProductsToCatalogue(
      state.selectedYear,
      false
    );
    state.variants = options.variant.sort();
  }
);

const search = () => {
  navigateTo(
    `/catalogue/?year=${state.selectedYear}&variant=${state.selectedVariant}`
  );
};
</script>

<style scoped>
.v-text-field :deep(input) {
  font-size: 13px;
  font-weight: 700;
}

:deep(.v-btn__content) {
  font-size: 11px !important;
  font-weight: 400 !important;
}
:deep(.v-input__details) {
  display: none !important;
}
:deep(.v-select__selection-text) {
  font-size: 12px;
  font-weight: 700;
}
</style>
