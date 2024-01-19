<template>
  <section
    class="bg-gradient-to-tl from-gray-200 via-white to-gray-200 flex items-center justify-center p-[30px] sm:h-[20vh]"
  >
    <div
      class="text-sm sm:text-lg text-white daisy-breadcrumbs rounded-lg bg-red-600 px-5 py-2.5 font-nunito"
    >
      <ul class="flex flex-col items-start justify-start sm:flex-row">
        <li class="w-full">
          <a
            @click="goTo(`/basket/${state.id}`)"
            :class="[isCartDisabled() ? 'pointer-events-none' : '']"
          >
            Cart
          </a>
        </li>
        <li class="w-full">
          <a
            @click="goTo(`/checkout/${state.id}`)"
            :class="[
              isCartDisabled() ? 'pointer-events-none' : '',
              props.route.name === 'checkout-id' ? 'underline' : '',
            ]"
            >Checkout
          </a>
        </li>
        <li class="w-full">
          <a
            @click="goTo(`/summary/${state.id}`)"
            :class="[
              props.route.name === 'summary-id' ? 'underline' : '',
              isSummaryDisabled() ? 'pointer-events-none' : '',
            ]"
            >Summary
          </a>
        </li>
        <li class="w-full">
          <a
            @click="goTo(`/order/${state.id}`)"
            :class="[
              props.route.name === 'order-id' ? 'underline' : '',
              isSummaryDisabled() ? 'pointer-events-none' : '',
            ]"
            >Payment
          </a>
        </li>
        <li class="w-full">
          <a
            :class="[
              props.route.name === 'summary-payment'
                ? 'underline'
                : 'pointer-events-none',
            ]"
            style="cursor: default"
            >Status
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["route"]);
const state = reactive({
  name: props.route.name,
  id: props.route.params.id,
});

const goTo = (link) => {
  navigateTo(link);
};

function isCartDisabled() {
  return props.route.name === "summary-id" ||
    props.route.name === "order-id" ||
    props.route.name === "status-payment"
    ? true
    : false;
}

function isSummaryDisabled() {
  return props.route.name === "basket-id" ||
    props.route.name === "checkout-id" ||
    props.route.name === "status-payment"
    ? true
    : false;
}
</script>
