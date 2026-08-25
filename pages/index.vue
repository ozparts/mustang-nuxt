<template>
  <div>
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div
        class="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"
      ></div>
      <span class="ml-3 text-gray-600">Loading application data...</span>
    </div>

    <template v-else>
      <HomeMainBanner />

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
                Unable to load product data
              </p>
              <p class="text-xs text-red-600">
                Please check your connection and try again
              </p>
            </div>
          </div>
          <button
            @click="retryLoad"
            class="px-3 py-1 text-sm font-medium text-red-700 bg-white border border-red-300 rounded hover:bg-red-50"
          >
            Try Again
          </button>
        </div>
      </div>

      <HomeSectionVariantsDesktop
        :variantsWithHorsepower="state.variantsWithHorsepower"
      />
      <HomeSectionBrands />
      <HomeSectionCatalogue :variants="state.variants" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { GetApplicationsOptions } from "~/types/api";
import type { Variant } from "~/utils/utils";
import { Models } from "~/vars/index";

interface HomeState {
  variantsWithHorsepower: Variant[];
  categories: string[];
  variants: string[];
  years: string[];
  loaded: boolean;
}

const store = useStore();
const { country } = useCountry();

const state = useState<HomeState>("home-state", () => ({
  variantsWithHorsepower: [],
  categories: [],
  variants: [],
  years: [],
  loaded: false,
}));

const pending = ref(false);
const hasError = ref(false);

const APPLICATIONS_STORAGE_KEY = "home-applications-options";

const loadCachedApplications = (): GetApplicationsOptions | null => {
  const cached = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
  if (!cached) return null;

  try {
    return JSON.parse(cached) as GetApplicationsOptions;
  } catch (e) {
    return null;
  }
};

const cacheApplications = (options: GetApplicationsOptions) => {
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(options));
};

const updateState = (options: GetApplicationsOptions) => {
  state.value.categories = options.categorymaster ?? [];
  state.value.variants = options.variant ?? [];
  state.value.years = options.peryear ?? [];
  state.value.variantsWithHorsepower = parseVariantsAndHorsepower(
    options.variant ?? [],
  );
  state.value.loaded = true;
};

const mergeApplicationOptions = (
  optionsList: GetApplicationsOptions[],
): GetApplicationsOptions => {
  const merged = {} as GetApplicationsOptions;
  const keys = Object.keys(optionsList[0]) as (keyof GetApplicationsOptions)[];

  keys.forEach((key) => {
    merged[key] = [
      ...new Set(optionsList.flatMap((options) => options[key] ?? [])),
    ];
  });

  return merged;
};

const getApplications = async () => {
  if (!state.value.loaded) {
    pending.value = true;
  }
  hasError.value = false;

  try {
    const responses = await Promise.all(
      Models.map((model) =>
        useGetApplications({
          show: false,
          country: country.value,
          model,
        }),
      ),
    );

    if (responses.some((response) => response.error)) {
      hasError.value = true;
      return;
    }

    const mergedOptions = mergeApplicationOptions(
      responses.map((response) => response.data!.options),
    );
    updateState(mergedOptions);
    store.setProductYears(mergedOptions.peryear.sort());
    cacheApplications(mergedOptions);
    hasError.value = false;
  } catch (e) {
    console.error("Unexpected error in getApplications:", e);
    hasError.value = true;
  } finally {
    pending.value = false;
  }
};

const retryLoad = async () => {
  hasError.value = false;
  await getApplications();
};

onMounted(async () => {
  if (state.value.loaded) return;

  const cached = loadCachedApplications();
  if (cached) {
    updateState(cached);
    store.setProductYears(cached.peryear.sort());
    return;
  }

  await getApplications();
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
