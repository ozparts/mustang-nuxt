<template>
  <div
    class="flex items-center p-2 font-bold uppercase cursor-pointer btn-red"
    @click="addToBasket"
  >
    <p class="flex items-center mr-3 text-sm sm:text-base">Add to cart</p>
    <Icon name="material-symbols:shopping-cart-rounded" size="18px" />
  </div>
</template>

<script setup>
import { LOCATION } from "../vars/index";
const props = defineProps([
  "product",
  "availability",
  "quantity",
  "productStatus",
]);

const store = useStore();
const country = store.getCountry();
const cart_id = store.getCartId();

const local = useAvlInLocation(props.product, LOCATION);
const stock = useAvlInManstock(props.product);
const productType = getProductType(props.product.name);
const serviceCode =
  productType === "brakepad"
    ? "5e2566e63e8d6645e0e62291"
    : "5e0dbaba9e33df43f0b3a4f3";
const additionalservice = local === 0 && stock > 0 ? [serviceCode] : [];

const addToBasket = async () => {
  const resp = await useAddToBasket(
    props.quantity,
    props.product.id,
    country.code,
    cart_id,
    props.productStatus === "air" && productType === "discbrake"
      ? [serviceCode]
      : []
  );

  const data = await useGetCart(country.code, resp.cart_id);
  store.setBasketQuantity(
    countBasketQuantity(data.shoppingcarts[0].shoppingcart.transactionlines)
  );
  store.setCartId(resp.cart_id);
};
</script>
