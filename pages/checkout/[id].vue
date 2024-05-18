<template>
  <ClientOnly>
    <Navigation :route="name" />

    <section class="relative py-3 bg-white z-1">
      <div
        class="container mx-auto grid max-w-[1400px] grid-cols-1 gap-10 py-10 min-[900px]:grid-cols-[1.5fr,1fr]"
      >
        <v-form class="font-nunito px-4 sm:!px-0">
          <!-- PERSONAL DETAILS -->
          <section>
            <div class="flex items-center mb-5">
              <Icon
                name="material-symbols:person-rounded"
                size="24px"
                color="#c22025"
              />
              <p
                class="ml-4 text-lg italic font-bold tracking-tighter sm:text-2xl"
              >
                Personal Details
              </p>
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="firstName" class="mb-2 text-sm sm:text-base"
                >First name<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.firstName"
                :error-messages="v$.firstName.$errors.map((e) => e.$message)"
                type="text"
                @input="v$.firstName.$touch"
                @blur="v$.firstName.$touch"
                density="compact"
                variant="outlined"
                id="firstName"
              >
              </v-text-field>
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="lastName" class="mb-2 text-sm sm:text-base"
                >Last name<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.lastName"
                :error-messages="v$.lastName.$errors.map((e) => e.$message)"
                type="text"
                @input="v$.lastName.$touch"
                @blur="v$.lastName.$touch"
                density="compact"
                variant="outlined"
                id="lastName"
              />
            </div>

            <div class="flex flex-col mb-3">
              <label for="email" class="mb-2 text-sm sm:text-base"
                >Email<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.email"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
                type="email"
                @input="v$.email.$touch"
                @blur="v$.email.$touch"
                density="compact"
                variant="outlined"
                id="email"
              />
            </div>
            <div class="flex flex-col mb-3">
              <label for="confirmEmail" class="mb-2 text-sm sm:text-base"
                >Repeat email<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.confirmEmail"
                :error-messages="v$.confirmEmail.$errors.map((e) => e.$message)"
                type="email"
                @input="v$.confirmEmail.$touch"
                @blur="v$.confirmEmail.$touch"
                density="compact"
                variant="outlined"
                id="confirmEmail"
              />
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="phone" class="mb-2 text-sm sm:text-base"
                >Phone<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.phone"
                :error-messages="v$.phone.$errors.map((e) => e.$message)"
                type="text"
                @input="v$.phone.$touch"
                @blur="v$.phone.$touch"
                density="compact"
                variant="outlined"
                id="phone"
              />
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="company" class="mb-2 text-sm sm:py-0.5 sm:text-base"
                >Company (optional)</label
              >
              <v-text-field
                v-model="shippingForm.company"
                type="text"
                density="compact"
                variant="outlined"
                id="company"
              />
            </div>
          </section>
          <div class="my-5 sm:my-10 h-[1px] w-full mx-auto bg-mustangRed"></div>

          <!-- SHIPPING DETAILS -->

          <section>
            <div class="flex items-center mb-5">
              <Icon
                name="mdi:truck-cargo-container"
                size="24px"
                color="#c22025"
              />
              <p
                class="ml-4 text-lg italic font-bold tracking-tighter sm:text-2xl"
              >
                Shipping Details
              </p>
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="streetAddress" class="mb-2 text-sm sm:text-base"
                >Street address<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.addressStreet"
                :error-messages="
                  v$.addressStreet.$errors.map((e) => e.$message)
                "
                @input="v$.addressStreet.$touch"
                @blur="v$.addressStreet.$touch"
                type="text"
                density="compact"
                variant="outlined"
                id="streetAddress"
              />
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="streetNumber" class="mb-2 text-sm sm:text-base"
                >Street number<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.addressNumber"
                :error-messages="
                  v$.addressNumber.$errors.map((e) => e.$message)
                "
                @input="v$.addressNumber.$touch"
                @blur="v$.addressNumber.$touch"
                type="text"
                density="compact"
                variant="outlined"
                id="streetNumber"
              />
            </div>

            <div class="flex flex-col mb-3">
              <label for="apartament" class="mb-2 text-sm sm:text-base"
                >Apartament (optional)</label
              >
              <v-text-field
                v-model="shippingForm.address2"
                type="text"
                density="compact"
                variant="outlined"
                id="apartament"
              />
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="city" class="mb-2 text-sm sm:text-base"
                >City<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.city"
                :error-messages="v$.city.$errors.map((e) => e.$message)"
                @input="v$.city.$touch"
                @blur="v$.city.$touch"
                type="text"
                density="compact"
                variant="outlined"
                id="city"
              />
            </div>

            <div class="flex flex-col mb-3 basis-full">
              <label for="postalCode" class="mb-2 text-sm sm:text-base"
                >Postal code<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                v-model="shippingForm.zip"
                :error-messages="v$.zip.$errors.map((e) => e.$message)"
                @input="
                  (e) => {
                    v$.zip.$touch;
                    updateZipCode(e.target.value);
                  }
                "
                @blur="v$.zip.$touch"
                type="text"
                density="compact"
                variant="outlined"
                id="postalCode"
              />
            </div>

            <div class="mb-3 deep">
              <label for="country" class="mb-2 text-sm sm:text-base"
                >Country<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-select
                v-model="shippingForm.country"
                :items="countries"
                :error-messages="v$.country.$errors.map((e) => e.$message)"
                @input="v$.country.$touch"
                @blur="v$.country.$touch"
                density="compact"
                variant="outlined"
                id="country"
              ></v-select>
            </div>
          </section>

          <div class="flex items-center my-5 font-semibold">
            <input
              type="checkbox"
              @change="billingAddressHandler"
              class="mr-5 h-[24px] w-[24px] cursor-pointer accent-mustangRed"
            />
            <label class="text-sm align-middle sm:text-base"
              >Billing details different than Shipping and VAT</label
            >
          </div>

          <!-- BILLING ADDRESS -->

          <section>
            <div
              class="my-5 sm:my-10 h-[1px] w-full mx-auto bg-mustangRed"
            ></div>
            <div v-if="state.billingAddress">
              <div class="flex items-center mb-5">
                <Icon name="ph:money-duotone" size="24px" color="#c22025" />
                <p
                  class="ml-4 text-lg italic font-bold tracking-tighter sm:text-2xl"
                >
                  Billing Details
                </p>
              </div>

              <div class="flex flex-col mb-3">
                <label for="companyBilling" class="mb-2 text-sm sm:text-base"
                  >Company<span class="text-sm text-red-700 sm:text-lg"
                    >*</span
                  ></label
                >
                <v-text-field
                  v-model="billingForm.billCompany"
                  :error-messages="
                    x$.billCompany.$errors.map((e) => e.$message)
                  "
                  type="text"
                  @input="x$.billCompany.$touch"
                  @blur="x$.billCompany.$touch"
                  density="compact"
                  variant="outlined"
                  id="companyBilling"
                />
              </div>

              <div class="flex flex-col mb-3">
                <label
                  for="streetAddressAndNum"
                  class="mb-2 text-sm sm:text-base"
                  >Street address and number<span
                    class="text-sm text-red-700 sm:text-lg"
                    >*</span
                  ></label
                >
                <v-text-field
                  v-model="billingForm.billAddress"
                  :error-messages="
                    x$.billAddress.$errors.map((e) => e.$message)
                  "
                  type="text"
                  @input="x$.billAddress.$touch"
                  @blur="x$.billAddress.$touch"
                  density="compact"
                  variant="outlined"
                  id="streetAddressAndNum"
                />
              </div>

              <div class="flex flex-col mb-3">
                <label for="billingApartament" class="mb-2 text-sm sm:text-base"
                  >Apartament (optional)</label
                >
                <v-text-field
                  v-model="billingForm.billAddress2"
                  type="text"
                  density="compact"
                  variant="outlined"
                  id="billingApartament"
                />
              </div>

              <div class="flex flex-col mb-3 basis-full">
                <label for="billingCity" class="mb-2 text-sm sm:text-base"
                  >City<span class="text-sm text-red-700 sm:text-lg"
                    >*</span
                  ></label
                >
                <v-text-field
                  v-model="billingForm.billCity"
                  :error-messages="x$.billCity.$errors.map((e) => e.$message)"
                  type="text"
                  @input="x$.billCity.$touch"
                  @blur="x$.billCity.$touch"
                  density="compact"
                  variant="outlined"
                  id="billingCity"
                />
              </div>

              <div class="flex flex-col mb-3 basis-full">
                <label for="billingZip" class="mb-2 text-sm sm:text-base"
                  >Postal code<span class="text-sm text-red-700 sm:text-lg"
                    >*</span
                  ></label
                >
                <v-text-field
                  v-model="billingForm.billZip"
                  :error-messages="x$.billZip.$errors.map((e) => e.$message)"
                  type="text"
                  @input="x$.billZip.$touch"
                  @blur="x$.billZip.$touch"
                  density="compact"
                  variant="outlined"
                  id="billingZip"
                />
              </div>

              <div class="flex flex-col mb-3 deep">
                <label for="billingCountry" class="mb-2 text-sm sm:text-base"
                  >Country<span class="text-sm text-red-700 sm:text-lg"
                    >*</span
                  ></label
                >
                <v-select
                  v-model="billingForm.billCountryName"
                  :items="countries"
                  :error-messages="
                    x$.billCountryName.$errors.map((e) => e.$message)
                  "
                  @input="x$.billCountryName.$touch"
                  @blur="x$.billCountryName.$touch"
                  density="compact"
                  variant="outlined"
                  id="billingCountry"
                ></v-select>
              </div>
              <v-checkbox
                v-if="host && host === 'EU'"
                v-model="state.vat"
                color="red-600"
                :class="{ red: state.vat }"
              >
                <template v-slot:label>
                  <p class="text-sm font-bold lg:text-base">
                    I want to purchase as a B2B customer with an active VAT
                    number
                  </p>
                </template>
              </v-checkbox>

              <div v-if="state.vat" class="mb-5">
                <label class="block mb-2"
                  >VAT number<span class="text-red-600">*</span></label
                >
                <v-text-field
                  v-model="state.taxnumber"
                  :prefix="countryPrefix"
                  :error-messages="t$.taxnumber.$errors.map((e) => e.$message)"
                  type="text"
                  @input="
                    () => {
                      t$.taxnumber.$touch;
                      isValid(cart_id);
                    }
                  "
                  @blur="t$.taxnumber.$touch"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </div>
            </div>
            <div
              v-if="state.billingAddress"
              class="mb-10 h-[1px] w-full bg-mustangRed"
            ></div>
          </section>

          <CheckoutShippingOptions
            :methods="state.shippingMethods"
            :id="shippingForm.shippingMethod._id"
            @setShippingMethod="
              (method) => (shippingForm.shippingMethod = method)
            "
          />

          <div class="my-5 sm:my-10 h-[1px] w-full mx-auto bg-mustangRed"></div>

          <CheckoutPaymentOptions
            :methods="state.paymentsMethods"
            :id="shippingForm.paymentMethod._id"
            @setPaymentMethod="
              (method) => (shippingForm.paymentMethod = method)
            "
          />

          <div class="my-5 sm:my-10 h-[1px] w-full mx-auto bg-mustangRed"></div>

          <div class="flex items-center mb-5">
            <Icon name="tdesign:money" size="24px" color="#c22025" />
            <p
              class="ml-4 text-lg italic font-bold tracking-tighter sm:text-2xl"
            >
              Finalise your payment
            </p>
          </div>

          <v-checkbox
            v-model="state.agreedToTerms"
            color="red-600"
            :error-messages="t$.agreedToTerms.$errors.map((e) => e.$message)"
            @change="t$.agreedToTerms.$touch"
            @blur="t$.agreedToTerms.$touch"
          >
            <template v-slot:label>
              <p class="text-sm font-bold text-black sm:text-base">
                Agree to
                <nuxt-link to="/terms" target="_blank">
                  <span class="text-red-600">terms and conditions.</span>
                </nuxt-link>
              </p>
            </template>
          </v-checkbox>

          <v-checkbox
            v-if="!cookieConsent"
            v-model="state.agreedToCookies"
            required
            color="red-600"
            :error-messages="t$.agreedToCookies.$errors.map((e) => e.$message)"
            :focused="false"
            @change="t$.agreedToCookies.$touch"
            @blur="t$.agreedToCookies.$touch"
          >
            <template v-slot:label>
              <p class="text-sm font-bold text-black sm:text-base">
                Agree to
                <nuxt-link to="/cookie-policy" target="_blank">
                  <span class="text-red-600">cookie policy.</span>
                </nuxt-link>
              </p>
            </template>
          </v-checkbox>

          <div class="hidden w-full min-[900px]:block">
            <nuxt-link :to="`/basket/${cart_id}`">
              <button
                class="mt-10 text-sm font-bold tracking-wide text-white bg-mustangGrey daisy-btn sm:bg-mustangGrey daisy-btn-sm sm:daisy-btn"
              >
                Back to cart
              </button>
            </nuxt-link>
          </div>
        </v-form>

        <!-- MINI BASKET -->

        <div class="w-full xs:!w-[400px] mx-auto">
          <div class="sticky flex flex-col gap-8 top-2">
            <div
              class="border-[1px] border-mustangRed bg-gradient-to-tl from-gray-200 via-white to-gray-200 font-nunito"
            >
              <div>
                <p
                  class="flex items-center justify-center py-3 text-xl italic font-bold tracking-tighter border-b-[1px] sm:text-2xl border-mustangRed"
                >
                  Shopping cart
                </p>
              </div>

              <div
                v-for="(item, index) in state.cart"
                :key="index"
                class="border-b-[1px] border-mustangRed"
              >
                <CheckoutMiniBasket :item="item" :currency="state.currency" />
              </div>
              <CheckoutPaymentSummary
                :summary="state.summary"
                :currency="state.currency"
                :discount="state.discount"
                :backOrderInfo="state.backOrderInfo"
              />
            </div>

            <CheckoutPromoCode
              :promoCode="state.promoCode"
              @promo-code-handler="(code) => promoCodeHandler(code)"
            />
            <div class="text-center">
              <button
                v-if="state.orderButton"
                @click="createAddress"
                class="font-semibold text-white uppercase daisy-btn daisy-btn-sm daisy-btn-primary sm:daisy-btn sm:daisy-btn-primary daisy-btn-block"
              >
                {{ !state.loading ? "place order" : "" }}
                <span
                  v-if="state.loading"
                  class="daisy-loading daisy-loading-spinner daisy-loading-sm sm:daisy-loading-lg"
                ></span>
              </button>
              <button
                v-else
                class="px-4 py-2 font-semibold uppercase daisy-btn daisy-btn-block daisy-btn-sm sm:daisy-btn"
                disabled="disabled"
              >
                Place order
              </button>
              <div class="w-full min-[900px]:hidden font-nunito">
                <nuxt-link :to="`/basket/${cart_id}`">
                  <button
                    class="mt-10 text-sm font-bold tracking-wide text-white bg-mustangGrey daisy-btn daisy-btn-sm"
                  >
                    Back to cart
                  </button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ChangeCurrency
      :changeCurrency="state.changeCurrency"
      :currency="state.newCurrency"
      @clicked="updateCurrency"
    />
  </ClientOnly>
