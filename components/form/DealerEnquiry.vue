<template>
  <ClientOnly>
    <section
      class="container mx-auto px-4 py-5 font-roboto sm:max-w-[540px] sm:px-5 sm:py-10 md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px] 2xl:max-w-[1440px]"
    >
      <v-form
        @submit.prevent="submitDealerForm"
        class="mx-auto max-w-[800px] border-2 border-[#E5E5E5] p-4 font-nunito"
      >
        <div class="flex flex-col mb-3">
          <label for="first_name" class="mb-2 text-sm sm:text-base"
            >First name<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-text-field
            id="first_name"
            v-model="state.firstName"
            :error-messages="v2$.firstName.$errors.map((e) => e.$message)"
            type="text"
            @input="v2$.firstName.$touch"
            @blur="v2$.firstName.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="last_name" class="mb-2 text-sm sm:text-base"
            >Last name<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-text-field
            id="last_name"
            v-model="state.lastName"
            :error-messages="v2$.lastName.$errors.map((e) => e.$message)"
            type="text"
            @input="v2$.lastName.$touch"
            @blur="v2$.lastName.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="company" class="mb-2 text-sm sm:text-base"
            >Name of the company<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-text-field
            id="company"
            v-model="state.company"
            :error-messages="v2$.company.$errors.map((e) => e.$message)"
            type="text"
            @input="v2$.company.$touch"
            @blur="v2$.company.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="email_dealer" class="mb-2 text-sm sm:text-base"
            >Email<span class="text-sm text-red-700 sm:text-lg">*</span></label
          >
          <v-text-field
            id="email_dealer"
            v-model="state.email"
            :error-messages="v2$.email.$errors.map((e) => e.$message)"
            type="email"
            @input="v2$.email.$touch"
            @blur="v2$.email.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="confirmEmail_dealer" class="mb-2 text-sm sm:text-base"
            >Repeat email<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-text-field
            id="confirmEmail_dealer"
            v-model="state.confirmEmail"
            :error-messages="v2$.confirmEmail.$errors.map((e) => e.$message)"
            type="email"
            @input="v2$.confirmEmail.$touch"
            @blur="v2$.confirmEmail.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="phone" class="mb-2 text-sm sm:text-base">Phone</label>

          <v-text-field
            id="phone"
            v-model="state.phone"
            type="text"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="vat" class="mb-2 text-sm sm:text-base"
            >VAT number<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-text-field
            id="vat"
            v-model="state.vat_number"
            :error-messages="v2$.vat_number.$errors.map((e) => e.$message)"
            type="text"
            @input="v2$.vat_number.$touch"
            @blur="v2$.vat_number.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="message_dealer" class="mb-2 text-sm sm:text-base"
            >Message<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-textarea
            id="message_dealer"
            @input="v2$.text.$touch"
            @blur="v2$.text.$touch"
            v-model="state.text"
            :error-messages="v2$.text.$errors.map((e) => e.$message)"
            persistent-hint
            variant="outlined"
          ></v-textarea>
        </div>

        <h4 class="py-4 font-bold text-bold sm:text-lg">Billing address</h4>

        <div class="flex flex-col mb-3">
          <label for="street" class="mb-2 text-sm sm:text-base"
            >Street address and number<span
              class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-text-field
            id="street"
            v-model="state.billing_address_street_1"
            :error-messages="
              v2$.billing_address_street_1.$errors.map((e) => e.$message)
            "
            type="text"
            @input="v2$.billing_address_street_1.$touch"
            @blur="v2$.billing_address_street_1.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="apartament" class="mb-2 text-sm sm:text-base"
            >Apartment, suite, etc. (optional)</label
          >
          <v-text-field
            id="apartament"
            v-model="state.billing_address_street_2"
            type="text"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="city_dealer" class="mb-2 text-sm sm:text-base"
            >City<span class="text-sm text-red-700 sm:text-lg">*</span></label
          >

          <v-text-field
            id="city_dealer"
            v-model="state.billing_address_city"
            :error-messages="
              v2$.billing_address_city.$errors.map((e) => e.$message)
            "
            type="text"
            @input="v2$.billing_address_city.$touch"
            @blur="v2$.billing_address_city.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="postal_dealer" class="mb-2 text-sm sm:text-base"
            >Postal code<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-text-field
            id="postal_dealer"
            v-model="state.billing_address_post"
            :error-messages="
              v2$.billing_address_post.$errors.map((e) => e.$message)
            "
            required
            type="text"
            @input="v2$.billing_address_post.$touch"
            @blur="v2$.billing_address_post.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="country_dealer" class="mb-2 text-sm sm:text-base"
            >Country<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-select
            id="country_dealer"
            v-model="state.billing_address_country"
            :items="countries"
            :error-messages="
              v2$.billing_address_country.$errors.map((e) => e.$message)
            "
            @input="v2$.billing_address_country.$touch"
            @blur="v2$.billing_address_country.$touch"
            density="compact"
            variant="outlined"
          ></v-select>
        </div>

        <div class="py-4">
          <input
            type="checkbox"
            id="billing"
            v-model="state.is_delivery_different"
            class="cursor-pointer"
          /><label
            for="billing"
            class="ml-2 text-sm cursor-pointer sm:text-base"
            >Delivery address different than billing</label
          >
          <div v-show="state.is_delivery_different">
            <h4 class="py-4 text-lg font-bold">Delivery address</h4>
            <div class="flex flex-col mb-3">
              <label
                for="country_dealer_delivery"
                class="mb-2 text-sm sm:text-base"
                >Street address and number<span
                  class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >

              <v-text-field
                id="country_dealer_delivery"
                v-model="state.delivery_address_street_1"
                :error-messages="
                  v2$.delivery_address_street_1.$errors.map((e) => e.$message)
                "
                type="text"
                @input="v2$.delivery_address_street_1.$touch"
                @blur="v2$.delivery_address_street_1.$touch"
                density="compact"
                variant="outlined"
              />
            </div>

            <div class="flex flex-col mb-3">
              <label for="apartament_delivery" class="mb-2 text-sm sm:text-base"
                >Apartment, suite, etc. (optional)</label
              >
              <v-text-field
                id="apartament_delivery"
                v-model="state.billing_address_street_2"
                type="text"
                density="compact"
                variant="outlined"
              />
            </div>

            <div class="flex flex-col mb-3">
              <label for="city_delivery" class="mb-2 text-sm sm:text-base"
                >City<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >

              <v-text-field
                id="city_delivery"
                v-model="state.delivery_address_city"
                :error-messages="
                  v2$.delivery_address_city.$errors.map((e) => e.$message)
                "
                type="text"
                @input="v2$.delivery_address_city.$touch"
                @blur="v2$.delivery_address_city.$touch"
                density="compact"
                variant="outlined"
              />
            </div>

            <div class="flex flex-col mb-3">
              <label for="postal_delivery" class="mb-2 text-sm sm:text-base"
                >Postal code<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-text-field
                id="postal_delivery"
                v-model="state.delivery_address_post"
                :error-messages="
                  v2$.delivery_address_post.$errors.map((e) => e.$message)
                "
                type="text"
                @input="v2$.delivery_address_post.$touch"
                @blur="v2$.delivery_address_post.$touch"
                density="compact"
                variant="outlined"
              />
            </div>

            <div class="flex flex-col mb-3">
              <label for="country_delivery" class="mb-2 text-sm sm:text-base"
                >Country<span class="text-sm text-red-700 sm:text-lg"
                  >*</span
                ></label
              >
              <v-select
                id="country_delivery"
                v-model="state.delivery_address_country"
                :items="countries"
                :error-messages="
                  v2$.delivery_address_country.$errors.map((e) => e.$message)
                "
                @input="v2$.delivery_address_country.$touch"
                @blur="v2$.delivery_address_country.$touch"
                density="compact"
                variant="outlined"
              ></v-select>
            </div>
          </div>
        </div>

        <h4 class="py-4 text-sm font-bold sm:text-base">
          By answering following voluntary questions you can help us deliver a
          tailor-made service to you:
        </h4>
        <p class="mb-2 text-sm sm:text-base">
          Are you a wholesaler / retailer / specialised garage or other?
        </p>
        <v-select
          v-model="state.who"
          :items="options.who"
          density="compact"
          variant="outlined"
        ></v-select>
        <p class="mb-2 text-sm sm:text-base">
          Are your customers individual car owners or garages and retail
          outlets?
        </p>
        <v-select
          v-model="state.customer"
          :items="options.customer"
          density="compact"
          variant="outlined"
        ></v-select>
        <p class="mb-2 text-sm sm:text-base">
          Do you have an online shop (if such - what is the www)?
        </p>
        <v-select
          v-model="state.website"
          :items="options.website"
          density="compact"
          variant="outlined"
        ></v-select>
        <p class="mb-2 text-sm sm:text-base">
          Do you have any specialisation (vehicle makes or certain parts only)?
        </p>
        <v-select
          v-model="state.specialisation"
          :items="options.specialisation"
          density="compact"
          variant="outlined"
        ></v-select>
        <p class="mb-2 text-sm sm:text-base">
          Do you service local area/entire country/sell outside of country?
        </p>
        <v-select
          v-model="state.range"
          :items="options.range"
          density="compact"
          variant="outlined"
        ></v-select>
        <p class="mb-2 text-sm sm:text-base">
          Do you plan to stock products in your warehouse?
        </p>
        <v-select
          v-model="state.stock"
          :items="options.website"
          density="compact"
          variant="outlined"
        ></v-select>

        <v-checkbox
          v-model="state.privacy"
          color="red-600"
          :error-messages="v2$.privacy.$errors.map((e) => e.$message)"
          :focused="false"
          @change="v2$.privacy.$touch"
          @blur="v2$.privacy.$touch"
        >
          <template v-slot:label>
            Agree to&nbsp;
            <v-tooltip disabled>
              <template v-slot:activator="{ props }">
                <nuxt-link
                  :focused="false"
                  target="_blank"
                  to="/privacy-policy"
                  v-bind="props"
                  @click.stop
                  ><p
                    class="text-sm daisy-link-hover daisy-link-error daisy-link sm:text-base"
                  >
                    Privacy Policy
                  </p></nuxt-link
                >
              </template>
            </v-tooltip>
          </template>
        </v-checkbox>
        <div class="my-2 text-center">
          <button
            class="text-sm sm:text-base rounded-lg text-white bg-mustangRed hover:bg-red-500 w-full sm:w-[40%] px-4 py-2 font-semibold uppercase transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </v-form>
      <UiDealerEnquiryModal :info="modalInfo.info" :title="modalInfo.title" />
    </section>
  </ClientOnly>
