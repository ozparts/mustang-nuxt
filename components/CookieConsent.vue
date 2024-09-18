<template>
  <div
    class="z-[1000] w-full h-full fixed bg-[rgba(0,0,0,0.407)] inset-y-0 font-nunito"
  >
    <div class="bg-[white] absolute w-full bottom-0 sm:p-4 md:p-6">
      <v-container>
        <div class="flex flex-col items-center md:flex-row">
          <p class="text-sm sm:text-base">
            This site uses cookies and similar technologies to help us to make
            this site work properly and to provide you with a better browsing
            experience. Find out more about how we use cookies and how you can
            change your preferences by reading our
            <NuxtLink class="text-red-600" to="/privacy-policy" target="_blank"
              >Privacy and Cookie Policy</NuxtLink
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
  <CookiesManager @save-preferences="handleCookiePreferences" />
</template>

<script setup>
const mustangCookieConsents = useCookie("mustang-cookie-consents");

const saveCookiePreferences = (accepted, preferences) => {
  mustangCookieConsents.value = { accepted, preferences };

  if (accepted) {
    window.consentGrantedAdStorage();
  }
};

const acceptAll = () => {
  saveCookiePreferences(true, [
    "Mandatory",
    "Functional",
    "Analytics",
    "Advertisement",
  ]);
};

const handleCookiePreferences = (data) => {
  const preferences = data
    .filter((pref) => pref.enabled)
    .map((pref) => pref.label);

  saveCookiePreferences(true, preferences);
};

const openCookieSettings = () => {
  cookie.showModal();
};
</script>