</template>

<script setup>
import { TAX, countriesObjectEU, countriesObjectUK } from "../../vars/index";
import { useVuelidate } from "@vuelidate/core";
import debounce from "lodash.debounce";
import {
  email,
  required,
  helpers,
  requiredIf,
  sameAs,
  numeric,
} from "@vuelidate/validators";

const store = useStore();
const route = useRoute();
const cart_id = route.params.id;

const country = store.getCountry();
const host = store.getHost();
const shippingForm = store.getShippingForm();
const billingForm = store.getBillingForm();
const cookieConsent = computed(() => {
  return store.getCookieConsent();
});

const name = computed(() => route);

const state = reactive({
  basket: null,
  agreedToTerms: false,
  vat: false,
  taxnumber: "",
  isValid: "",
  summary: "",
  cart: "",
  shippingMethods: "",
  paymentsMethods: "",
  currency: "",
  orderButton: false,
  billingAddress: false,
  promoCode: "",
  agreedToCookies: false,
  loading: false,
  backOrderInfo: false,
  discount: null,
  changeCurrency: false,
  newCurrency: "",
});

onMounted(async () => {
  const basket = await useGetCart(country.code, cart_id);
  assignBasket(basket);
  state.basket = basket.shoppingcarts[0].shoppingcart;
});

