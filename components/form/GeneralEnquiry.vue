<template>
  <ClientOnly>
    <section
      class="container mx-auto px-4 py-5 font-roboto sm:max-w-[540px] sm:py-10 md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px] 2xl:max-w-[1440px]"
    >
      <v-form
        @submit.prevent="submitForm"
        class="mx-auto max-w-[800px] border-2 border-[#E5E5E5] p-4 font-nunito"
      >
        <div class="flex flex-col mb-3">
          <label for="firstName" class="mb-2 text-sm sm:text-base"
            >First name<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-text-field
            id="firstName"
            v-model="state.firstname"
            :error-messages="v$.firstname.$errors.map((e) => e.$message)"
            type="text"
            @input="v$.firstname.$touch"
            @blur="v$.firstname.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label for="lastName" class="mb-2 text-sm sm:text-base"
            >Last name<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-text-field
            id="lastName"
            v-model="state.lastname"
            :error-messages="v$.lastname.$errors.map((e) => e.$message)"
            type="text"
            @input="v$.lastname.$touch"
            @blur="v$.lastname.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label for="email" class="mb-2 text-sm sm:text-base"
            >Email<span class="text-sm text-red-700 sm:text-lg">*</span></label
          >
          <v-text-field
            id="email"
            v-model="state.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            type="email"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label for="confirmEmail" class="mb-2 text-sm sm:text-base"
            >Repeat email<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-text-field
            id="confirmEmail"
            v-model="state.confirmEmail"
            :error-messages="v$.confirmEmail.$errors.map((e) => e.$message)"
            type="email"
            @input="v$.confirmEmail.$touch"
            @blur="v$.confirmEmail.$touch"
            density="compact"
            variant="outlined"
          />
        </div>

        <div class="flex flex-col mb-3">
          <label for="country" class="mb-2 text-sm sm:text-base"
            >Country<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >
          <v-select
            id="country"
            v-model="state.country"
            :items="countries"
            :error-messages="v$.country.$errors.map((e) => e.$message)"
            @input="v$.country.$touch"
            @blur="v$.country.$touch"
            density="compact"
            variant="outlined"
          ></v-select>
        </div>

        <div class="flex flex-col mb-3">
          <label for="type" class="mb-2 text-sm sm:text-base"
            >Type of enquiry<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-select
            id="type"
            v-model="state.type"
            :items="options.options"
            :error-messages="v$.type.$errors.map((e) => e.$message)"
            @input="v$.type.$touch"
            @blur="v$.type.$touch"
            persistent-hint
            density="compact"
            variant="outlined"
          />
        </div>
        <div
          class="flex flex-col mb-3"
          v-if="state.type === options.options[0]"
        >
          <label for="drive" class="mb-2 text-sm sm:text-base"
            >Drive style<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-select
            id="drive"
            v-model="state.styleSelected"
            :items="options.driveStyles"
            :error-messages="v$.styleSelected.$errors.map((e) => e.$message)"
            @input="v$.styleSelected.$touch"
            @blur="v$.styleSelected.$touch"
            persistent-hint
            density="compact"
            variant="outlined"
          />
        </div>
        <div
          class="flex flex-col mb-3"
          v-if="state.type === options.options[0]"
        >
          <label for="make" class="mb-2 text-sm sm:text-base"
            >Make<span class="text-sm text-red-700 sm:text-lg">*</span></label
          >
          <v-text-field
            id="make"
            v-model="state.make"
            :error-messages="v$.make.$errors.map((e) => e.$message)"
            type="text"
            @input="v$.make.$touch"
            @blur="v$.make.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div
          class="flex flex-col mb-3"
          v-if="state.type === options.options[0]"
        >
          <label for="model" class="mb-2 text-sm sm:text-base"
            >Model<span class="text-sm text-red-700 sm:text-lg">*</span></label
          >
          <v-text-field
            id="model"
            v-model="state.model"
            :error-messages="v$.model.$errors.map((e) => e.$message)"
            type="text"
            @input="v$.model.$touch"
            @blur="v$.model.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div
          class="flex flex-col mb-3"
          v-if="state.type === options.options[0]"
        >
          <label for="year" class="mb-2 text-sm sm:text-base"
            >Year<span class="text-sm text-red-700 sm:text-lg">*</span></label
          >

          <v-text-field
            id="year"
            v-model="state.year"
            :error-messages="v$.year.$errors.map((e) => e.$message)"
            type="text"
            @input="v$.year.$touch"
            @blur="v$.year.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div
          class="flex flex-col mb-3"
          v-if="state.type === options.options[0]"
        >
          <label for="engine" class="mb-2 text-sm sm:text-base"
            >Engine<span class="text-sm text-red-700 sm:text-lg">*</span></label
          >

          <v-text-field
            id="engine"
            v-model="state.engine"
            :error-messages="v$.engine.$errors.map((e) => e.$message)"
            type="text"
            @input="v$.engine.$touch"
            @blur="v$.engine.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div
          class="flex flex-col mb-3"
          v-if="state.type === options.options[1]"
        >
          <label for="partNumber" class="mb-2 text-sm sm:text-base"
            >Part number<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-text-field
            id="partNumber"
            v-model="state.part"
            :error-messages="v$.part.$errors.map((e) => e.$message)"
            type="text"
            @input="v$.part.$touch"
            @blur="v$.part.$touch"
            density="compact"
            variant="outlined"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label for="message" class="pb-2 text-sm sm:text-base"
            >Message<span class="text-sm text-red-700 sm:text-lg"
              >*</span
            ></label
          >

          <v-textarea
            id="message"
            @input="v$.text.$touch"
            @blur="v$.text.$touch"
            clearable
            v-model="state.text"
            :error-messages="v$.text.$errors.map((e) => e.$message)"
            variant="outlined"
          />
        </div>

        <v-checkbox
          v-model="state.privacy"
          color="red-600"
          :error-messages="v$.privacy.$errors.map((e) => e.$message)"
          :focused="false"
          @change="v$.privacy.$touch"
          @blur="v$.privacy.$touch"
        >
          <template v-slot:label>
            <div class="flex items-center">
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
                      class="text-base text-mustangRed daisy-link-hover daisy-link"
                    >
                      Privacy Policy
                    </p></nuxt-link
                  >
                </template>
              </v-tooltip>
            </div>
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
      <UiGeneralEnquiryModal :info="modalInfo.info" :title="modalInfo.title" />
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
import { useReCaptcha } from "vue-recaptcha-v3";

