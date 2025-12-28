<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <Header class="relative z-2 max-w-[1140px] px-[15px] pt-3" />
    </header>
    <LazyCookieConsent
      v-if="showCookieModal"
      @cookie-consent-response="handleInitialConsentResponse"
    />
    <div v-if="hasError" class="px-4 py-3 mx-auto my-6 max-w-7xl">
      <div
        class="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50"
      >
        <div class="flex items-center space-x-3">
          <svg
            class="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <p class="text-sm font-medium text-red-800">
              Unable to load application data
            </p>
            <p class="text-xs text-red-600">
              Please check your connection and try again
            </p>
          </div>
        </div>
        <button
          @click="retryLoadProductYears"
          class="px-3 py-1 text-sm font-medium text-red-700 bg-white border border-red-300 rounded hover:bg-red-50"
        >
          Try Again
        </button>
      </div>
    </div>
    <main class="flex-grow">
      <div class="z-11 mx-auto max-w-[1140px] px-[15px]">
        <slot />
      </div>
    </main>
    <footer class="mt-auto">
      <LazyFooter />
      <CookiesManager @save-preferences="handleCookiePreferences" />
    </footer>
  </div>
</template>

<script setup lang="ts">
type CookieAnswerType = "manage" | "agree";

const { $loadHjScript } = useNuxtApp();
const store = useStore();
const { country } = useCountry();

const showCookieModal = ref(false);
const hasError = ref(false);
const mustangCookieConsents = useCookie("mustang-cookie-consents", {
  default: () => ({ accepted: false, preferences: ["mandatory"] }),
  watch: true,
  maxAge: 60 * 60 * 24 * 7,
});
const events = ["mousemove", "touchstart", "touchmove", "click"];

const handleInitialConsentResponse = (answer: CookieAnswerType) => {
  if (answer === "manage") {
    const cookieDialog = document.getElementById("cookie") as HTMLDialogElement;
    cookieDialog?.showModal();
  } else {
    acceptAll();
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

const saveCookiePreferences = (accepted: boolean, preferences: string[]) => {
  mustangCookieConsents.value = { accepted, preferences };

  const hasAnalytics = preferences.includes("Analytics");
  const hasAdvertisement = preferences.includes("Advertisement");

  if (hasAnalytics) {
    $loadHjScript();
  }

  if (accepted && window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: hasAdvertisement ? "granted" : "denied",
      ad_user_data: hasAdvertisement ? "granted" : "denied",
      ad_personalization: hasAdvertisement ? "granted" : "denied",
      analytics_storage: hasAnalytics ? "granted" : "denied",
    });
  }
};

const handleCookiePreferences = (
  data: { label: string; enabled: boolean }[]
) => {
  const preferences = data
    .filter((pref) => pref.enabled)
    .map((pref) => pref.label);

  saveCookiePreferences(true, preferences);
};

const removeEventListeners = () => {
  events.forEach((event) =>
    window.removeEventListener(event, onEventTriggered)
  );
};

const cookieHandler = async () => {
  if (!mustangCookieConsents.value.accepted) {
    showCookieModal.value = true;
  } else {
    const { accepted, preferences } = mustangCookieConsents.value;
    saveCookiePreferences(accepted, preferences);
  }
};

const loadProductYears = async () => {
  const years = store.getProductYears();
  hasError.value = false;

  if (!years.length) {
    const { data, error, status } = await useGetApplications({
      show: false,
      country: country.value,
    });

    if (error) {
      hasError.value = true;
      return;
    }

    if (data && data.options) {
      store.setProductYears(data.options.peryear);
      hasError.value = false;
    }
  }
};

const retryLoadProductYears = async () => {
  hasError.value = false;
  await loadProductYears();
};

const checkUserRegion = async () => {
  if (!store.userRegionData) {
    const data = await getUserRegion();
    store.setUserRegionData(data);
  }
};

const onEventTriggered = async () => {
  removeEventListeners();
  await loadProductYears();
  await cookieHandler();
  await checkUserRegion();
};

watch(
  () => mustangCookieConsents.value,
  () => {
    showCookieModal.value = false;
  }
);

onMounted(async () => {
  events.forEach((event) => window.addEventListener(event, onEventTriggered));
});
</script>
