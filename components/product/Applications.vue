<template>
  <Loader v-if="isLoading" />
  <div
    v-else-if="applications.length > 0"
    class="h-full px-2 py-5 overflow-x-auto"
  >
    <table class="daisy-table font-nunito">
      <thead class="text-xs text-black sm:text-sm">
        <tr>
          <th class="hidden sm:inline-block">Make</th>
          <th class="hidden xl:inline-block">Model</th>
          <th class="p-2 sm:px-4 sm:py-3">Variant</th>
          <th class="hidden sm:inline-block">Category</th>
          <th class="p-2 sm:px-4 sm:py-3">Bodytype</th>
          <th class="p-2 sm:px-4 sm:py-3">Year</th>
          <th class="hidden sm:inline-block">Details</th>
        </tr>
      </thead>
      <tbody class="text-xs sm:text-[13px]">
        <tr
          v-for="application in applications"
          className="daisy-hover cursor-pointer"
          @click="
            () =>
              navigateTo(
                `/catalogue/${application.variant.split(' |')[0]}/?variant=${
                  application.variant
                }`
              )
          "
        >
          <td class="hidden sm:inline-block">{{ application.make }}</td>
          <td class="hidden xl:inline-block">{{ application.model }}</td>
          <td class="p-2 sm:px-4 sm:py-3">
            {{ fixVariant(application.variant) }}
          </td>
          <td class="hidden sm:inline-block">
            {{ application.categorydescription }}
          </td>
          <td class="p-2 sm:px-4 sm:py-3">{{ application.bodytype }}</td>
          <td class="p-2 sm:px-4 sm:py-3">{{ application.year }}</td>
          <td class="hidden sm:inline-block">{{ application.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    v-else-if="hasError"
    class="w-full py-12 mt-5 text-center border border-red-200 rounded-lg bg-red-50 font-nunito"
  >
    <div class="max-w-md mx-auto">
      <p class="text-base text-red-600">
        Unable to load vehicle applications. Please try again later.
      </p>
    </div>
  </div>
  <div
    v-else
    class="w-full py-12 mt-5 text-center border border-gray-200 rounded-lg bg-gray-50 font-nunito"
  >
    <div class="max-w-md mx-auto">
      <p class="text-base text-gray-600">
        No vehicle applications specified for this product.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetApplicationsResults } from "~/types/api";

const props = defineProps<{
  id: string;
}>();

const loadedApplications = useState<
  Record<string, GetApplicationsResults[] | null>
>("loaded-applications", () => ({}));
const applications = ref<GetApplicationsResults[]>([]);
const hasError = ref(false);
const isLoading = ref(true);

const fixVariant = computed(() => (variant: string) => {
  return variant.split(" | ").slice(0, 2).join(" | ");
});

onMounted(async () => {
  if (loadedApplications.value[props.id] !== undefined) {
    applications.value = loadedApplications.value[props.id] || [];
    isLoading.value = false;
    return;
  }

  try {
    const { data, error } = await useGetApplicationsForItem({
      id: props.id,
    });

    if (error) {
      hasError.value = true;
    } else if (data) {
      applications.value = data.results || [];
      loadedApplications.value[props.id] = data.results || [];
    } else {
      applications.value = [];
      loadedApplications.value[props.id] = [];
    }
  } catch {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
