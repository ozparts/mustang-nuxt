<template>
  <dialog persistent class="z-40 daisy-modal" id="cookie">
    <div class="daisy-modal-box font-[Nunito] p-0">
      <div class="px-5 py-3 bg-red-600">
        <p class="text-base text-white sm:text-lg">Cookie Settings</p>
      </div>
      <div class="p-5 text-sm sm:text-lg">
        <p class="mb-4 text-base font-bold sm:text-lg">Your privacy</p>
        <p class="mb-4">
          Below you can adjust the cookie settings for both our and our
          partners' cookies. We need your consent to use analytical and
          marketing cookies.
        </p>
        <p class="mb-4">
          If you want to accept all cookies, click 'Accept all'. If you prefer
          that we only use necessary cookies, select 'Save settings and close'.
          To change your cookie preferences, move the slider next to the
          appropriate category. You have the right to view and modify your
          settings at any time.
        </p>
        <p class="mb-4">
          Using cookies involves processing your personal data related to
          activity on the website. Detailed information about how we and our
          partners use cookies and process your data, as well as information
          about your rights, can be found in our
          <nuxt-link
            to="/cookie-policy"
            target="_blank"
            class="text-red-600 underline"
          >
            Cookie Policy.
          </nuxt-link>
        </p>
        <p class="mb-4">
          Information about how Google uses your data can be found in
          <a
            href="https://business.safety.google/privacy/"
            target="_blank"
            class="text-red-600 underline"
          >
            Google’s Business Data Responsibility Site.
          </a>
        </p>
        <p class="mb-4 text-lg font-bold">Manage cookies</p>
        <div class="flex flex-col">
          <div
            v-for="(preference, index) in cookiePreferences"
            :key="index"
            class="mb-4 form-control w-52"
          >
            <label
              class="flex gap-3 cursor-pointer"
              :class="{ 'pointer-events-none': preference.mandatory }"
            >
              <input
                type="checkbox"
                class="daisy-toggle daisy-toggle-error"
                :class="{
                  '[--tglbg:#fecaca]':
                    preference.mandatory || preference.enabled,
                }"
                v-model="preference.enabled"
              />
              <span class="label-text">{{ preference.label }}</span>
            </label>
          </div>
        </div>
        <div class="mt-5 buttons">
          <button
            class="mb-4 text-sm text-white bg-red-500 daisy-btn sm:text-base sm:bg-red-500 daisy-btn-sm sm:daisy-btn daisy-btn-block hover:bg-red-700"
            @click="acceptAll"
          >
            ACCEPT ALL
          </button>
          <button
            class="text-sm text-white bg-gray-500 sm:text-base daisy-btn-sm daisy-btn sm:daisy-btn sm:bg-gray-500 daisy-btn-block hover:bg-gray-700"
            @click="saveAndClose"
          >
            SAVE SETTINGS AND CLOSE
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
const mustangCookieConsents = useCookie("mustang-cookie-consents");

const emit = defineEmits(["save-preferences"]);

const cookiePreferences = reactive([
  { label: "Mandatory", enabled: true, mandatory: true },
  { label: "Functional", enabled: false, mandatory: false },
  { label: "Analytics", enabled: false, mandatory: false },
  { label: "Advertisement", enabled: false, mandatory: false },
]);

const updatePreferencesFromCookie = () => {
  if (mustangCookieConsents.value) {
    const consentData = mustangCookieConsents.value;
    updateCookiePreferences(consentData.preferences);
  }
};

const updateCookiePreferences = (data) => {
  cookiePreferences.forEach((pref) => {
    pref.enabled = pref.mandatory || data.includes(pref.label);
  });
};

const acceptAll = () => {
  cookiePreferences.forEach((pref) => {
    pref.enabled = true;
  });
  emitPreferences();
};

const saveAndClose = () => {
  emitPreferences();
};

const emitPreferences = () => {
  const currentPreferences = cookiePreferences.map((pref) => ({
    label: pref.label,
    enabled: pref.enabled,
  }));
  emit("save-preferences", currentPreferences);
  cookie.close();
};

onMounted(() => {
  updatePreferencesFromCookie();
});
</script>
