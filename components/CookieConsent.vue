<template>
  <div
    class="z-[1000] w-full h-full fixed bg-[rgba(0,0,0,0.407)] inset-y-0 font-nunito"
  >
    <div class="bg-[white] absolute w-full bottom-0 sm:p-4 md:p-6">
      <v-container>
        <div class="flex flex-col items-center md:flex-row">
          <p class="p-3 text-sm xs:text-base">
            This site uses cookies and similar technologies to ensure the proper
            functioning of our website, to analyze traffic, and to personalize
            ads. With your consent, we and our partners (including Google) may
            use cookies and mobile advertising identifiers to measure
            advertising performance and to provide personalized and
            non-personalized advertising. Find out more about how we use cookies
            and how you can change your preferences by reading our
            <nuxt-link class="text-red-600" to="/privacy-policy" target="_blank"
              >Cookie Policy</nuxt-link
            >
            and
            <a
              class="text-red-600"
              href="https://business.safety.google/privacy/"
              target="_blank"
              >Google’s Business Data Responsibility Site.</a
            >.
          </p>
          <div
            class="mx-2 mt-2 w-full md:w-[200px] text-center text-[white] m-[5px] p-2.5 hover:cursor-pointer bg-red-600 md:ml-8"
            @click="acceptAll()"
          >
            Agree
          </div>
          <div
            class="mx-2 mt-2 w-full text-center md:w-[200px] text-[white] m-[5px] p-2.5 hover:cursor-pointer bg-gray-500"
            @click="openCookieSettings()"
          >
            Manage
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["cookie-consent-response"]);

const acceptAll = () => {
  emit("cookie-consent-response", "agree");
};

const openCookieSettings = () => {
  emit("cookie-consent-response", "manage");
};
</script>
