<template>
  <Head>
    <Title> Your basket | Mustang Performance </Title>
    <Meta
      name="description"
      content="Your basket. Ford Mustang auto parts. Easy to order, 2-4 days to deliver"
    />
  </Head>
  <UiOutOfStockPopUp />
  <Banner title="shopping cart" />
  <div class="container p-3 mx-auto overflow-hidden">
    <BasketEmptyBasket v-if="cart_id === 'null' || !state.products.length" />
    <div v-else>
      <BasketProductInBasket
        :products="state.products"
        :summary="state.summary"
        :currency="state.currency"
        @deleteProducts="(product) => deleteProducts(product)"
      />
      <!-- //TODO aupdateQuantity - refactor and change LOCATION if use -->

      <BasketPriceSummary :summary="state.summary" :currency="state.currency" />

      <div
        class="flex flex-col items-center gap-2 mb-10 sm:flex-row sm:justify-between font-nunito"
      >
        <nuxt-link
          :to="`/checkout/${cart_id}`"
          class="w-full sm:w-[35%] sm:order-1 gtm_btn_checkout"
        >
          <button
            class="pointer-events-none w-full ml-auto text-sm font-semibold text-white uppercase rounded-lg xs:p-2 daisy-btn-primary sm:text-[15px] daisy-btn daisy-btn-sm sm:daisy-btn-md"
          >
            Proceed to checkout
          </button>
        </nuxt-link>
        <nuxt-link to="/catalogue" class="w-full sm:w-[35%]">
          <button
            class="w-full !p-0 gtm_btn_continueshopping text-sm font-semibold text-white uppercase rounded-lg bg-mustangGrey sm:text-[15px] daisy-btn daisy-btn-sm sm:daisy-btn-md"
          >
            Continue shopping
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { LOCATION, Manufacturers } from "../../vars/index";

const store = useStore();
const { country } = useCountry();

const route = useRoute();
const cart_id = route.params.id;

const state = reactive({
  products: "",
  summary: "",
  currency: "",
});

onMounted(async () => {
  if (cart_id !== "null") {
    const data = await useGetCart(country.value, cart_id);

    if (data.shoppingcarts[0]) {
      state.products = data.shoppingcarts[0].shoppingcart.transactionlines;
      state.summary = data.summary;
      state.currency = data.shoppingcarts[0].shoppingcart.currency.symbol;
      store.setBasketQuantity(
        countBasketQuantity(data.shoppingcarts[0].shoppingcart.transactionlines)
      );

      store.setCartId(cart_id);
      return;
    } else {
      throw createError({
        statusCode: 404,
        message: "Sorry, the provided shopping cart link is invalid.",
        fatal: true,
      });
    }
  }
});

const updateData = (data) => {
  state.products = data.shoppingcarts[0].shoppingcart.transactionlines;
  state.summary = data.summary;
  store.setBasketQuantity(
    countBasketQuantity(data.shoppingcarts[0].shoppingcart.transactionlines)
  );

  if (!store.getBasketQuantity()) {
    store.setCartId("");
    store.clearShippingForm();
    store.clearBillingForm();
  }
};

const deleteProducts = async (product) => {
  const data = await useDeleteItems(product._id, country.value, cart_id);
  updateData(data);
};
</script>