const store = useStore();
const host = store.getHost();

const state = reactive({
  firstname: "",
  lastname: "",
  email: "",
  confirmEmail: "",
  type: "",
  country: "",
  text: "",
  privacy: false,
  executeRecaptcha: null,
});

const modalInfo = reactive({
  info: "",
  title: "",
});

onMounted(async () => {
  const { recaptchaLoaded, executeRecaptcha } = useReCaptcha();
  state.executeRecaptcha = executeRecaptcha;
  await recaptchaLoaded();
});

const rules = computed(() => {
  return {
    firstname: {
      required: helpers.withMessage("Value is required", required),
    },
    lastname: {
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
    type: {
      required: helpers.withMessage("Value is required", required),
    },
    styleSelected: {
      requiredIf: helpers.withMessage(
        "Value is required",
        requiredIf(() => state.type === options.options[0])
      ),
    },
    make: {
      requiredIf: helpers.withMessage(
        "Value is required",
        requiredIf(() => state.type === options.options[0])
      ),
    },
    model: {
      requiredIf: helpers.withMessage(
        "Value is required",
        requiredIf(() => state.type === options.options[0])
      ),
    },
    year: {
      requiredIf: helpers.withMessage(
        "Value is required",
        requiredIf(() => state.type === options.options[0])
      ),
    },
    engine: {
      requiredIf: helpers.withMessage(
        "Value is required",
        requiredIf(() => state.type === options.options[0])
      ),
    },
    part: {
      requiredIf: helpers.withMessage(
        "Value is required",
        requiredIf(() => state.type === options.options[1])
      ),
    },
    country: {
      required: helpers.withMessage("Value is required", required),
    },
    text: {
      required: helpers.withMessage("Value is required", required),
    },
    privacy: {
      sameAs: helpers.withMessage("Value is required", sameAs(true)),
    },
  };
});

const submitForm = async () => {
  const token = await state.executeRecaptcha("submitContactForm");
  const res = await $fetch(`/api/verify-recaptcha/${token}`);
  if (res.success && res.score > 0.5 && (await v$.value.$validate())) {
    const country = countriesArray.find((el) => el.name === state.country);
    const status = await useSubmitContactForm(
      { ...state, country: country.value },
      "GENERAL"
    );
    if (status === 200) {
      modalInfo.title = "Contact Form Submitted";
      modalInfo.info = "We endeavour to respond within 48 hours.";
      generalEnquiryModal.showModal();
      state.privacy = false;
    } else {
      modalInfo.title = "An error occured";
      modalInfo.info = "Please try again later.";
      generalEnquiryModal.showModal();
      state.privacy = false;
    }
  } else {
    modalInfo.title = "Incorrect Form Data";
    modalInfo.info = "Please try again later.";
    generalEnquiryModal.showModal();
  }
};

const v$ = useVuelidate(rules, state);
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

const options = reactive({
  options: [
    "Product information requested (technical/price/availability) & I DO NOT know the part number",
    "Product information requested (technical/price/availability) & I DO know the part number",
    "Sponsorship enquiry",
    "Other questions or comments",
  ],
  driveStyles: [
    "Daily street driver or Street",
    "Track days",
    "Weekend warriors or Racing",
  ],
});
</script>
