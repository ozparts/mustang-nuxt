<template>
  <section class="mx-auto max-w-[1140px]">
    <div class="relative my-5 overflow-hidden">
      <div
        class="absolute sm:block bottom-0 left-[-230px] right-[68%] top-0 h-full skew-x-[31deg] transform bg-[#fff101] opacity-[0.75]"
      ></div>
      <figure
        class="flex max-h-[500px] items-end justify-center overflow-hidden"
      >
        <nuxt-img
          class="xs:max-w-[639px] sm:max-w-[767px] md:max-w-[1110px] h-[170px] min-[400px]:!h-auto max-h-[493px]"
          format="webp"
          alt="Mustang Performance"
          src="/banner/mustang_banner.webp"
          fit="contain"
        />
      </figure>

      <div
        class="absolute bottom-[16%] ml-2 w-[30%] text-white min-[500px]:bottom-[20%] min-[500px]:left-[2.5%]"
      >
        <h1
          class="font-nunito-sans text-[10px] min-[374px]:text-xs min-[550px]:text-base sm:text-xl font-medium uppercase italic tracking-wider min-[450px]:text-sm md:text-2xl min-[900px]:text-3xl lg:text-[34px]"
        >
          <p class="md:mb-1">sharing</p>
          <p class="md:mb-3">our passion</p>
          <p class="md:mb-2">for mustangs</p>
        </h1>
      </div>

      <div
        class="flex w-[40%] min-[359px]:w-[34%] min-[550px]:left-[10%] md:w-[220px] lg:w-[250px] xs:w-[120px] min-[500px]:w-[160px] sm:w-[170px] font-bolder min-[500px]:flex font-roboto absolute bottom-[2.5%] min-[359px]:left-[5%] left-[2%] skew-x-[31deg] items-center bg-[#040503] uppercase text-white"
      >
        <div
          class="text-center font-light cursor-pointer basis-[75%] skew-x-[-31deg] text-[8px] min-[500px]:text-[11px] md:text-[13px] lg:text-sm sm:font-bold font-nunito-sans"
          @click="
            () => {
              navigateTo('/catalogue');
            }
          "
        >
          Explore the range
        </div>
        <div
          class="relative flex items-center justify-center text-center md:py-1.5 basis-[25%] font-bold"
        >
          <p
            class="absolute left-0 top-0 h-full w-full bg-[#fff101] opacity-[0.75]"
          ></p>
          <icon
            name="mingcute:arrows-right-line"
            :size="width"
            class="skew-x-[-31deg]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const width = ref();

onMounted(() => {
  width.value = window.innerWidth > 500 ? "28px" : "14px";
  onScreenResize();
});

const onScreenResize = () => {
  window.addEventListener("resize", () => {
    updateScreenWidth();
  });
};

const updateScreenWidth = () => {
  width.value = window.innerWidth > 500 ? "28px" : "14px";
};
</script>