const countries =
  host === "UK"
    ? Object.keys(countriesObjectUK)
    : Object.keys(countriesObjectEU);

const countriesArray =
  host === "UK"
    ? Object.keys(countriesObjectUK).map((key) => {
        return {
          name: key,
          code: countriesObjectUK[key],
        };
      })
    : Object.keys(countriesObjectEU).map((key) => {
        return {
          name: key,
          code: countriesObjectEU[key],
        };
      });

const countryPrefix = computed(() => {
  if (billingForm.billCountryName) {
    return Object.entries(countriesObjectEU).find(
      (obj) => obj[0] === billingForm.billCountryName
    )[1];
  }
});

const checkCurrency = async (value) => {
  if (value === "PL" && state.basket.currency._id !== "pln") {
    state.newCurrency = "pln";
    state.changeCurrency = true;
  } else if (value !== "PL" && state.basket.currency._id !== "eur") {
    state.newCurrency = "eur";
    state.changeCurrency = true;
  } else {
    state.changeCurrency = false;
  }
};

const updateCurrency = async (val) => {
  if (val) {
    await useUpdateCartField(cart_id, null, "currency", state.newCurrency);
    const basket = await useGetCart(country.code, cart_id);
    assignBasket(basket);
  }
  state.changeCurrency = false;
};

