<template>
  <div class="flex items-center justify-center">
    <button
      @click="toggleForm"
      class="flex items-center p-2 font-bold uppercase cursor-pointer btn-blue"
    >
      <p class="mx-2 text-sm sm:text-base">Send an enquiry</p>
    </button>
  </div>
  <div
    class="fixed inset-0 z-10 flex items-center justify-center bg-black/90"
    v-if="state.formVisible"
  >
    <div
      class="w-[90%] rounded bg-white p-6 text-center shadow-md sm:w-[450px]"
    >
      <form @submit.prevent="sendEnquiry">
        <h2 class="py-1 my-2 text-xl sm:text-2xl">Send an enquiry</h2>
        <p class="py-1 my-2 font-light sm:text-lg">
          Hello, I'm interested in
          <span class="text-base font-bold">{{ props.product }}</span
          >. Could you please let me know when it will be available in your
          offer again?
        </p>

        <input
          type="email"
          class="w-full p-2 my-4 border rounded"
          v-model="state.email"
          required
          placeholder="Your emial"
        />
        <p
          v-if="state.emailError"
          class="mb-2 -mt-2 text-sm text-left text-red-600"
        >
          {{ state.emailError }}
        </p>
        <div class="flex justify-between">
          <button
            type="submit"
            class="text-white daisy-btn w-[80px] md:w-[90px] text-sm sm:text-base bg-mustangBlue hover:bg-[#0052a5]/90"
          >
            SEND
          </button>
          <button
            @click="toggleForm"
            class="text-white daisy-btn w-[80px] md:w-[90px] text-sm sm:text-base bg-mustangBlue hover:bg-[#0052a5]/90"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
const state = reactive({
  enquiry: false,
  formVisible: false,
  email: "",
  emailError: "",
});

const validateEmail = (value) => {
  if (!value) return "Email is required";
  if (/\.{2,}/.test(value)) return "Email must not contain consecutive dots";
  if (!/.+@.+/.test(value)) return "Invalid email address";
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value))
    return "Invalid email address";
  if (value.length > 254) return "Email is too long";
  const [local, domain = ""] = value.split("@");
  if (local.length > 64) return "Email is too long";
  if (/^\./.test(local) || /\.$/.test(local)) return "Invalid email address";
  if (/(?:^|\.)-|-(?:\.|$)/.test(domain)) return "Invalid email address";
  return "";
};

const sendEnquiry = async () => {
  state.emailError = validateEmail(state.email);
  if (state.emailError) return;

  state.formVisible = !state.formVisible;
  try {
    await useSubmitEnquiry(state.email, props.product);
  } catch (e) {
    console.log(e);
  }
};

const toggleForm = () => {
  state.formVisible = !state.formVisible;
  if (state.formVisible) {
    document.body.classList.add("overflow-hidden");
    document.body.style.height = "100vh";
  } else {
    document.body.classList.remove("overflow-hidden");
    document.body.style.height = "auto";
  }
};
</script>
