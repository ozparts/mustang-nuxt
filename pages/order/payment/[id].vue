<template>
  <Navigation :route="name" />
  <div
    class="my-10 text-xl font-bold text-center uppercase sm:my-20 sm:text-3xl font-nunito"
  >
    <h1
      v-if="
        state.order &&
        state.order.status._id === 'pendingapproval' &&
        state.order.status._id !== 'closed' &&
        !state.order.paymentstatus
      "
      class="mt-4 text-center uppercase"
    >
      Pay for the order<br /><span class="text-red-600">{{
        state.order.name
      }}</span>
    </h1>

    <div
      v-if="
        state.order &&
        state.order.paymentstatus &&
        state.order.paymentstatus === 'fullypaid'
      "
      class="flex flex-col lg:my-16"
    >
      <h1 class="mt-4 text-center uppercase">
        Your order has been paid<br /><span class="text-red-600">{{
          state.order.name
        }}</span>
      </h1>
      <NuxtLink to="/" class="mx-auto my-6">
        <button
          class="font-semibold uppercase btn-red sm:btn-red daisy-btn daisy-btn-block daisy-btn-sm sm:daisy-btn hover:bg-red-800"
        >
          Home Page
        </button>
      </NuxtLink>
    </div>

    <div
      v-if="state.order && state.order.status._id === 'closed'"
      class="flex flex-col lg:my-16"
    >
      <h1 class="mt-4 text-center uppercase">
        Your order has been closed<br /><span class="text-red-600">{{
          state.order.name
        }}</span>
      </h1>
      <NuxtLink to="/" class="mx-auto my-6">
        <button
          class="font-semibold text-white uppercase daisy-btn daisy-btn-block daisy-btn-primary"
        >
          Home Page
        </button>
      </NuxtLink>
    </div>

    <revolut
      v-if="
        ((state.order && state.paymentId === 'revolut') ||
          (state.order && state.paymentId === 'revolutuk')) &&
        state.order.status._id === 'pendingapproval' &&
        state.order.status._id !== 'closed' &&
        !state.order.paymentstatus
      "
      :order="state.order"
      @success="showSuccess({ status: 'COMPLETED' })"
      @error="(error) => showError(error)"
    />

    <paypal
      v-if="
        state.order &&
        state.paymentId === '607468324e5b797a767fe87d' &&
        state.order.status._id === 'pendingapproval' &&
        state.order.status._id !== 'closed' &&
        !state.order.paymentstatus
      "
      :order="state.order"
      @success="showSuccess({ status: 'COMPLETED' })"
      @error="(error) => showError(error)"
    />
  </div>
</template>

<script setup>
const store = useStore();
const country = store.getCountry();
const route = useRoute();
const name = computed(() => route);
const state = reactive({
  order: null,
  paymentId: "",
});

onMounted(async () => {
  const order = await useGetOrder(route.params.id, country.code);
  state.order = order;
  state.paymentId = order.paymentmethod._id;
});

const showSuccess = async (data) => {
  if (data.status === "COMPLETED") {
    await useSetPaymentStatus(route.params.id);
    navigateTo(`/summary/payment`);
  }
};
</script>
