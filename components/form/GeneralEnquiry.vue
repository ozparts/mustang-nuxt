<template>
  <section class="font-roboto">
    <form
      novalidate
      @submit.prevent="submitForm"
      class="mx-auto max-w-[760px] rounded-2xl border border-base-300 bg-base-100 p-5 font-nunito shadow-sm sm:p-8"
    >
      <div
        class="my-0 mb-4 text-xs font-bold tracking-wide uppercase daisy-divider daisy-divider-start text-base-content/60"
      >
        Your details
      </div>

      <div class="grid grid-cols-1 gap-3 gap-x-4 sm:grid-cols-2">
        <div>
          <label
            for="firstName"
            class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
            >First name<span aria-hidden="true" class="text-error"
              >*</span
            ></label
          >
          <input
            id="firstName"
            v-model="state.firstname"
            type="text"
            autocomplete="given-name"
            :aria-invalid="v$.firstname.$error"
            aria-required="true"
            class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
            :class="{ 'daisy-input-error': v$.firstname.$error }"
            @blur="v$.firstname.$touch"
          />
          <p
            v-for="msg in errorsFor(v$.firstname)"
            :key="msg"
            class="mt-1 text-xs text-error"
          >
            {{ msg }}
          </p>
        </div>

        <div>
          <label
            for="lastName"
            class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
            >Last name<span aria-hidden="true" class="text-error"
              >*</span
            ></label
          >
          <input
            id="lastName"
            v-model="state.lastname"
            type="text"
            autocomplete="family-name"
            :aria-invalid="v$.lastname.$error"
            aria-required="true"
            class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
            :class="{ 'daisy-input-error': v$.lastname.$error }"
            @blur="v$.lastname.$touch"
          />
          <p
            v-for="msg in errorsFor(v$.lastname)"
            :key="msg"
            class="mt-1 text-xs text-error"
          >
            {{ msg }}
          </p>
        </div>

        <div>
          <label
            for="email"
            class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
            >Email<span aria-hidden="true" class="text-error">*</span></label
          >
          <input
            id="email"
            v-model="state.email"
            type="email"
            autocomplete="email"
            :aria-invalid="v$.email.$error"
            aria-required="true"
            class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
            :class="{ 'daisy-input-error': v$.email.$error }"
            @blur="v$.email.$touch"
          />
          <p
            v-for="msg in errorsFor(v$.email)"
            :key="msg"
            class="mt-1 text-xs text-error"
          >
            {{ msg }}
          </p>
        </div>

        <div>
          <label
            for="confirmEmail"
            class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
            >Repeat email<span aria-hidden="true" class="text-error"
              >*</span
            ></label
          >
          <input
            id="confirmEmail"
            v-model="state.confirmEmail"
            type="email"
            autocomplete="email"
            :aria-invalid="v$.confirmEmail.$error"
            aria-required="true"
            class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
            :class="{ 'daisy-input-error': v$.confirmEmail.$error }"
            @blur="v$.confirmEmail.$touch"
          />
          <p
            v-for="msg in errorsFor(v$.confirmEmail)"
            :key="msg"
            class="mt-1 text-xs text-error"
          >
            {{ msg }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label
            for="country"
            class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
            >Country<span aria-hidden="true" class="text-error">*</span></label
          >
          <select
            id="country"
            v-model="state.country"
            :aria-invalid="v$.country.$error"
            aria-required="true"
            class="w-full px-3 text-sm border rounded-lg daisy-select daisy-select-bordered daisy-select-sm border-base-300 bg-base-100"
            :class="{ 'daisy-select-error': v$.country.$error }"
            @change="v$.country.$touch"
            @blur="v$.country.$touch"
          >
            <option disabled value="">Select a country</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
          <p
            v-for="msg in errorsFor(v$.country)"
            :key="msg"
            class="mt-1 text-xs text-error"
          >
            {{ msg }}
          </p>
        </div>

        <div class="sm:col-span-2">
          <label
            for="type"
            class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
            >Type of enquiry<span aria-hidden="true" class="text-error"
              >*</span
            ></label
          >
          <select
            id="type"
            v-model="state.type"
            :aria-invalid="v$.type.$error"
            aria-required="true"
            class="w-full px-3 text-sm border rounded-lg daisy-select daisy-select-bordered daisy-select-sm border-base-300 bg-base-100"
            :class="{ 'daisy-select-error': v$.type.$error }"
            @change="v$.type.$touch"
            @blur="v$.type.$touch"
          >
            <option disabled value="">Select an option</option>
            <option v-for="o in options.options" :key="o" :value="o">
              {{ o }}
            </option>
          </select>
          <p
            v-for="msg in errorsFor(v$.type)"
            :key="msg"
            class="mt-1 text-xs text-error"
          >
            {{ msg }}
          </p>
        </div>

        <div class="sm:col-span-2" v-if="isPartNumberEnquiry">
          <label
            for="partNumber"
            class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
            >Part number<span aria-hidden="true" class="text-error"
              >*</span
            ></label
          >
          <input
            id="partNumber"
            v-model="state.part"
            type="text"
            :aria-invalid="v$.part.$error"
            aria-required="true"
            class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
            :class="{ 'daisy-input-error': v$.part.$error }"
            @blur="v$.part.$touch"
          />
          <p
            v-for="msg in errorsFor(v$.part)"
            :key="msg"
            class="mt-1 text-xs text-error"
          >
            {{ msg }}
          </p>
        </div>
      </div>

      <div v-if="isVehicleEnquiry">
        <div
          class="mt-6 mb-4 text-xs font-bold tracking-wide uppercase daisy-divider daisy-divider-start text-base-content/60"
        >
          Vehicle details
        </div>
        <div class="grid grid-cols-1 gap-3 gap-x-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label
              for="drive"
              class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
              >Drive style<span aria-hidden="true" class="text-error"
                >*</span
              ></label
            >
            <select
              id="drive"
              v-model="state.styleSelected"
              :aria-invalid="v$.styleSelected.$error"
              aria-required="true"
              class="w-full px-3 text-sm border rounded-lg daisy-select daisy-select-bordered daisy-select-sm border-base-300 bg-base-100"
              :class="{ 'daisy-select-error': v$.styleSelected.$error }"
              @change="v$.styleSelected.$touch"
              @blur="v$.styleSelected.$touch"
            >
              <option disabled value="">Select an option</option>
              <option v-for="o in options.driveStyles" :key="o" :value="o">
                {{ o }}
              </option>
            </select>
            <p
              v-for="msg in errorsFor(v$.styleSelected)"
              :key="msg"
              class="mt-1 text-xs text-error"
            >
              {{ msg }}
            </p>
          </div>

          <div>
            <label
              for="make"
              class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
              >Make<span aria-hidden="true" class="text-error">*</span></label
            >
            <input
              id="make"
              v-model="state.make"
              type="text"
              placeholder="Ford"
              :aria-invalid="v$.make.$error"
              aria-required="true"
              class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
              :class="{ 'daisy-input-error': v$.make.$error }"
              @blur="v$.make.$touch"
            />
            <p
              v-for="msg in errorsFor(v$.make)"
              :key="msg"
              class="mt-1 text-xs text-error"
            >
              {{ msg }}
            </p>
          </div>

          <div>
            <label
              for="model"
              class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
              >Model<span aria-hidden="true" class="text-error">*</span></label
            >
            <input
              id="model"
              v-model="state.model"
              type="text"
              placeholder="Mustang GT"
              :aria-invalid="v$.model.$error"
              aria-required="true"
              class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
              :class="{ 'daisy-input-error': v$.model.$error }"
              @blur="v$.model.$touch"
            />
            <p
              v-for="msg in errorsFor(v$.model)"
              :key="msg"
              class="mt-1 text-xs text-error"
            >
              {{ msg }}
            </p>
          </div>

          <div>
            <label
              for="year"
              class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
              >Year<span aria-hidden="true" class="text-error">*</span></label
            >
            <input
              id="year"
              v-model="state.year"
              type="text"
              inputmode="numeric"
              maxlength="4"
              :placeholder="String(maxYear - 5)"
              :aria-invalid="v$.year.$error"
              aria-required="true"
              class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
              :class="{ 'daisy-input-error': v$.year.$error }"
              @blur="v$.year.$touch"
            />
            <p
              v-for="msg in errorsFor(v$.year)"
              :key="msg"
              class="mt-1 text-xs text-error"
            >
              {{ msg }}
            </p>
          </div>

          <div>
            <label
              for="engine"
              class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
              >Engine<span aria-hidden="true" class="text-error">*</span></label
            >
            <input
              id="engine"
              v-model="state.engine"
              type="text"
              placeholder="5.0 V8"
              :aria-invalid="v$.engine.$error"
              aria-required="true"
              class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
              :class="{ 'daisy-input-error': v$.engine.$error }"
              @blur="v$.engine.$touch"
            />
            <p
              v-for="msg in errorsFor(v$.engine)"
              :key="msg"
              class="mt-1 text-xs text-error"
            >
              {{ msg }}
            </p>
          </div>

          <div class="sm:col-span-2">
            <label
              for="vin"
              class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
              >VIN</label
            >
            <input
              id="vin"
              v-model="state.vin"
              type="text"
              maxlength="17"
              :aria-invalid="v$.vin.$error"
              class="w-full px-3 text-sm border rounded-lg daisy-input daisy-input-bordered daisy-input-sm border-base-300 bg-base-100"
              :class="{ 'daisy-input-error': v$.vin.$error }"
              @blur="v$.vin.$touch"
            />
            <p class="mt-1 text-xs text-base-content/50">
              Optional &mdash; 17 characters, helps us match the exact part
            </p>
            <p
              v-for="msg in errorsFor(v$.vin)"
              :key="msg"
              class="mt-1 text-xs text-error"
            >
              {{ msg }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <label
          for="message"
          class="block mb-1 text-xs font-semibold tracking-wide uppercase text-base-content/70"
          >Message<span aria-hidden="true" class="text-error">*</span></label
        >
        <textarea
          id="message"
          v-model="state.text"
          rows="3"
          :maxlength="MESSAGE_MAX_LENGTH"
          :aria-invalid="v$.text.$error"
          aria-required="true"
          class="w-full px-3 py-2 text-sm border rounded-lg daisy-textarea daisy-textarea-bordered daisy-textarea-sm border-base-300 bg-base-100"
          :class="{ 'daisy-textarea-error': v$.text.$error }"
          @blur="v$.text.$touch"
        ></textarea>
        <div class="flex items-center justify-between mt-1">
          <p
            v-for="msg in errorsFor(v$.text)"
            :key="msg"
            class="text-xs text-error"
          >
            {{ msg }}
          </p>
          <span class="ml-auto text-xs text-base-content/50"
            >{{ state.text.length }}/{{ MESSAGE_MAX_LENGTH }}</span
          >
        </div>
      </div>

      <label class="flex items-start gap-2 mt-6 cursor-pointer w-fit">
        <input
          id="privacy"
          type="checkbox"
          v-model="state.privacy"
          :aria-invalid="v$.privacy.$error"
          aria-required="true"
          class="daisy-checkbox daisy-checkbox-error daisy-checkbox-sm mt-0.5 h-4 w-4 rounded border border-base-300"
          @change="v$.privacy.$touch"
          @blur="v$.privacy.$touch"
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
        v-for="msg in errorsFor(v$.privacy)"
        :key="msg"
        class="mt-1 text-xs text-error"
      >
        {{ msg }}
      </p>

      <div class="mt-5 text-center">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full gap-2 text-sm text-white uppercase rounded-lg daisy-btn daisy-btn-primary bg-mustangRed hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
        >
          <span
            v-if="isSubmitting"
            class="daisy-loading daisy-loading-spinner daisy-loading-xs"
          />
          <Icon v-else name="material-symbols:send-rounded" size="16px" />
          {{ isSubmitting ? "Sending" : "Submit" }}
        </button>
      </div>
    </form>
    <UiGeneralEnquiryModal :info="modalInfo.info" :title="modalInfo.title" />
  </section>
</template>

<script setup>
import { countriesObjectEU, countriesObjectUK } from "../../vars/index";
import { emailValidators } from "../../utils/validators";
import {
  required,
  helpers,
  sameAs,
  requiredIf,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useReCaptcha } from "vue-recaptcha-v3";

const store = useStore();
const host = store.getHost();

const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 2000;
const NAME_MAX_LENGTH = 50;
const maxYear = new Date().getFullYear() + 1;

// Fields that only apply to one enquiry type - cleared when the type changes.
const CONDITIONAL_FIELDS = [
  "styleSelected",
  "make",
  "model",
  "year",
  "engine",
  "vin",
  "part",
];

// Maps each field to its input id, used to focus the first invalid field on submit.
const FIELDS = {
  firstname: "firstName",
  lastname: "lastName",
  email: "email",
  confirmEmail: "confirmEmail",
  country: "country",
  type: "type",
  styleSelected: "drive",
  make: "make",
  model: "model",
  year: "year",
  engine: "engine",
  vin: "vin",
  part: "partNumber",
  text: "message",
  privacy: "privacy",
};

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

const initialState = () => ({
  firstname: "",
  lastname: "",
  email: "",
  confirmEmail: "",
  type: "",
  country: "",
  text: "",
  styleSelected: "",
  make: "",
  model: "",
  year: "",
  engine: "",
  vin: "",
  part: "",
  privacy: false,
});

const state = reactive(initialState());

const modalInfo = reactive({
  info: "",
  title: "",
});

const executeRecaptcha = ref(null);
const isSubmitting = ref(false);

const isVehicleEnquiry = computed(() => state.type === options.options[0]);
const isPartNumberEnquiry = computed(() => state.type === options.options[1]);

const rules = computed(() => {
  return {
    firstname: {
      required: helpers.withMessage("Please enter your first name", required),
      maxLength: helpers.withMessage(
        `First name must be ${NAME_MAX_LENGTH} characters or fewer`,
        maxLength(NAME_MAX_LENGTH),
      ),
    },
    lastname: {
      required: helpers.withMessage("Please enter your last name", required),
      maxLength: helpers.withMessage(
        `Last name must be ${NAME_MAX_LENGTH} characters or fewer`,
        maxLength(NAME_MAX_LENGTH),
      ),
    },
    email: emailValidators("Please enter your email address"),
    confirmEmail: {
      required: helpers.withMessage(
        "Please repeat your email address",
        required,
      ),
      sameAsEmail: helpers.withMessage(
        "Email addresses do not match",
        sameAs(state.email),
      ),
    },
    type: {
      required: helpers.withMessage(
        "Please select the type of your enquiry",
        required,
      ),
    },
    styleSelected: {
      requiredIf: helpers.withMessage(
        "Please select how the car is driven",
        requiredIf(isVehicleEnquiry),
      ),
    },
    make: {
      requiredIf: helpers.withMessage(
        "Please enter the vehicle make",
        requiredIf(isVehicleEnquiry),
      ),
      maxLength: helpers.withMessage(
        `Make must be ${NAME_MAX_LENGTH} characters or fewer`,
        maxLength(NAME_MAX_LENGTH),
      ),
    },
    model: {
      requiredIf: helpers.withMessage(
        "Please enter the vehicle model",
        requiredIf(isVehicleEnquiry),
      ),
      maxLength: helpers.withMessage(
        `Model must be ${NAME_MAX_LENGTH} characters or fewer`,
        maxLength(NAME_MAX_LENGTH),
      ),
    },
    year: {
      requiredIf: helpers.withMessage(
        "Please enter the vehicle year",
        requiredIf(isVehicleEnquiry),
      ),
      validYear: helpers.withMessage(
        `Please enter a 4-digit year between 1900 and ${maxYear}`,
        (value) => {
          if (!helpers.req(value)) return true;
          const year = String(value).trim();
          return /^\d{4}$/.test(year) && +year >= 1900 && +year <= maxYear;
        },
      ),
    },
    engine: {
      requiredIf: helpers.withMessage(
        "Please enter the engine, for example 5.0 V8",
        requiredIf(isVehicleEnquiry),
      ),
      maxLength: helpers.withMessage(
        `Engine must be ${NAME_MAX_LENGTH} characters or fewer`,
        maxLength(NAME_MAX_LENGTH),
      ),
    },
    vin: {
      validVin: helpers.withMessage(
        "A VIN is 17 characters long and cannot contain I, O or Q",
        (value) =>
          !helpers.req(value) ||
          /^[A-HJ-NPR-Z0-9]{17}$/i.test(String(value).trim()),
      ),
    },
    part: {
      requiredIf: helpers.withMessage(
        "Please enter the part number",
        requiredIf(isPartNumberEnquiry),
      ),
      minLength: helpers.withMessage(
        "Part number must be at least 2 characters",
        minLength(2),
      ),
      maxLength: helpers.withMessage(
        `Part number must be ${NAME_MAX_LENGTH} characters or fewer`,
        maxLength(NAME_MAX_LENGTH),
      ),
    },
    country: {
      required: helpers.withMessage("Please select your country", required),
    },
    text: {
      required: helpers.withMessage("Please enter your message", required),
      minLength: helpers.withMessage(
        `Please give us a little more detail (at least ${MESSAGE_MIN_LENGTH} characters)`,
        minLength(MESSAGE_MIN_LENGTH),
      ),
    },
    privacy: {
      sameAs: helpers.withMessage(
        "Please accept the Privacy Policy to continue",
        sameAs(true),
      ),
    },
  };
});

const v$ = useVuelidate(rules, state);

// One message per field keeps the form readable when several rules fail at once.
const errorsFor = (field) =>
  field.$errors.length ? [field.$errors[0].$message] : [];

const focusFirstInvalidField = () => {
  const firstError = v$.value.$errors[0];
  if (!firstError) return;
  const el = document.getElementById(FIELDS[firstError.$property]);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus({ preventScroll: true });
};

const showModal = (title, info) => {
  modalInfo.title = title;
  modalInfo.info = info;
  document.getElementById("generalEnquiryModal")?.showModal();
};

const resetForm = () => {
  Object.assign(state, initialState());
  v$.value.$reset();
};

const submitForm = async () => {
  if (isSubmitting.value) return;

  if (!(await v$.value.$validate())) {
    await nextTick();
    focusFirstInvalidField();
    return;
  }

  isSubmitting.value = true;
  try {
    if (!executeRecaptcha.value) {
      showModal(
        "Verification unavailable",
        "We could not run the spam check. Please refresh the page and try again.",
      );
      return;
    }

    const token = await executeRecaptcha.value("submitContactForm");
    const res = await $fetch(`/api/verify-recaptcha/${token}`);
    if (!res?.success || res.score <= 0.5) {
      showModal(
        "We could not verify your request",
        "The spam check did not pass. Please refresh the page and try again.",
      );
      return;
    }

    const country = countriesArray.find((el) => el.name === state.country);
    const status = await useSubmitContactForm(
      { ...state, country: country?.value ?? state.country },
      "GENERAL",
    );

    if (status === 200) {
      showModal(
        "Contact Form Submitted",
        "Thank you. We endeavour to respond within 48 hours.",
      );
      resetForm();
    } else {
      showModal(
        "We could not send your enquiry",
        "Something went wrong on our side. Please try again in a few minutes.",
      );
    }
  } catch {
    showModal(
      "We could not send your enquiry",
      "Please check your connection and try again.",
    );
  } finally {
    isSubmitting.value = false;
  }
};

// Values left behind by a previous enquiry type must not be validated or sent.
watch(
  () => state.type,
  () => {
    CONDITIONAL_FIELDS.forEach((field) => {
      state[field] = "";
      v$.value[field].$reset();
    });
  },
);

onMounted(async () => {
  const { recaptchaLoaded, executeRecaptcha: execute } = useReCaptcha();
  executeRecaptcha.value = execute;
  await recaptchaLoaded();
});
</script>
