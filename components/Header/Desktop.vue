<template>
  <section class="mx-auto">
    <div
      class="mx-auto hidden md:flex h-2 max-w-[1140px] bg-[#040503] opacity-[0.55]"
    ></div>
    <PartFinder />
    <div class="mx-auto hidden max-w-[1140px] bg-white py-2 md:flex">
      <nav
        class="items-end w-full text-sm font-bold tracking-wide uppercase font-open-sans sm:flex"
      >
        <ul class="flex items-end justify-between w-full bg-white">
          <li>
            <div>
              <nuxt-link to="/">
                <div class="overflow-hidden aspect-auto">
                  <nuxt-img
                    class="h-[72px]"
                    src="/mustang-performance-logo.webp"
                    alt="Mustang Performance logo"
                    width="200px"
                  />
                </div>
              </nuxt-link>
            </div>
          </li>

          <li>
            <nuxt-link class="hover:text-mustangBlue" to="/catalogue"
              >Catalogue</nuxt-link
            >
          </li>
          <li>
            <nuxt-link class="hover:text-mustangBlue" to="/brands"
              >Our brands</nuxt-link
            >
          </li>

          <li>
            <nuxt-link
              class="hover:text-mustangBlue gtm_btn_generalenquiries"
              to="/contact-us"
              >Contact us</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="`/basket/${cart_id ? cart_id : 'null'}`">
              <div
                class="relative mr-3.5 flex items-center gap-2 gtm_btn_viewcart"
              >
                <Icon
                  name="material-symbols:shopping-cart-rounded"
                  size="20px"
                  class="pointer-events-none"
                />
                <div
                  class="pointer-events-none absolute right-[-14px] top-[-14px] flex h-5 w-5 items-center justify-center rounded-[50%] bg-red-600 text-[10px] text-white"
                  v-if="basketQuantity"
                >
                  {{ basketQuantity }}
                </div>
                <p
                  class="text-[11px] font-light capitalize tracking-wide pointer-events-none"
                >
                  shopping basket
                </p>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup>
const store = useStore();
const cart_id = computed(() => store.getCartId());
const basketQuantity = computed(() => store.getBasketQuantity());
</script>

<style scoped>
.router-link-active {
  color: #0052a5;
}
</style>
