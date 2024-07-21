<template>
  <div
    class="mx-auto md:hidden h-2 max-w-[1140px] bg-[#040503] opacity-[0.55] w-full"
  ></div>
  <div class="flex w-full h-[50px] bg-white md:hidden">
    <div class="flex justify-between w-full">
      <div class="basis-[50%]">
        <nuxt-link to="/">
          <div class="md:w-[200px] lg:w-[300px] h-[50px]">
            <nuxt-img
              class="aspect-auto h-[50px]"
              alt="Mustang Performance logo"
              src="/mustang_logo.webp"
              sizes="200px lg:300px"
            />
          </div>
        </nuxt-link>
      </div>
      <div class="flex items-end justify-center">
        <nuxt-link to="/catalogue" aria-label="Catalogue">
          <Icon name="ic:round-search" size="24px" />
        </nuxt-link>
      </div>
      <div class="flex items-end justify-center">
        <BasketMobile />
      </div>
      <div class="flex items-end justify-center">
        <SideBar />
      </div>
    </div>
  </div>
</template>

<script setup></script>
