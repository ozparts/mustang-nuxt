<template>
  <section class="relative pb-8 text-center bg-white">
    <div>
      <h3
        class="bg-[#ededed] py-4 font-open-sans text-lg font-bold uppercase text-[#040503] sm:!py-11 sm:text-[32px]"
      >
        Our brands
      </h3>

      <div class="my-3">
        <Swiper
          class="absolute h-[150px]"
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
              class="flex h-[100px] items-center justify-center overflow-hidden bg-white"
            >
              <nuxt-link :to="`brands/${brand.linkKey}`">
                <nuxt-img
                  format="webp"
                  :src="`/mustang/brands/${brand.linkKey}.webp`"
                  :alt="brand.name"
                  height="100px"
                  fit="contain"
                  loading="lazy"
                  background="white"
                  provider="cloudinary"
                />
              </nuxt-link>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          class="control-prev sm:size-[3em] absolute bottom-0 left-[35%] z-1 pb-3"
        >
          <Icon
            name="solar:map-arrow-left-outline"
            class="cursor-pointer slide-prev-brands"
            color="black"
            size="2em"
          />
        </div>
        <div class="control-next absolute bottom-0 right-[35%] z-1 pb-3">
          <Icon
            name="solar:map-arrow-right-outline"
            class="cursor-pointer slide-next-brands"
            color="black"
            size="2em"
          />
        </div>
      </div>
    </div>
  </section>
  <div class="h-[20px] bg-[#EDEDED] sm:h-[40px]"></div>
</template>

<script setup>
import { BRANDS } from "../../vars/brands";
</script>

<style scoped></style>
