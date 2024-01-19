<template>
  <section class="font-nunito">
    <Banner title="Our brands" />
    <div class="container py-10 mx-auto">
      <div
        class="flex flex-wrap justify-center mx-auto -m-4 sm:!justify-start gap-y-4"
      >
        <div v-for="brand in BRANDS" class="p-4 lg:w-1/2">
          <div
            class="flex flex-col justify-center gap-3 items-start sm:items-center text-center sm:grid sm:grid-cols-[200px_1fr] sm:text-left"
          >
            <div class="flex items-center justify-start">
              <NuxtImg
                :src="`/mustang/brands/${brand.linkKey}.webp`"
                width="200px"
                provider="cloudinary"
              />
            </div>
            <div class="flex-grow text-left sm:pl-8">
              <h2 class="font-bold text-gray-900 sm:text-lg">
                {{ brand.name }}
              </h2>

              <p
                class="mb-3 text-sm sm:text-base sm:mb-4 font-semibold max-w-[200px] sm:!max-w-max"
              >
                {{ brand.title }}
              </p>

              <nuxt-link
                :to="`/brands/${brand.linkKey}`"
                class="text-sm text-black daisy-link daisy-link-hover sm:text-base"
                >Learn more...</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BRANDS } from "../../vars/brands";
</script>
