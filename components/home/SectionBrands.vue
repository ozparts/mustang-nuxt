<template>
  <section class="relative pb-8 text-center bg-white">
    <div>
      <h2
        class="bg-[#ededed] py-4 font-open-sans text-lg font-bold uppercase text-[#040503] sm:!py-11 sm:text-[32px]"
      >
        Our brands
      </h2>

      <div class="my-3">
        <div class="relative">
          <Swiper
            :slidesPerView="2"
            :spaceBetween="12"
            :freeMode="true"
            :breakpoints="{
              '560': {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              '768': {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              '1024': {
                slidesPerView: 5,
                spaceBetween: 20,
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
              nextEl: '.slide-next-brands',
              prevEl: '.slide-prev-brands',
            }"
            :modules="[
              SwiperFreeMode,
              SwiperNavigation,
              SwiperAutoplay,
              SwiperPagination,
            ]"
          >
            <SwiperSlide v-for="brand in BRANDS">
              <div
                class="flex h-[100px] w-[140px] md:w-[160px] lg:w-[200px] items-center justify-center overflow-hidden bg-white"
              >
                <nuxt-link :to="`brands/${brand.linkKey}`">
                  <nuxt-img
                    format="webp"
                    :src="`/mustang/brands/${brand.linkKey}.webp`"
                    :alt="brand.name"
                    height="100px"
                    width="100%"
                    fit="contain"
                    loading="lazy"
                    background="white"
                    provider="cloudinary"
                  />
                </nuxt-link>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-[100px]">
            <button
              type="button"
              aria-label="Previous brand"
              class="pointer-events-auto absolute left-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-mustangLightGrey bg-white text-mustangRed shadow-md transition-all duration-200 hover:bg-mustangRed hover:text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-0 sm:left-2 sm:size-10 slide-prev-brands"
            >
              <Icon name="mingcute:left-line" size="20px" />
            </button>
            <button
              type="button"
              aria-label="Next brand"
              class="pointer-events-auto absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-mustangLightGrey bg-white text-mustangRed shadow-md transition-all duration-200 hover:bg-mustangRed hover:text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-0 sm:right-2 sm:size-10 slide-next-brands"
            >
              <Icon name="mingcute:right-line" size="20px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="h-[20px] bg-[#EDEDED] sm:h-[40px]"></div>
</template>

<script setup>
import { BRANDS } from "../../vars/brands";
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
