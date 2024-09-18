<template>
  <dialog persistent class="z-40 daisy-modal" id="cookie">
    <div class="daisy-modal-box font-[Nunito] p-0">
      <div class="px-5 py-3 bg-red-600">
        <p class="text-lg text-white">Cookie Settings</p>
      </div>
      <div class="p-5">
        <p class="mb-4 text-lg font-bold">Your privacy</p>
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
        <div class="buttons mt-7">
          <button
            class="mb-4 text-base text-white bg-red-500 daisy-btn daisy-btn-block hover:bg-red-700"
            @click="acceptAll"
          >
            ACCEPT ALL
          </button>
          <button
            class="text-base text-white bg-gray-500 daisy-btn daisy-btn-block hover:bg-gray-700"
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
const emit = defineEmits(["save-preferences"]);

const cookiePreferences = ref([
  { label: "Mandatory", enabled: true, mandatory: true },
  { label: "Functional", enabled: false, mandatory: false },
  { label: "Analytics", enabled: false, mandatory: false },
  { label: "Advertisement", enabled: false, mandatory: false },
]);

const acceptAll = () => {
  cookiePreferences.value = cookiePreferences.value.map((pref) => ({
    ...pref,
    enabled: true,
  }));
  emitPreferences();
};

const saveAndClose = () => {
  emitPreferences();
};

const emitPreferences = () => {
  const currentPreferences = cookiePreferences.value.map((pref) => ({
    label: pref.label,
    enabled: pref.enabled,
  }));
  emit("save-preferences", currentPreferences);
  cookie.close();
};
</script>
