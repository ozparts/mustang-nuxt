<template>
  <Navigation :route="name" :paid="state?.order?.paymentstatus" />

  <div
    v-if="state.order"
    class="my-6 sm:!my-10 w-full max-w-[400px] m-auto flex flex-col"
  >
    <h2
      class="text-xl sm:text-2xl my-6 sm:my-8 font-bold text-center uppercase font-nunito max-w-[400px] rounded-lg p-2"
      :class="
        state.order.paymentstatus ? 'bg-[#A6F1A6]' : 'bg-white my-6 sm:my-8'
      "
    >
      Your order <span>{{ state.order.name }}</span
      ><br />
      <span v-if="state.order.status._id === 'closed'">has been closed</span>
      <span v-else>
        has been {{ state.order.paymentstatus ? "paid" : "received" }}
      </span>
    </h2>

    <div
      class="!border !border-mustangRed bg-gradient-to-tl from-gray-200 via-white to-gray-200 font-nunito max-w-[400px] mb-5"
    >
      <h3
        class="py-3 text-xl italic font-bold tracking-tighter text-center border-b-[1px] sm:text-2xl border-mustangRed"
      >
        ORDER SUMMARY
      </h3>
      <div
        v-for="item in filterOrderList"
        class="grid grid-cols-[100px_auto] sm:!grid-cols-[120px_auto] gap-2 border-b-[1px] border-mustangRed p-4 font-nunito"
      >
        <div
          class="self-start p-1 border-[1px] border-mustangRed"
          :class="
            `${item.item.recordtype}` === 'service'
              ? 'bg-[#F6F6F6]'
              : 'bg-[white]'
          "
        >
          <nuxt-img
            v-if="item.item.photos[0]"
            format="webp"
            :src="`${
              item.item?.photos[1]?.url
                ? item.item.photos[1].url
                : item.item.photos[0].url
            }`"
            width="125px"
            class="h-[100px] object-contain w-[100px] sm:!w-[120px]"
            :class="
              item.item.recordtype === 'service' ? 'bg-[#F6F6F6]' : 'bg-white'
            "
          />
          <nuxt-img
            v-else
            format="webp"
            src="/mustang/no_image.jpg"
            alt="No image"
            provider="cloudinary"
            width="120px"
            height="100px"
            fit="contain"
            sizes="100px sm:120px"
            background="white"
          />
        </div>

        <div class="flex flex-col justify-between gap-2">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm font-bold sm:text-lg">
              {{ item.item.name }}
            </span>
            <span class="text-xs sm:text-sm">
              {{ item.item.description }}
            </span>
          </div>

          <div class="flex gap-4 text-[13px] sm:gap-4 sm:text-base">
            <div class="flex-col text-center">
              <p class="font-bold text-mustangRed">Quantity:</p>
              <p class="font-bold">{{ item.quantity }}</p>
            </div>

            <div class="flex-col text-center">
              <p class="font-bold text-mustangRed">Unit price:</p>
              <p class="font-bold">
                {{ state.order.currency.symbol }} {{ item.price }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1 p-4 border-b-[1px] border-mustangRed">
        <div class="flex justify-between font-bold uppercase">
          <p>subtotal</p>
          <p>
            {{ state.order.currency.symbol }}
            {{ state.order.grossitemsamount.toFixed(2) }}
          </p>
        </div>
        <div class="flex justify-between font-bold uppercase">
          <p>shipping</p>
          <p>
            {{ state.order.currency.symbol }}
            {{ state.order.grossshippingcost.toFixed(2) }}
          </p>
        </div>
      </div>
      <div class="flex justify-between p-4 text-lg">
        <h3 class="font-bold uppercase">total</h3>
        <h3 class="font-bold">
          {{ state.order.currency.symbol }}
          {{ state.order.grossamount.toFixed(2) }}
        </h3>
      </div>
    </div>
    <div
      class="!border !border-mustangRed bg-gradient-to-tl from-gray-200 via-white to-gray-200 font-nunito max-w-[400px] mb-5"
    >
      <div v-if="state.order">
        <h3
          class="py-3 text-xl italic font-bold tracking-tighter text-center border-b-[1px] sm:text-2xl border-mustangRed uppercase"
        >
          Shipping details
        </h3>
        <div class="flex flex-col gap-1 p-4 text-sm text-center sm:text-base">
          <p>
            <span class="font-bold">Name:</span>
            {{ state.order.shipaddressee || state.order.shipname }}
          </p>
          <p>
            <span class="font-bold">Street:</span>
            {{ state.order.shipaddress }}
          </p>
          <p>
            <span class="font-bold">City:</span>
            {{ state.order.shipzip }} {{ state.order.shipcity }}
          </p>
          <p>
            <span class="font-bold">Country:</span>
            {{ state.order.shipcountryname }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-show="!state.order.paymentstatus && state.order.status._id !== 'closed'"
    >
      <button
        @click="navigateTo(`/order/payment/${route.params.id}`)"
        class="font-semibold uppercase btn-red sm:btn-red daisy-btn daisy-btn-block daisy-btn-sm sm:daisy-btn"
      >
        pay for the order
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { country } = useCountry();

const state = reactive({
  order: null,
});

const name = computed(() => route);
const filterOrderList = computed(() => {
  return state.order.transactionlines.filter((obj) => obj.price !== 0);
});

const fetchOrder = async () => {
  state.order = await useGetOrder(route.params.id, country.value);
};

onMounted(() => {
  fetchOrder();
});
</script>
