<template>
  <div class="mt-5 sm:!mt-10">
    <h3
      class="py-2 text-sm font-semibold text-center text-white uppercase rounded-lg bg-mustangRed font-nunito lg:text-base"
    >
      Related Items
    </h3>

    <div
      v-if="filterRelatedItems.length > 0"
      class="grid gap-1 mt-5 xs:grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1"
    >
      <div v-for="product in filterRelatedItems" :key="product.id">
        <NuxtLink
          :to="`/product/${product.urlcomponent}`"
          class="flex flex-col gap-1 overflow-hidden border border-gray-400 rounded-lg font-nunito"
        >
          <ProductSingleRelatedProduct :product="product" />
        </NuxtLink>
      </div>
    </div>
    <div
      v-else-if="hasError"
      class="w-full py-12 mt-5 text-center border border-red-200 rounded-lg bg-red-50 font-nunito"
    >
      <div class="max-w-md mx-auto">
        <p class="text-base text-red-600">
          Unable to load related items. Please try again later.
        </p>
      </div>
    </div>
    <div v-else class="w-full mt-5 text-center py-22 font-nunito">
      <div class="max-w-md mx-auto">
        <p class="text-base text-gray-600">No related products available.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetRelatedItemsResponse } from "~/types/api";

const route = useRoute();

const loadedRelatedItems = useState<
  Record<string, GetRelatedItemsResponse[] | null>
>("loaded-related-items", () => ({}));

const props = defineProps<{
  id: string;
}>();

const record = ref(route.params.record);
const relatedItems = ref<GetRelatedItemsResponse[]>([]);
const hasError = ref(false);

const filterRelatedItems = computed((): GetRelatedItemsResponse[] => {
  return relatedItems.value
    .filter((item) => item.urlcomponent !== record.value)
    .sort((a, b) => {
      const availableA = a.available ?? 0;
      const availableB = b.available ?? 0;
      if (availableA !== availableB) return availableB > 0 ? 1 : -1;

      const [prefixA, suffixA] = a.urlcomponent.split("-");
      const [prefixB, suffixB] = b.urlcomponent.split("-");

      if (prefixA !== prefixB) return prefixA.localeCompare(prefixB);
      if (suffixA === "STD") return -1;
      if (suffixB === "STD") return 1;
      return a.urlcomponent.localeCompare(b.urlcomponent);
    })
    .reduce((acc, item) => {
      if (!acc.some((i) => i.id === item.id)) {
        acc.push(item);
      }
      return acc;
    }, [] as GetRelatedItemsResponse[]);
});

const isValidArray = (arr: unknown): arr is GetRelatedItemsResponse[] => {
  return (
    Array.isArray(arr) &&
    arr.length > 0 &&
    typeof arr[0] === "object" &&
    arr[0] !== null &&
    Object.keys(arr[0]).length > 0
  );
};

onMounted(async () => {
  if (loadedRelatedItems.value[props.id] !== undefined) {
    relatedItems.value = loadedRelatedItems.value[props.id] || [];
    return;
  }

  try {
    const { data, error } = await useGetRelatedItems({ record: props.id });

    if (error) {
      hasError.value = true;
    } else if (isValidArray(data)) {
      relatedItems.value = data;
      loadedRelatedItems.value[props.id] = data;
    } else {
      relatedItems.value = [];
      loadedRelatedItems.value[props.id] = [];
    }
  } catch {
    hasError.value = true;
  }
});
</script>