const promoCodeHandler = async (code) => {
  state.promoCode = "";
  if (code) {
    const basket = await useUpdateCartField(cart_id, null, "promocode", code);
    assignBasket(basket);
  } else {
    const basket = await useUpdateCartField(
      cart_id,
      null,
      "promocode",
      state.promoCode
    );
    assignBasket(basket);
  }
};

const updateZipCode = debounce(async (zip) => {
  const changes = [
    { field: "shippingmethod", value: "" },
    { field: "shipzip", value: zip },
  ];
  const basket = await useUpdateCartFields(cart_id, changes);
  assignBasket(basket);
  if (shippingForm.shippingMethod._id) shippingForm.shippingMethod._id = "";
}, 700);

const isValid = debounce(async () => {
  if (billingForm.billCountryName && state.taxnumber.length > 6) {
    const prefix = Object.entries(countriesObjectEU).find(
      (obj) => obj[0] === billingForm.billCountryName
    )[1];

    const res = await useUpdateCartField(
      cart_id,
      null,
      "taxnumber",
      `${prefix}${state.taxnumber}`
    );

    state.isValid = res.shoppingcarts[0].shoppingcart.validtaxnumber;
  } else {
    state.isValid = false;
  }
}, 700);

const assignBasket = (basket) => {
  state.summary = basket.summary;
  state.cart = basket.shoppingcarts[0].shoppingcart.transactionlines.filter(
    (obj) => obj.kitcomponent !== true
  );
  state.shippingMethods = basket.shoppingcarts[0].options.shippingmethod;
  state.paymentsMethods = basket.shoppingcarts[0].options.paymentmethod.filter(
    (obj) => obj.paymentrequired === true
  );
  state.currency = basket.shoppingcarts[0].shoppingcart.currency.symbol;
  state.promoCode = basket.shoppingcarts[0].shoppingcart.promocode
    ? basket.shoppingcarts[0].shoppingcart.promocode
    : "";
  state.backOrderInfo = basket.shoppingcarts[0].shoppingcart.backorderquantity;
  state.discount =
    basket.shoppingcarts[0].shoppingcart.transactionlines[0].discountrate;
  state.basket = basket.shoppingcarts[0].shoppingcart;
};

