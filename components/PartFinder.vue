<template>
  <div class="absolute top-[12px] right-[15px] hidden md:!block">
    <div
      @click="() => navigateTo(`/catalogue`)"
      class="relative cursor-pointer inline-block px-4 py-2.5 text-lg font-bold tracking-[3.5px] text-white uppercase bg-red-600/80 font-nunito"
    >
      part finder
    </div>
  </div>
  <!-- <Transition>
    <Search v-show="state.search" @close="state.search = false" />
  </Transition> -->
</template>

<script setup>
const state = reactive({
  search: false,
});
</script>
