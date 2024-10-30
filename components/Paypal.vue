<template>
  <div class="w-full">
    <div class="max-w-[600px] w-[90%] m-auto rounded-[20px] elevation-12">
      <div class="my-4 bg-white pt-10 pb-5 px-5 rounded-[20px]" id="pp"></div>
    </div>
  </div>
</template>

<script setup>
import { WIDGET_TYPE } from "./../vars/index";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["success", "error"]);

const state = reactive({
  order: null,
});

const getToken = async (order) => {
  const res = await getPaymentMethods({
    currency: order?.currency?.iso,
    amount: order?.grossamount,
    transactionid: order?._id,
  });

  const payPalMethod = res.find(
    (method) => method.widgettype === WIDGET_TYPE.PAYPAL
  );

  return payPalMethod?.token[0]?.value || "";
};

const createPayPalScript = (token, currency) => {
  const script = document.createElement("script");
  script.src = `https://www.paypal.com/sdk/js?currency=${currency}&disable-funding=card&client-id=${token}`;
  script.addEventListener("load", initializePayPal);
  document.body.appendChild(script);
};

const initializePayPal = () => {
  const paypalConfig = {
    purchase_units: [
      {
        amount: {
          value: state.order.grossamount,
          currency_code: state.order.currency.name,
        },
      },
    ],
  };

  paypal
    .Buttons({
      createOrder: (_, actions) => actions.order.create(paypalConfig),
      onApprove: async (_, actions) => {
        try {
          const details = await actions.order.capture();
          if (details.status === "COMPLETED") {
            emit("success");
          }
        } catch (error) {
          emit("error", error);
        }
      },
    })
    .render("#pp");
};

onMounted(async () => {
  try {
    state.order = props.order;

    const token = await getToken(state.order);
    if (!token) {
      emit("error", new Error("Failed to get PayPal token"));
      return;
    }

    createPayPalScript(token, state.order.currency.name);
  } catch (error) {
    emit("error", error);
  }
});
</script>
