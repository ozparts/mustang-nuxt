<template>
  <section class="font-roboto">
    <form
      @submit.prevent="submitDealerForm"
      class="mx-auto max-w-[760px] rounded-2xl border border-base-300 bg-base-100 p-5 font-nunito shadow-sm sm:p-8"
    >
      <div class="daisy-divider daisy-divider-start my-0 mb-4 text-xs font-bold uppercase tracking-wide text-base-content/60">
        Your details
      </div>

      <div class="grid grid-cols-1 gap-3 gap-x-4 sm:grid-cols-2">
        <div>
          <label for="first_name" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >First name<span class="text-error">*</span></label
          >
          <input
            id="first_name"
            v-model="state.firstName"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{ 'daisy-input-error': v2$.firstName.$errors.length }"
            @input="v2$.firstName.$touch"
            @blur="v2$.firstName.$touch"
          />
          <p
            v-for="err in v2$.firstName.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div>
          <label for="last_name" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Last name<span class="text-error">*</span></label
          >
          <input
            id="last_name"
            v-model="state.lastName"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{ 'daisy-input-error': v2$.lastName.$errors.length }"
            @input="v2$.lastName.$touch"
            @blur="v2$.lastName.$touch"
          />
          <p
            v-for="err in v2$.lastName.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div>
          <label for="company" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Name of the company<span class="text-error">*</span></label
          >
          <input
            id="company"
            v-model="state.company"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{ 'daisy-input-error': v2$.company.$errors.length }"
            @input="v2$.company.$touch"
            @blur="v2$.company.$touch"
          />
          <p
            v-for="err in v2$.company.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div>
          <label for="vat" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >VAT number<span class="text-error">*</span></label
          >
          <input
            id="vat"
            v-model="state.vat_number"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{ 'daisy-input-error': v2$.vat_number.$errors.length }"
            @input="v2$.vat_number.$touch"
            @blur="v2$.vat_number.$touch"
          />
          <p
            v-for="err in v2$.vat_number.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div>
          <label for="email_dealer" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Email<span class="text-error">*</span></label
          >
          <input
            id="email_dealer"
            v-model="state.email"
            type="email"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{ 'daisy-input-error': v2$.email.$errors.length }"
            @input="v2$.email.$touch"
            @blur="v2$.email.$touch"
          />
          <p
            v-for="err in v2$.email.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div>
          <label for="confirmEmail_dealer" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Repeat email<span class="text-error">*</span></label
          >
          <input
            id="confirmEmail_dealer"
            v-model="state.confirmEmail"
            type="email"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{ 'daisy-input-error': v2$.confirmEmail.$errors.length }"
            @input="v2$.confirmEmail.$touch"
            @blur="v2$.confirmEmail.$touch"
          />
          <p
            v-for="err in v2$.confirmEmail.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div>
          <label for="phone" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Phone</label
          >
          <input
            id="phone"
            v-model="state.phone"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
          />
        </div>

        <div class="sm:col-span-2">
          <label for="message_dealer" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Message<span class="text-error">*</span></label
          >
          <textarea
            id="message_dealer"
            v-model="state.text"
            rows="3"
            class="daisy-textarea daisy-textarea-bordered daisy-textarea-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm"
            :class="{ 'daisy-textarea-error': v2$.text.$errors.length }"
            @input="v2$.text.$touch"
            @blur="v2$.text.$touch"
          ></textarea>
          <p
            v-for="err in v2$.text.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>
      </div>

      <div class="daisy-divider daisy-divider-start mb-4 mt-6 text-xs font-bold uppercase tracking-wide text-base-content/60">
        Billing address
      </div>

      <div class="grid grid-cols-1 gap-3 gap-x-4 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="street" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Street address and number<span class="text-error">*</span></label
          >
          <input
            id="street"
            v-model="state.billing_address_street_1"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{
              'daisy-input-error': v2$.billing_address_street_1.$errors.length,
            }"
            @input="v2$.billing_address_street_1.$touch"
            @blur="v2$.billing_address_street_1.$touch"
          />
          <p
            v-for="err in v2$.billing_address_street_1.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label for="apartament" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Apartment, suite, etc. (optional)</label
          >
          <input
            id="apartament"
            v-model="state.billing_address_street_2"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
          />
        </div>

        <div>
          <label for="city_dealer" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >City<span class="text-error">*</span></label
          >
          <input
            id="city_dealer"
            v-model="state.billing_address_city"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{
              'daisy-input-error': v2$.billing_address_city.$errors.length,
            }"
            @input="v2$.billing_address_city.$touch"
            @blur="v2$.billing_address_city.$touch"
          />
          <p
            v-for="err in v2$.billing_address_city.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div>
          <label for="postal_dealer" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Postal code<span class="text-error">*</span></label
          >
          <input
            id="postal_dealer"
            v-model="state.billing_address_post"
            type="text"
            class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{
              'daisy-input-error': v2$.billing_address_post.$errors.length,
            }"
            @input="v2$.billing_address_post.$touch"
            @blur="v2$.billing_address_post.$touch"
          />
          <p
            v-for="err in v2$.billing_address_post.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label for="country_dealer" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
            >Country<span class="text-error">*</span></label
          >
          <select
            id="country_dealer"
            v-model="state.billing_address_country"
            class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            :class="{
              'daisy-select-error': v2$.billing_address_country.$errors.length,
            }"
            @change="v2$.billing_address_country.$touch"
            @blur="v2$.billing_address_country.$touch"
          >
            <option disabled value="">Select a country</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
          <p
            v-for="err in v2$.billing_address_country.$errors"
            :key="err.$uid"
            class="mt-1 text-xs text-error"
          >
            {{ err.$message }}
          </p>
        </div>
      </div>

      <label
        for="billing"
        class="mt-4 flex w-fit cursor-pointer items-center gap-2"
      >
        <input
          type="checkbox"
          id="billing"
          v-model="state.is_delivery_different"
          class="daisy-checkbox daisy-checkbox-sm h-4 w-4 rounded border border-base-300"
        />
        <span class="text-xs sm:text-sm">Delivery address different than billing</span>
      </label>

      <div v-show="state.is_delivery_different">
        <div class="daisy-divider daisy-divider-start mb-4 mt-4 text-xs font-bold uppercase tracking-wide text-base-content/60">
          Delivery address
        </div>
        <div class="grid grid-cols-1 gap-3 gap-x-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="country_dealer_delivery" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
              >Street address and number<span class="text-error">*</span></label
            >
            <input
              id="country_dealer_delivery"
              v-model="state.delivery_address_street_1"
              type="text"
              class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              :class="{
                'daisy-input-error':
                  v2$.delivery_address_street_1.$errors.length,
              }"
              @input="v2$.delivery_address_street_1.$touch"
              @blur="v2$.delivery_address_street_1.$touch"
            />
            <p
              v-for="err in v2$.delivery_address_street_1.$errors"
              :key="err.$uid"
              class="mt-1 text-xs text-error"
            >
              {{ err.$message }}
            </p>
          </div>

          <div class="sm:col-span-2">
            <label for="apartament_delivery" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
              >Apartment, suite, etc. (optional)</label
            >
            <input
              id="apartament_delivery"
              v-model="state.delivery_address_street_2"
              type="text"
              class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
            />
          </div>

          <div>
            <label for="city_delivery" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
              >City<span class="text-error">*</span></label
            >
            <input
              id="city_delivery"
              v-model="state.delivery_address_city"
              type="text"
              class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              :class="{
                'daisy-input-error': v2$.delivery_address_city.$errors.length,
              }"
              @input="v2$.delivery_address_city.$touch"
              @blur="v2$.delivery_address_city.$touch"
            />
            <p
              v-for="err in v2$.delivery_address_city.$errors"
              :key="err.$uid"
              class="mt-1 text-xs text-error"
            >
              {{ err.$message }}
            </p>
          </div>

          <div>
            <label for="postal_delivery" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
              >Postal code<span class="text-error">*</span></label
            >
            <input
              id="postal_delivery"
              v-model="state.delivery_address_post"
              type="text"
              class="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              :class="{
                'daisy-input-error': v2$.delivery_address_post.$errors.length,
              }"
              @input="v2$.delivery_address_post.$touch"
              @blur="v2$.delivery_address_post.$touch"
            />
            <p
              v-for="err in v2$.delivery_address_post.$errors"
              :key="err.$uid"
              class="mt-1 text-xs text-error"
            >
              {{ err.$message }}
            </p>
          </div>

          <div class="sm:col-span-2">
            <label for="country_delivery" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
              >Country<span class="text-error">*</span></label
            >
            <select
              id="country_delivery"
              v-model="state.delivery_address_country"
              class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              :class="{
                'daisy-select-error':
                  v2$.delivery_address_country.$errors.length,
              }"
              @change="v2$.delivery_address_country.$touch"
              @blur="v2$.delivery_address_country.$touch"
            >
              <option disabled value="">Select a country</option>
              <option v-for="c in countries" :key="c" :value="c">
                {{ c }}
              </option>
            </select>
            <p
              v-for="err in v2$.delivery_address_country.$errors"
              :key="err.$uid"
              class="mt-1 text-xs text-error"
            >
              {{ err.$message }}
            </p>
          </div>
        </div>
      </div>

      <details
        class="daisy-collapse daisy-collapse-arrow mt-6 rounded-lg border border-base-300 bg-base-100"
      >
        <summary class="daisy-collapse-title text-xs font-bold uppercase tracking-wide text-base-content/70 sm:text-sm">
          Optional: help us serve you better
        </summary>
        <div class="daisy-collapse-content">
          <div class="grid grid-cols-1 gap-3 gap-x-4 pb-2 sm:grid-cols-2">
            <div>
              <label for="who" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
                >Wholesaler / retailer / specialised garage / other?</label
              >
              <select
                id="who"
                v-model="state.who"
                class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              >
                <option disabled value="">Select an option</option>
                <option v-for="o in options.who" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>
            </div>

            <div>
              <label for="customer" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
                >Individual owners or garages/retail?</label
              >
              <select
                id="customer"
                v-model="state.customer"
                class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              >
                <option disabled value="">Select an option</option>
                <option v-for="o in options.customer" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>
            </div>

            <div>
              <label for="website" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
                >Do you have an online shop?</label
              >
              <select
                id="website"
                v-model="state.website"
                class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              >
                <option disabled value="">Select an option</option>
                <option v-for="o in options.website" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>
            </div>

            <div>
              <label for="specialisation" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
                >Any specialisation?</label
              >
              <select
                id="specialisation"
                v-model="state.specialisation"
                class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              >
                <option disabled value="">Select an option</option>
                <option v-for="o in options.specialisation" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>
            </div>

            <div>
              <label for="range" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
                >Local, national, or international?</label
              >
              <select
                id="range"
                v-model="state.range"
                class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              >
                <option disabled value="">Select an option</option>
                <option v-for="o in options.range" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>
            </div>

            <div>
              <label for="stock" class="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/70"
                >Plan to stock products?</label
              >
              <select
                id="stock"
                v-model="state.stock"
                class="daisy-select daisy-select-bordered daisy-select-sm w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm"
              >
                <option disabled value="">Select an option</option>
                <option v-for="o in options.website" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </details>

      <label class="mt-6 flex w-fit cursor-pointer items-start gap-2">
        <input
          id="privacy"
          type="checkbox"
          v-model="state.privacy"
          class="daisy-checkbox daisy-checkbox-error daisy-checkbox-sm mt-0.5 h-4 w-4 rounded border border-base-300"
          @change="v2$.privacy.$touch"
          @blur="v2$.privacy.$touch"
        />
        <span class="flex flex-wrap items-center gap-1 text-xs sm:text-sm">
          Agree to
          <nuxt-link
            target="_blank"
            to="/privacy-policy"
            class="daisy-link daisy-link-hover text-mustangRed"
            @click.stop
            >Privacy Policy</nuxt-link
          >
        </span>
      </label>
      <p
        v-for="err in v2$.privacy.$errors"
        :key="err.$uid"
        class="mt-1 text-xs text-error"
      >
        {{ err.$message }}
      </p>

      <div class="mt-5 text-center">
        <button
          type="submit"
          class="daisy-btn daisy-btn-primary w-full gap-2 rounded-lg bg-mustangRed text-sm text-white uppercase hover:bg-red-500 sm:w-auto sm:px-10"
        >
          <Icon name="material-symbols:send-rounded" size="16px" />
          Submit
        </button>
      </div>
    </form>
    <UiDealerEnquiryModal :info="modalInfo.info" :title="modalInfo.title" />
  </section>
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

// Maps each field to its input id, used to focus the first invalid field on submit.
const FIELDS = {
  firstName: "first_name",
  lastName: "last_name",
  company: "company",
  email: "email_dealer",
  confirmEmail: "confirmEmail_dealer",
  vat_number: "vat",
  text: "message_dealer",
  billing_address_street_1: "street",
  billing_address_city: "city_dealer",
  billing_address_post: "postal_dealer",
  billing_address_country: "country_dealer",
  is_delivery_different: "billing",
  delivery_address_street_1: "country_dealer_delivery",
  delivery_address_city: "city_delivery",
  delivery_address_post: "postal_delivery",
  delivery_address_country: "country_delivery",
  privacy: "privacy",
};

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

const focusFirstInvalidField = () => {
  const firstError = v2$.value.$errors[0];
  if (!firstError) return;
  const el = document.getElementById(FIELDS[firstError.$property]);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus({ preventScroll: true });
};

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
    await nextTick();
    focusFirstInvalidField();
  }
};
</script>
