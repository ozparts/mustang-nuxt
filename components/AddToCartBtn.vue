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
const store = useStore();

const props = defineProps({
  product: { type: Object },
  quantity: { type: Number },
  productStatus: { type: String },
  defaultStockLocation: { type: String },
});

const cartId = ref(null);

const country = store.getCountry();
const storeCartId = store.getCartId();
const productType = getProductType(props.product.name);

const serviceCode =
  productType === "brakepad"
    ? "5e2566e63e8d6645e0e62291"
    : "5e0dbaba9e33df43f0b3a4f3";

// const local = useAvlInLocation(props.product, LOCATION);
// const stock = useAvlInManstock(props.product);
// const additionalservice = local === 0 && stock > 0 ? [serviceCode] : [];

const addToBasket = async () => {
  const resp = await useAddToBasket(
    props.quantity,
    props.product.id,
    country.code,
    cartId.value,
    props.productStatus === "air" && productType === "discbrake"
      ? [serviceCode]
      : [],
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