const billingAddressHandler = () => {
  state.billingAddress = !state.billingAddress;
  if (!state.billingAddress) {
    state.vat = false;
  }
};

const handleChange = async (changes) => {
  const basket = await useUpdateCartFields(cart_id, changes);
  assignBasket(basket);
};

const createAddress = async () => {
  const [shippingCountry] = countriesArray.filter(
    (el) => el.name === shippingForm.country
  );
  const address = await useCreateAddress(
    cart_id,
    {
      ...shippingForm,
      address: `${shippingForm.addressStreet} ${shippingForm.addressNumber}`,
      addressee:
        shippingForm.company ||
        `${shippingForm.firstName} ${shippingForm.lastName}`,
      name: `${shippingForm.firstName} ${shippingForm.lastName}`,
      _id: "",
    },
    shippingCountry.code
  );

  const setBillingAddress = async () => {
    const [billingCountry] = countriesArray.filter(
      (el) => el.name === billingForm.billCountryName
    );

    if (state.billingAddress) {
      return await useCreateAddress(
        cart_id,
        {
          address: `${billingForm.billAddress}`,
          address2: `${billingForm.billAddress2}`,
          addressee: `${shippingForm.firstName} ${shippingForm.lastName}`,
          name: `${shippingForm.firstName} ${shippingForm.lastName}`,
          city: `${billingForm.billCity}`,
          zip: `${billingForm.zip}`,
        },
        billingCountry.code
      );
    }
  };

  const res = await setBillingAddress();
  const changes = [
    {
      field: "shipaddressee",
      value: `${shippingForm.firstName} ${shippingForm.lastName}`,
    },
    { field: "shipemail", value: shippingForm.email },
    { field: "reqpayment", value: true },
  ];
  await handleChange(changes);
  await useUpdateCartField(cart_id, null, "sendtogether", true);
  await useUpdateCartField(cart_id, null, "shippingaddress", address._id);
  if (state.billingAddress) {
    await useUpdateCartField(cart_id, null, "billingaddress", res._id);
  }
  try {
    state.loading = true;
    const transaction = await useConfirmOrder(cart_id, country.code);
    const order = await useGetOrder(cart_id, country.code);

    if (transaction && order) {
      window.dataLayer?.push({
        event: "purchase",
        ecommerce: {
          items: order.transactionlines.map((line) => ({
            id: line._id,
            name: line.displayname,
            quantity: line.quantity,
            price: line.grosamount,
          })),
          transaction_id: order.name,
          value: order.grossamount,
          tax: order.taxamount,
          shipping: order.grossshippingcost,
          currency: order.currency.name,
          coupon: "",
        },
      });
      store.setBasketQuantity(0);
      store.setCartId("");
      store.clearBillingForm();
      store.clearShippingForm();
      state.loading = false;
      navigateTo(`/order/${transaction._id}`);
    } else {
      console.log(e);
    }
  } catch (e) {
    showError(e);
  }
};

