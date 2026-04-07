<template>
  <Head>
    <Title> Catalogue | {{ metaTitle }} | Mustang Performance </Title>
    <Meta name="description" :content="metaDescription" />
  </Head>
  <section class="container mx-auto">
    <Banner title="catalogue" />

    <Loader v-if="isLoading" />
    <div
      v-else-if="hasError"
      class="w-full py-12 mt-5 text-center border border-red-200 rounded-lg bg-red-50 font-nunito"
    >
      <div class="max-w-md mx-auto">
        <p class="text-base text-red-600">
          Unable to load catalogue data. Please try again later.
        </p>
      </div>
    </div>
    <div v-else>
      <div class="mt-5 mb-5 sm:!mb-10">
        <h2
          class="bg-mustangLightGrey my-2 w-full py-2 text-center font-nunito font-bold sm:!my-4 sm:!py-4 sm:text-xl"
        >
          Selected variant: {{ paramVariant }}
        </h2>
        <div class="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="variant in availableVariants" :id="variant">
            <v-btn
              :id="variant"
              rounded="xl"
              size="large"
              block
              :color="`rgba(220, 225, 222, 0.4)`"
              @click="handleVariantSelection"
              class="font-semibold font-nunito"
              prepend-icon="mdi-check-circle"
            >
              <template v-slot:prepend>
                <v-icon
                  color="success"
                  v-if="selectedVariant === variant"
                ></v-icon>
              </template>

              {{ variant.split(" |").slice(1).join(",") }}
            </v-btn>
          </div>
        </div>
      </div>
      <Loader v-if="isLoadingProducts" />
      <p id="start"></p>
      <ProductList v-if="products.length > 0" :products="uniqueProducts" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { country } = useCountry();
const route = useRoute();
const routeParams = route.params;
const routeQuery = route.query;

const isLoadingProducts = ref(false);
const selectedVariant = ref("");
const paramVariant = ref("");
const availableVariants = ref<string[]>([]);

const products = ref([]);
const hasError = ref(false);
const isLoading = ref(true);

const metaTitle = computed(() => {
  const queryVariant = routeQuery.variant as string;
  if (queryVariant) {
    return queryVariant.split(" | ").join(", ");
  }
  return `Variant: ${paramVariant.value}`;
});

const metaDescription = computed(() => {
  if (routeQuery.variant) {
    return `Upgrade your Ford Mustang ${routeQuery.variant} with top-grade car parts. Find high-quality disc brakes, engine bearings, and more from leading brands like DBA, ACL or Pedders`;
  } else {
    return `Empower your Ford Mustang version ${paramVariant.value} with our high-quality car parts. Impeccable disc brakes, durable clutches & more from trusted brands like ACS, Pedders or Xforce`;
  }
});

const uniqueProducts = computed(() => {
  if (!products.value.length) return [];

  const seenIds = new Set();
  return products.value.filter((product: any) => {
    const isDuplicate = seenIds.has(product.item.id);
    seenIds.add(product.item.id);
    return !isDuplicate;
  });
});

const handleVariantSelection = async (event: Event) => {
  const selectedButton = event.target as HTMLElement;
  const variantId = selectedButton.id;

  await loadProductsForVariant(variantId);

  scrollToProductList();
  updateUrlWithSelectedVariant(variantId);
};

const loadProductsForVariant = async (variantId: string) => {
  products.value = [];
  isLoadingProducts.value = true;
  selectedVariant.value = variantId;

  const { results } = await useGetEngines(true, variantId);
  products.value = results;
  isLoadingProducts.value = false;
};

const scrollToProductList = () => {
  document.getElementById("start")?.scrollIntoView({
    behavior: "smooth",
  });
};

const updateUrlWithSelectedVariant = (variantId: string) => {
  navigateTo(`/catalogue/${paramVariant.value}/?variant=${variantId}`);
};

onMounted(async () => {
  try {
    const { data, error, status } = await useGetApplications({
      show: false,
      country: country.value,
    });

    if (error || !data) {
      hasError.value = true;
      return;
    }

    paramVariant.value = routeParams.variant as string;

    availableVariants.value = getAllSpecificVariants(
      data.options.variant,
      paramVariant.value
    ).sort();

    if (routeQuery.variant) {
      products.value = [];
      const { results } = await useGetEngines(
        true,
        routeQuery.variant as string
      );
      products.value = results;
      selectedVariant.value = routeQuery.variant as string;
    }
  } catch {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
:deep(.v-select__selection-text) {
  font-size: 14px;
}

:deep(.v-btn__prepend) {
  pointer-events: none;
}
:deep(.v-btn__content) {
  pointer-events: none;
}
</style>
