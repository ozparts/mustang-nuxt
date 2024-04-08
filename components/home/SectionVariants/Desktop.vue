<template>
  <section class="relative mx-auto text-center">
    <p
      class="py-3 font-open-sans text-lg font-bold uppercase text-[#040503] sm:!py-11 sm:text-[32px]"
    >
      Variants
    </p>
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
        <SwiperSlide v-for="variant in variantsWithHorsepower" class="pb-7">
          <nuxt-link :to="`/catalogue/${variant.variant}`">
            <div class="flex items-center justify-center mb-2">
              <figure class="relative h-max-200px">
                <nuxt-img
                  :src="`/mustang/variants/${variant.variant
                    .replace(' ', '-')
                    .replace(' ', '-')}`"
                  width="200px"
                  height="130px"
                  fit="contain"
                  format="webp"
                  provider="cloudinary"
                  :alt="`Mustang variant ${variant.variant
                    .replace(' ', '-')
                    .replace(' ', '-')}`"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 top-[55%] flex overflow-hidden font-roboto"
                >
                  <div
                    class="ml-[-50px] flex w-[calc(50%+50px)] skew-x-[31deg] items-center justify-center bg-black text-white"
                  >
                    <div
                      v-if="variant.variant.split(' ').length === 1"
                      class="w-full skew-x-[-31deg] text-2xl font-bold"
                    >
                      {{ variant.variant }}
                    </div>
                    <div
                      v-else-if="variant.variant.split(' ').length === 2"
                      class="flex w-full skew-x-[-31deg] flex-col"
                    >
                      <span class="text-2xl font-bold text-center">
                        {{ variant.variant.split(" ")[0] }}
                      </span>
                      <span class="pl-6 font-bold text-center uppercase">
                        {{ variant.variant.split(" ")[1] }}
                      </span>
                    </div>
                    <div v-else class="flex skew-x-[-31deg] flex-col">
                      <span class="text-2xl font-bold text-center">{{
                        variant.variant.split(" ")[0]
                      }}</span>
                      <span class="pl-12 font-bold text-center uppercase">
                        {{ variant.variant.split(" ")[1] }}
                        {{ variant.variant.split(" ")[2] }}
                      </span>
                    </div>
                    <!-- <p class="skew-x-[-31deg] text-2xl font-semibold">
                      {{ variant.variant.split(" ")[1] }}
                    </p> -->
                  </div>
                  <div
                    class="absolute bottom-0 left-[55%] right-[3%] skew-x-[31deg] bg-[#fff101] opacity-90"
                  >
                    <p class="skew-x-[-31deg]">
                      <Icon
                        name="mingcute:arrows-right-line"
                        color="white"
                        size="24px"
                      />
                    </p>
                  </div>
                </div>
              </figure>
            </div>
            <!-- <p class="pb-4 text-xl font-semibold font-open-sans">
              Variant: {{ variant.variant }}
            </p> -->
            <p class="p-1 text-sm font-normal text-start font-open-sans">
              <span class="font-bold">Engine power:</span>
              {{ variant.horsePorwer?.join(", ") }}
            </p>
          </nuxt-link>
        </SwiperSlide>
      </Swiper>
      <div
        class="control-prev sm:size-[3em] absolute bottom-0 left-[35%] z-10 hidden pb-3 xs:block lg:hidden"
      >
        <Icon
          name="solar:map-arrow-left-outline"
          class="cursor-pointer slide-prev-variants"
          color="black"
          size="2em"
        />
      </div>
      <div
        class="control-next absolute bottom-0 right-[35%] z-10 hidden pb-3 xs:block lg:hidden"
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

const checkVariant = (variant) => {
  const split = variant.split(" ");

  if (split.length === 1) {
    return split;
  } else {
    return split;
  }
};
</script>