// RULES!!

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage("First name is required", required),
    },
    lastName: {
      required: helpers.withMessage("Last name is required", required),
    },
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Invalid email", email),
    },
    confirmEmail: {
      required: helpers.withMessage("Email is required", required),
      sameAs: sameAs(shippingForm.email),
    },
    phone: {
      required: helpers.withMessage("Phone number is required", required),
      numeric,
    },
    addressStreet: {
      required: helpers.withMessage("Street address is required", required),
    },

    addressNumber: {
      required: helpers.withMessage("Street number is required", required),
    },
    city: {
      required: helpers.withMessage("City name is required", required),
    },
    zip: {
      required: helpers.withMessage("Postal code is required", required),
    },
    country: {
      required: helpers.withMessage("Country is required", required),
    },
  };
});

const billingRules = {
  billCompany: {
    requiredIf: helpers.withMessage(
      "Company name is required",
      requiredIf(() => state.billingAddress)
    ),
  },
  billZip: {
    requiredIf: helpers.withMessage(
      "Postal code is required",
      requiredIf(() => state.billingAddress)
    ),
  },
  billCity: {
    requiredIf: helpers.withMessage(
      "City name is required",
      requiredIf(() => state.billingAddress)
    ),
  },
  billAddress: {
    requiredIf: helpers.withMessage(
      "Address is required",
      requiredIf(() => state.billingAddress)
    ),
  },
  billCountryName: {
    requiredIf: helpers.withMessage(
      "Country name is required",
      requiredIf(() => state.billingAddress)
    ),
  },
};

