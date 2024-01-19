<template>
  <section
    class="mx-auto bg-gradient-to-tl from-gray-200 via-white to-gray-200 flex items-center justify-center p-[30px] sm:!h-[20vh]"
  >
    <div>
      <h1
        class="rounded-lg bg-mustangRed px-5 py-2.5 text-center font-roboto text-sm font-semibold uppercase italic text-white sm:!text-xl"
      >
        {{ title }}
      </h1>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>
