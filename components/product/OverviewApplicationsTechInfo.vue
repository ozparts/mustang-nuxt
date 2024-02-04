<template>
  <div class="grid w-full gap-2 mt-5 sm:!mt-10 md:grid-cols-3">
    <h3
      :class="state.overview ? 'active' : ''"
      class="cursor-pointer rounded-lg bg-mustangRed py-2 text-center transition-colors duration-300 font-nunito text-sm font-semibold uppercase text-white hover:bg-[#C0C0C0] hover:text-mustangRed lg:text-base"
      @click="() => toggle('overview')"
    >
      overview
    </h3>
    <h3
      :class="state.applications ? 'active' : ''"
      class="cursor-pointer rounded-lg bg-mustangRed py-2 text-center transition-colors duration-300 font-nunito text-sm font-semibold uppercase text-white hover:bg-[#C0C0C0] hover:text-mustangRed lg:text-base"
      @click="() => toggle('applications')"
    >
      applications
    </h3>
    <h3
      :class="state.techInfo ? 'active' : ''"
      class="cursor-pointer rounded-lg bg-mustangRed py-2 text-center transition-colors duration-300 font-nunito text-sm font-semibold uppercase text-white hover:bg-[#C0C0C0] hover:text-mustangRed lg:text-base"
      @click="() => toggle('techInfo')"
    >
      technical information
    </h3>
  </div>

  <ProductOverview
    v-if="state.overview"
    :overviewInfo="product.detaildescription"
    :product="product"
  />
  <ProductApplications v-else-if="state.applications" :id="props.product.id" />
  <ProductTechnicalInfo
    v-else
    :product="product"
    :weight="weight"
    :kitItem="kitItem"
  />
</template>

<script setup>
const props = defineProps(["product", "weight", "kitItem"]);
const text = ref("technical information");

const state = reactive({
  overview: true,
  applications: false,
  techInfo: false,
});

const toggle = (section) => {
  for (const key in state) {
    state[key] = false;
  }
  state[section] = state[section] = true;
};
</script>

<style scoped>
.active {
  background-color: #c0c0c0;
  color: #c22025;
}
</style>