</template>

<script setup>
import { countriesObjectEU, countriesObjectUK } from "../../vars/index";
import {
  email,
  required,
  helpers,
  sameAs,
  requiredIf,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const store = useStore();
const host = store.getHost();

const countries =
  host === "UK"
    ? Object.keys(countriesObjectUK)
    : Object.keys(countriesObjectEU);

const countriesArray =
  host === "UK"
    ? Object.keys(countriesObjectUK).map((key) => {
        return {
          name: key,
          value: countriesObjectUK[key],
        };
      })
    : Object.keys(countriesObjectEU).map((key) => {
        return {
          name: key,
          value: countriesObjectEU[key],
        };
      });

const state = reactive({
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  confirmEmail: "",
  phone: "",
  vat_number: "",
  who: "",
  customer: "",
  website: "",
  specialisation: "",
  range: "",
  stock: "",
  billing_address_street_1: "",
  billing_address_street_2: "",
  billing_address_city: "",
  billing_address_post: "",
  billing_address_country: "",
  delivery_address_street_1: "",
  delivery_address_street_2: "",
  delivery_address_city: "",
  delivery_address_post: "",
  delivery_address_country: "",
  is_delivery_different: false,
  text: "",
  privacy: false,
});

const modalInfo = reactive({
  info: "",
  title: "",
});

const options = reactive({
  who: ["Wholesaler", "Retailer", "Specialised garage", "Other"],
  customer: ["Individual car owners", "Garages and retail outlets"],
  website: ["Yes", "No"],
  specialisation: ["Vehicle makes", "Certain parts only"],
  range: ["Local area", "Entire country", "Sell outside of country"],
});

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage("Value is required", required),
    },
    lastName: {
      required: helpers.withMessage("Value is required", required),
    },
    company: {
      required: helpers.withMessage("Value is required", required),
    },
    email: {
      required: helpers.withMessage("Value is required", required),
      email: helpers.withMessage("Invalid value", email),
    },
    confirmEmail: {
      required: helpers.withMessage("Email is required", required),
      sameAs: sameAs(state.email),
    },
    vat_number: {
      required: helpers.withMessage("Value is required", required),
    },
    text: {
      required: helpers.withMessage("Value is required", required),
    },
    billing_address_street_1: {
      required: helpers.withMessage("Value is required", required),
    },
    billing_address_city: {
      required: helpers.withMessage("Value is required", required),
    },
    billing_address_post: {
      required: helpers.withMessage("Value is required", required),
    },
    billing_address_country: {
      required: helpers.withMessage("Value is required", required),
    },
    is_delivery_different: {
      required: helpers.withMessage("Value is required", required),
    },
    delivery_address_street_1: {
      required: requiredIf(() => state.is_delivery_different),
    },
    delivery_address_city: {
      required: requiredIf(() => state.is_delivery_different),
    },
    delivery_address_post: {
      required: requiredIf(() => state.is_delivery_different),
    },
    delivery_address_country: {
      required: requiredIf(() => state.is_delivery_different),
    },
    privacy: {
      sameAs: helpers.withMessage("Value is required", sameAs(true)),
    },
  };
});

