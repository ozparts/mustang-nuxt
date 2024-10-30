<template>
  <div class="text-[#131313] m-auto">
    <h2 class="m-4 text-center sm:text-2xl">Pay by credit card</h2>
    <div class="flex items-center justify-center mx-0 my-5">
      <img
        class="h-[100px] lg:h-[150px] cursor-pointer hover:brightness-75 transition-all"
        src="../assets/revolut.png"
        :alt="'Pay with Revolut'"
        @click="handleRevolutPayment"
      />
    </div>
  </div>
</template>

<script setup>
import RevolutCheckout from "@revolut/checkout";
import { WIDGET_TYPE } from "./../vars/index";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["success", "error"]);

const getToken = async (order) => {
  const res = await getPaymentMethods({
    currency: order?.currency?.iso,
    amount: order?.grossamount * 100,
    transactionid: order?._id,
  });

  const revolutMethod = res.find(
    (method) => method.widgettype === WIDGET_TYPE.REVOLUT
  );

  return revolutMethod?.token[0]?.service?.token || "";
};

const initializeRevolutCheckout = async (token) => {
  const instance = await RevolutCheckout(token);
  instance.payWithPopup({
    billingAddress: {
      countryCode: props.order.billcountry,
      city: props.order.billcity,
      postcode: props.order.billzip,
      streetLine1: props.order.billaddressee,
      streetLine2: props.order.billaddress,
    },
    onSuccess: () => emit("success"),
    onError: (message) => emit("error", new Error(message)),
  });
};

const handleRevolutPayment = async () => {
  try {
    const token = await getToken(props.order);
    await initializeRevolutCheckout(token);
  } catch (error) {
    emit("error", error);
  }
};
</script>
