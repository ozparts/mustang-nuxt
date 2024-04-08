<template>
  <ClientOnly>
    <div
      class="mx-auto md:hidden h-2 max-w-[1140px] bg-[#040503] opacity-[0.55] w-full"
    ></div>
    <div class="flex w-full h-auto bg-white md:hidden">
      <div class="flex justify-between w-full">
        <div class="basis-[50%]">
          <nuxt-link to="/">
            <div class="md:w-[200px] lg:w-[300px]">
              <nuxt-img
                format="webp"
                alt="Mustang Performance logo"
                src="/mustang/mustang_logo.png"
                provider="cloudinary"
                height="80px"
              />
            </div>
          </nuxt-link>
        </div>
        <div class="flex items-end justify-center">
          <Icon
            name="ic:round-search"
            size="24px"
            @click="state.search = true"
          />
        </div>
        <div class="flex items-end justify-center">
          <BasketMobile />
        </div>

        <div class="flex items-end justify-center">
          <SideBar />
        </div>
      </div>
    </div>
    <Transition>
      <Search v-show="state.search" @close="state.search = false" />
    </Transition>
  </ClientOnly>
</template>

<script setup>
const state = reactive({
  search: false,
});
</script>