const v2$ = useVuelidate(rules, state);

const submitDealerForm = async () => {
  const billingCountry = countriesArray.find(
    (el) => el.name === state.billing_address_country
  );
  const deliveryCountry = countriesArray.find((el) =>
    el.name ? el.name === state.delivery_address_country : ""
  );
  if (await v2$.value.$validate()) {
    const status1 = await useCreateLead({
      address: state.billing_address_street_1,
      address2: state.billing_address_street_2,
      addressee: state.company,
      city: state.billing_address_city,
      comment: "",
      country: billingCountry.value,
      displayname: state.company,
      email: state.email,
      firstname: state.firstName,
      lastname: state.lastName,
      name: state.company,
      phone: state.phone,
      taxnumber: state.vat_number,
      website: state.website,
      zip: state.billing_address_post,
    });
    const status2 = await useSubmitContactForm(
      {
        ...state,
        billing_address_country: billingCountry.value,
        delivery_address_country:
          deliveryCountry === undefined ? "" : deliveryCountry.value,
      },
      "DEALER"
    );
    if (status1 === 200 && status2 === 200) {
      modalInfo.title = "Dealer Form Submitted";
      modalInfo.info = "We endeavour to respond within 48 hours";
      dealerEnquiryModal.showModal();
      state.privacy = false;
    } else {
      modalInfo.title = "An error occured";
      modalInfo.info = "Please try again later";
      dealerEnquiryModal.showModal();
      state.privacy = false;
    }
  } else {
    modalInfo.title = "Incorrect Form Data";
    modalInfo.info = "Please try again later";
    dealerEnquiryModal.showModal();
  }
};
</script>
