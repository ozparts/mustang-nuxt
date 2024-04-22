<template>
  <div class="pb-0.5">
    <nuxt-link
      :to="`/basket/${cart_id ? cart_id : 'null'}`"
      aria-label="Basket"
    >
      <div class="relative b-1">
        <Icon name="ph:shopping-cart" size="24px" />
        <div
          class="absolute right-[-10px] top-[-6px] flex h-5 w-5 items-center justify-center rounded-[50%] bg-red-600 text-[12px] text-white"
          v-if="basketQuantity"
        >
          {{ basketQuantity }}
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
const store = useStore();
const cart_id = computed(() => store.getCartId());
const basketQuantity = computed(() => store.getBasketQuantity());
</script>
