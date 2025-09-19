<template>
  <Navigation :route="name" />
  <div
    class="my-10 text-xl font-bold text-center uppercase sm:my-20 sm:text-3xl font-nunito"
  >
    <h1 v-if="isPendingPayment" class="mt-4 text-center uppercase">
      Pay for the order<br />
      <span class="text-red-600">{{ order?.name }}</span>
    </h1>
    <div v-if="isFullyPaid" class="flex flex-col lg:my-16">
      <h1 class="mt-4 text-center uppercase">
        Your order has been paid<br />
        <span class="text-red-600">{{ order?.name }}</span>
      </h1>
      <NuxtLink to="/" class="mx-auto my-6">
        <button
          class="font-semibold uppercase btn-red sm:btn-red daisy-btn daisy-btn-block daisy-btn-sm sm:daisy-btn hover:bg-red-800"
        >
          Home Page
        </button>
      </NuxtLink>
    </div>
    <div v-if="isClosed" class="flex flex-col lg:my-16">
      <h1 class="mt-4 text-center uppercase">
        Your order has been closed<br />
        <span class="text-red-600">{{ order?.name }}</span>
      </h1>
      <NuxtLink to="/" class="mx-auto my-6">
        <button
          class="font-semibold text-white uppercase daisy-btn daisy-btn-block daisy-btn-primary"
        >
          Home Page
        </button>
      </NuxtLink>
    </div>
    <template v-if="isPendingPayment">
      <revolut
        v-if="isRevolutPayment"
        :order="order"
        @success="handlePaymentSuccess({ status: 'COMPLETED' })"
        @error="handlePaymentError"
      />
      <paypal
        v-if="isPaypalPayment"
        :order="order"
        @success="handlePaymentSuccess({ status: 'COMPLETED' })"
        @error="handlePaymentError"
      />
    </template>
  </div>
</template>

<script setup>
const store = useStore();
const route = useRoute();
const { country } = useCountry();

const order = ref(null);

const name = computed(() => route);
const isClosed = computed(() => order.value?.status._id === "closed");
const isFullyPaid = computed(() => order.value?.paymentstatus === "fullypaid");
const isRevolutPayment = computed(() =>
  order.value?.paymentmethod.name.toLowerCase().includes("revolut")
);
const isPaypalPayment = computed(() =>
  order.value?.paymentmethod.name.toLowerCase().includes("paypal")
);
const isPendingPayment = computed(
  () =>
    order.value?.status._id === "pendingapproval" &&
    !order.value?.paymentstatus &&
    order.value?.status._id !== "closed"
);

const handlePaymentSuccess = async (data) => {
  if (data.status === "COMPLETED") {
    await useSetPaymentStatus(route.params.id);
    navigateTo("/summary/payment");
  }
};
const handlePaymentError = (error) => {
  console.error("Payment error:", error);
};

onMounted(async () => {
  order.value = await useGetOrder(route.params.id, country.value);
});
</script>
