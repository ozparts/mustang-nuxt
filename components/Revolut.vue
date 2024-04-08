<template>
  <div class="text-[#131313] m-auto">
    <h2 class="m-4 text-center sm:text-2xl">Pay by credit card</h2>
    <div class="flex items-center justify-center mx-0 my-5">
      <nuxt-img
        format="webp"
        class="h-[100px] lg:h-[150px] cursor-pointer hover:brightness-75"
        src="../assets/revolut.png"
        @click="handleRevolutPayment"
      />
    </div>
  </div>
</template>

<script setup>
import RevolutCheckout from "@revolut/checkout";
const props = defineProps(["order"]);
const emit = defineEmits(["success", "error"]);
const store = useStore();
const host = store.getHost();

const handleRevolutPayment = async () => {
  const urlBase = "https://api.ozparts.eu";
  const url =
    host === "UK"
      ? `${urlBase}/payments/revolut/uk`
      : `${urlBase}/payments/revolut/eu`;
  const data =
    host === "UK"
      ? {
          amount: props.order.grossamount,
          currency: "GBP",
        }
      : {
          amount: props.order.grossamount,
          currency: "EUR",
          region: "eu",
        };

  try {
    const public_id = await useRevolut(url, data);
    RevolutCheckout(public_id).then((instance) => {
      instance.payWithPopup({
        billingAddress: {
          countryCode: props.order.billcountry,
          city: props.order.billcity,
          postcode: props.order.billzip,
          streetLine1: props.order.billaddressee,
          streetLine2: props.order.billaddress,
        },
        onSuccess: () => emit("success"),
        onError(message) {
          alert(message);
        },
      });
    });
  } catch (error) {
    emit("error", error);
  }
};
</script>
