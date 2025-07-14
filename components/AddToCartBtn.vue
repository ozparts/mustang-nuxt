<template>
  <div
    class="flex items-center p-2 font-bold uppercase cursor-pointer btn-red gtm_btn_addtocart"
    @click="addToBasket"
  >
    <p class="flex items-center mr-3 text-sm pointer-events-none sm:text-base">
      Add to cart
    </p>
    <Icon
      name="material-symbols:shopping-cart-rounded"
      class="pointer-events-none"
      size="18px"
    />
  </div>
</template>

<script setup>
import { EXCLUDED } from "~/vars";
const store = useStore();

const props = defineProps({
  product: { type: Object },
  productInfo: { type: Object },
  quantity: { type: Number },
  productType: { type: String },
  defaultStockLocation: { type: String },
});

const getType = (name) => {
  const excluded = EXCLUDED;
  if (name) {
    if (excluded.includes(name)) {
      return "exluded";
    } else if (
      name.includes("DBA") &&
      (name.includes("SP") || name.includes("XP"))
    ) {
      return "kit";
    } else if (name.includes("DBABU")) {
      return "dbakit";
    } else if (name.includes("DBAC")) {
      return "calipers";
    } else if (name.includes("DBA")) {
      return "discbrake";
    } else if (name.includes("DB")) {
      return "brakepad";
    }
  }
};
const cartId = ref(null);

const country = store.getCountry();
const storeCartId = store.getCartId();

const FreeService = "6704d5b3bb6a6850a3f81f96";
const PaidService = "6704db02bb6a6850a3f840b6";

const serviceCode =
  props.productType === "brakepad" ? FreeService : PaidService;

const isDbaProduct =
  props.product.manufacturergroup === "5f9bda55dcdf6b0c04f1878c";

const setServiceCode = computed(() => {
  const availability = props.productInfo.av;

  if (isDbaProduct && availability.case !== "airfreight") {
    return [];
  } else if (isDbaProduct && availability.case === "airfreight") {
    if (props.productType !== "kit") {
      return [serviceCode];
    } else {
      if (!props.product?.components) {
        return [];
      }

      const components = props.product.components;
      let discbrake;
      let brakepad;

      for (const e of components) {
        const type = getType(e.name);
        if (type === "brakepad") {
          brakepad = e;
        } else if (type === "discbrake") {
          // More specific condition
          discbrake = e;
        }
      }

      if (
        (brakepad.available || 0) + (brakepad.manufacturerstock || 0) >=
          props.quantity &&
        discbrake.available === 0 &&
        (discbrake.manufacturerstock || 0) >= props.quantity * 2
      ) {
        return [serviceCode];
      } else {
        return [];
      }
    }
  }
  return [];
});

const addToBasket = async () => {
  const resp = await useAddToBasket(
    props.quantity,
    props.product.id,
    country.code,
    cartId.value,
    setServiceCode.value,
    props.defaultStockLocation
  );

  if (!cartId.value) store.setCartId(resp.cart_id);
  cartId.value = resp.cart_id;

  const data = await useGetCart(country.code, resp.cart_id);
  store.setBasketQuantity(
    countBasketQuantity(data.shoppingcarts[0].shoppingcart.transactionlines)
  );
};

onMounted(() => {
  cartId.value = storeCartId ? storeCartId : cartId.value;
});
</script>
