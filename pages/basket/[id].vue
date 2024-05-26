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
        @updateQuantity="(option, product) => updateQuantity(option, product)"
      />

      <BasketPriceSummary :summary="state.summary" :currency="state.currency" />

      <div
        class="flex flex-col items-center gap-2 mb-10 sm:flex-row sm:justify-between font-nunito"
      >
        <nuxt-link
          :to="`/checkout/${cart_id}`"
          class="w-full sm:w-[35%] sm:order-1"
        >
          <button
            class="w-full ml-auto text-sm font-semibold text-white uppercase rounded-lg xs:p-2 daisy-btn-primary sm:text-[15px] daisy-btn daisy-btn-sm sm:daisy-btn-md"
          >
            Proceed to checkout
          </button>
        </nuxt-link>
        <nuxt-link to="/catalogue" class="w-full sm:w-[35%]">
          <button
            class="w-full text-sm font-semibold text-white uppercase rounded-lg bg-mustangGrey sm:text-[15px] daisy-btn daisy-btn-sm sm:daisy-btn-md"
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
const customerCountry = store.getCustomerCountry();
const route = useRoute();
const cart_id = route.params.id;

const state = reactive({
  products: "",
  summary: "",
  currency: "",
});

onMounted(async () => {
  if (cart_id !== "null") {
    const data = await useGetCart(customerCountry.code, cart_id);

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
  const data = await useDeleteItems(product._id, customerCountry.code, cart_id);
  updateData(data);
};

const updateQuantity = async (option, product) => {
  const value = getProductType(product.item.name) === "discbrake" ? 2 : 1;
  if (option === "minus") {
    if (product.quantity === 1 && value === 1) {
      deleteProducts(product);
      return;
    } else if (product.quantity === 2 && value === 2) {
      deleteProducts(product);
      return;
    }
    const data = await useDeleteItem(
      product._id,
      customerCountry.code,
      product.quantity - value,
      cart_id
    );
    updateData(data);
  } else if (option === "plus") {
    const actualItem = await useGetItem(product.item.number, country);
    const itemAvailability = actualItem.available.find(
      (obj) => obj.location === LOCATION.EU
    );
    const itemManufacturerAvailability = actualItem.available.find(
      (obj) => obj.location === "manufacturer"
    );

    if (actualItem.manufacturergroup !== Manufacturers.DBA.id) {
      if (
        actualItem.available.find((obj) => obj.location === LOCATION.EU)
          .quantityavailable <
        product.quantity + value
      ) {
        outOfStockModal.showModal();
        return;
      }
    } else {
      if (product.item.manufacturerstock) {
        if (
          product.quantity + value >
          product.item.manufacturerstock + product.item.quantityavailable
        ) {
          outOfStockModal.showModal();
          return;
        }
      } else if (!product.item.manufacturerstock) {
        if (product.quantity + value > product.item.quantityavailable) {
          outOfStockModal.showModal();
          return;
        }
      }
    }
    const data = await useDeleteItem(
      product._id,
      customerCountry.code,
      product.quantity + value,
      cart_id
    );
    updateData(data);
  }
};
</script>
