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
                class="object-contain w-full h-full"
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
      <div
        class="control-prev sm:size-[3em] absolute bottom-0 left-[35%] z-1 hidden pb-3 xs:block lg:hidden"
      >
        <Icon
          name="solar:map-arrow-left-outline"
          class="cursor-pointer slide-prev-variants"
          color="black"
          size="2em"
        />
      </div>
      <div
        class="control-next absolute bottom-0 right-[35%] z-1 hidden pb-3 xs:block lg:hidden"
      >
        <Icon
          name="solar:map-arrow-right-outline"
          class="cursor-pointer slide-next-variants"
          color="black"
          size="2em"
        />
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
