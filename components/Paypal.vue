<template>
  <div class="w-full">
    <div class="max-w-[600px] w-[90%] m-auto rounded-[20px] elevation-12">
      <div class="my-4 bg-white pt-10 pb-5 px-5 rounded-[20px]" id="pp"></div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["success", "error"]);
const store = useStore();
const host = store.getHost();
const country = store.getCountry();
const route = useRoute();
const state = reactive({
  order: null,
});

const runtimeConfig = useRuntimeConfig();

onMounted(async () => {
  const order = await useGetOrder(route.params.id, country.code);
  state.order = order;
  const currency = order.currency.name;
  let token = "";

  if (currency === "GBP") {
    token = runtimeConfig.public.paypal_UK;
  } else if (currency === "PLN") {
    token = runtimeConfig.public.paypal_PL;
  } else {
    token = runtimeConfig.public.paypal_EU;
  }

  const src = `https://www.paypal.com/sdk/js?client-id=${token}&disable-funding=card&currency=${currency}`;

  const script = document.createElement("script");
  script.src = src;
  script.addEventListener("load", setLoaded);
  document.body.appendChild(script);

  console.log(src, currency, "!!");
  function setLoaded() {
    const value = state.order.grossamount;
    const object =
      host === "UK"
        ? {
            purchase_units: [
              {
                amount: {
                  value,
                  currency_code: "GBP",
                },
              },
            ],
          }
        : {
            purchase_units: [
              {
                amount: {
                  value,
                  currency_code: state.order.currency.name,
                },
              },
            ],
          };
    paypal
      .Buttons({
        createOrder: (data, actions) => actions.order.create(object),
        onApprove: (data, actions) => {
          return actions.order
            .capture()
            .then((details) => {
              if (details.status === "COMPLETED") {
                emit("success");
              }
            })
            .catch((error) => {
              emit("error", error);
            });
        },
      })
      .render("#pp");
  }
});
</script>
