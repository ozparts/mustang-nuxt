<template>
  <section class="text-gray-600 font-nunito">
    <Banner :title="state.brand.name" />
    <div
      v-if="state.brand"
      class="container flex px-2 flex-col items-start py-5 mx-auto md:!py-10 md:flex-row"
    >
      <div
        class="flex flex-col items-center mb-10 text-left lg:flex-grow md:w-1/2 lg:pr-10 md:!pr-16 md:items-start md:!text-left md:!mb-0"
      >
        <h1 class="mb-4 font-medium text-black sm:text-lg">
          {{ state.brand.description.header }}
        </h1>
        <p class="text-sm leading-relaxed sm:text-base">
          {{ state.brand.description.body }}
        </p>
        <div class="daisy-divider"></div>
        <div class="flex justify-center gap-5">
          <NuxtLink
            v-if="state.brand.media.youTube"
            :to="`${state.brand.media.youTube}`"
            target="_blank"
            class="flex items-center gap-2"
          >
            <p>Check our YouTube channel</p>
            <Icon name="logos:youtube-icon" size="34px" />
          </NuxtLink>
        </div>
      </div>

      <div class="w-5/6 mx-auto lg:max-w-lg lg:w-full md:w-1/2">
        <NuxtImg
          format="webp"
          width="550px"
          provider="cloudinary"
          class="object-cover object-center"
          fit="contain"
          :alt="state.brand.name"
          :src="`/mustang/brands/${state.brand.linkKey}.webp`"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { BRANDS } from "../../vars/brands";
const name = useRoute().path;

const state = reactive({
  brand: "",
});

onMounted(() => {
  getbrandName();
});

const getbrandName = () => {
  const data = name.split("/");
  const brandName = data[data.length - 1];
  state.brand = BRANDS[brandName.toLocaleUpperCase()];
};
</script>
