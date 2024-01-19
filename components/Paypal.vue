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

onMounted(async () => {
  const order = await useGetOrder(route.params.id, country.code);
  state.order = order;
  const src =
    host === "UK"
      ? `https://www.paypal.com/sdk/js?client-id=Ae922jVwwFJpiabY1Yphr1OsTPNjVkmvSjXnwR44b4Py2XUA2yNQWTw1yGqIX55GhzJuu0D5QtE4z7ye&disable-funding=card&currency=GBP`
      : `https://www.paypal.com/sdk/js?client-id=Abr3Oy3T51DwdxwyKNM2X3uOiuyVAcQ9iZnnO93CY7riR-AOQsxDEs7wpIcH3mZIs1Rnda4DkAFJNKe5&disable-funding=card&currency=EUR`;
  const script = document.createElement("script");
  script.src = src;
  script.addEventListener("load", setLoaded);
  document.body.appendChild(script);

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
                  currency_code: "EUR",
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
