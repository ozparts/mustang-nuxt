<template>
  <section class="relative mx-auto text-center">
    <h2
      class="py-3 font-open-sans text-lg font-bold uppercase text-[#040503] sm:!py-11 sm:text-[32px]"
    >
      Variants
    </h2>
    <!-- <div class="grid grid-cols-1 grid-rows-none min-[540px]:hidden">
      <HomeSectionVariantsMobile
        :data="variant"
        v-for="variant in variantsWithHorsepower"
      />
    </div> -->
    <div class="pb-10 mx-auto min-[539px]:block">
      <div class="relative">
        <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
          :breakpoints="{
            '540': {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            '640': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            '768': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            '1024': {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }"
          :autoplay="{
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          :pagination="{
            clickable: true,
          }"
          :navigation="{
            nextEl: '.slide-next-variants',
            prevEl: '.slide-prev-variants',
          }"
          :slidesPerView="1"
        >
          <SwiperSlide
            v-for="variant in variantsWithHorsepower"
            :key="variant.variant"
            class="pb-7"
          >
            <nuxt-link
              :to="`/catalogue/${variant.variant}`"
              class="group mx-auto flex w-[200px] flex-col overflow-hidden rounded-lg border border-mustangLightGrey bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <figure
                class="flex h-[140px] items-center justify-center bg-mustangLightGrey"
              >
                <nuxt-img
                  v-if="
                    getVariantImage(variant.variant) &&
                    !imageErrors.has(variant.variant)
                  "
                  :src="`/images/variants/${getVariantImage(variant.variant)}`"
                  width="200px"
                  height="140px"
                  fit="cover"
                  format="webp"
                  loading="lazy"
                  :alt="`Mustang variant ${variant.variant}`"
                  @error="imageErrors.add(variant.variant)"
                  class="object-cover w-full h-full"
                />
                <div
                  v-else
                  class="flex flex-col items-center justify-center w-full h-full gap-1 text-gray-400"
                >
                  <Icon
                    name="material-symbols:image-not-supported-outline"
                    size="24px"
                  />
                  <p class="text-xs normal-case">No image available</p>
                </div>
              </figure>
              <div
                class="flex items-center justify-between gap-2 px-3 py-2 border-t border-mustangLightGrey"
              >
                <h3
                  class="truncate font-roboto text-sm font-bold uppercase text-[#040503]"
                >
                  {{ variant.variant }}
                </h3>
                <Icon
                  name="mingcute:arrows-right-line"
                  size="18px"
                  class="transition-transform duration-200 shrink-0 text-mustangRed group-hover:translate-x-1"
                />
              </div>
              <!-- <div class="flex flex-wrap gap-1 px-3 pb-3 font-open-sans">
                <span
                  v-for="hp in variant.horsePorwer"
                  :key="hp"
                  class="rounded-full bg-mustangLightGrey px-2 py-0.5 text-[11px] font-medium text-gray-600"
                >
                  {{ hp }}
                </span>
              </div> -->
            </nuxt-link>
          </SwiperSlide>
        </Swiper>
        <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-[140px]">
          <button
            type="button"
            aria-label="Previous variant"
            class="pointer-events-auto absolute left-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-mustangLightGrey bg-white text-mustangRed shadow-md transition-all duration-200 hover:bg-mustangRed hover:text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-0 sm:left-2 sm:size-10 slide-prev-variants"
          >
            <Icon name="mingcute:left-line" size="20px" />
          </button>
          <button
            type="button"
            aria-label="Next variant"
            class="pointer-events-auto absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-mustangLightGrey bg-white text-mustangRed shadow-md transition-all duration-200 hover:bg-mustangRed hover:text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-0 sm:right-2 sm:size-10 slide-next-variants"
          >
            <Icon name="mingcute:right-line" size="20px" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  variantsWithHorsepower: Array,
});

const imageErrors = reactive(new Set());

const variantImages = {
  "2.3 EcoBoost": "mustang-performance-2.3-ecoboost.jpg",
  "3.7 V6": "mustang-performance-3.7-v6.jpg",
  "5.0 Bullitt": "mustang-performance-5.0-bullitt.jpg",
  "5.0 GT": "mustang-performance-5.0-gt.jpg",
  "5.0": "mustang-performance-5.0.jpg",
  "5.2 Shelby GT500": "mustang-performance-5.2-v8-shelby.jpg",
};

const getVariantImage = (variant) => variantImages[variant];

const checkVariant = (variant) => {
  const split = variant.split(" ");

  if (split.length === 1) {
    return split;
  } else {
    return split;
  }
};
</script>

<style scoped>
:deep(.swiper-pagination) {
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  margin: 0 !important;
  background-color: #d1d5db;
  opacity: 1;
  border-radius: 9999px;
  transition: all 0.2s ease;
}

:deep(.swiper-pagination-bullet-active) {
  width: 22px;
  background-color: #c22025;
}
</style>