const taxRules = {
  taxnumber: {
    required: helpers.withMessage("Value is required", requiredIf(!state.vat)),
    valid: helpers.withMessage(`Invalid VAT number`, () => state.isValid),
  },
  agreedToTerms: {
    sameAs: helpers.withMessage("Consent is required", sameAs(true)),
  },
  agreedToCookies: {
    sameAs: helpers.withMessage("Consent is required", sameAs(true)),
  },
};

const v$ = useVuelidate(rules, shippingForm);
const x$ = useVuelidate(billingRules, billingForm);
const t$ = useVuelidate(taxRules, state);

const updateTax = async () => {
  const tax = host === "UK" ? TAX.UK : TAX.EU;
  const basket = await useUpdateCartField(
    cart_id,
    null,
    "tax",
    state.vat ? TAX.ZERO : tax
  );

  assignBasket(basket);
};

watch(
  () => [shippingForm.shippingMethod, shippingForm.paymentMethod],
  async () => {
    const changes = [
      { field: "shippingmethod", value: shippingForm.shippingMethod._id },
      { field: "paymentmethod", value: shippingForm.paymentMethod._id },
    ];
    await handleChange(changes);
    updateTax();
  }
);

watch(
  () => [state, shippingForm, billingForm],
  async () => {
    if (
      shippingForm.paymentMethod._id &&
      shippingForm.shippingMethod._id &&
      (cookieConsent.value || state.agreedToCookies) &&
      state.agreedToTerms
    ) {
      if ((await v$.value.$validate()) && !state.billingAddress && !state.vat) {
        state.orderButton = true;
      } else if (
        (await v$.value.$validate()) &&
        state.billingAddress &&
        (await x$.value.$validate()) &&
        !state.vat
      ) {
        state.orderButton = true;
      } else if (
        (await v$.value.$validate()) &&
        state.billingAddress &&
        (await x$.value.$validate()) &&
        state.vat &&
        (await t$.value.$validate())
      ) {
        state.orderButton = true;
      } else {
        state.orderButton = false;
      }
    } else {
      state.orderButton = false;
    }
  },
  { deep: true }
);

watch(
  () => shippingForm.country,
  async () => {
    const country = shippingForm.country
      ? countriesArray.find((obj) => obj.name === shippingForm.country)
      : store.getCountry();
    await useUpdateCartField(cart_id, null, "shipcountry", country.code);
    const changes = [{ field: "shippingmethod", value: "" }];
    await handleChange(changes);
    updateTax();
    checkCurrency(country.code);
    if (shippingForm.shippingMethod._id) shippingForm.shippingMethod._id = "";
  }
);

watch(
  () => state.vat,
  async () => {
    updateTax();

    if (await t$.value.$validate()) {
      state.orderButton = true;
    } else {
      state.orderButton = false;
    }
  }
);
</script>

<style scoped>
:deep(.v-messages__message) {
  font-size: 13px;
}
:deep(.v-checkbox .v-selection-control) {
  min-height: 20px;
}
:deep(.v-input__details) {
  padding: 6px 16px 0 16px;
}
:deep(.v-selection-control__wrapper) {
  height: 30px;
}
</style>
