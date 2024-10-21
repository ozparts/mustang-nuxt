<template>
  <Head>
    <Title> Catalogue | {{ metaTitle }} | Mustang Performance </Title>
    <Meta name="description" :content="metaDescription" />
  </Head>
  <section class="container mx-auto">
    <Banner title="catalogue" />

    <div class="mt-5 mb-5 sm:!mb-10">
      <h2
        class="bg-mustangLightGrey my-2 w-full py-2 text-center font-nunito font-bold sm:!my-4 sm:!py-4 sm:text-xl"
      >
        Selected variant: {{ state.selectedVariantFromParam }}
      </h2>
      <div class="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 md:grid-cols-3">
        <div v-for="variant in state.fullListOfVariants" :id="variant">
          <v-btn
            :id="variant"
            rounded="xl"
            size="large"
            block
            :color="`rgba(220, 225, 222, 0.4)`"
            @click="select"
            class="font-semibold font-nunito"
            prepend-icon="mdi-check-circle"
          >
            <template v-slot:prepend>
              <v-icon
                color="success"
                v-if="state.selectedVariant === variant"
              ></v-icon>
            </template>

            {{ variant.split(" |").slice(1).join(",") }}
          </v-btn>
        </div>
      </div>
    </div>
    <Loader v-if="state.loader" />
    <p id="start"></p>
    <ProductList v-if="state.productList.length > 0" :products="filter" />
  </section>
</template>

<script setup>
const state = reactive({
  selectedVariantFromParam: "",
  fullListOfVariants: [],
  selectedVariant: "",
  availableEnginesForSelectedVariant: [],
  productList: [],
  filteredList: [],
  loader: false,
});

const select = async (e) => {
  state.productList = [];
  state.loader = true;
  state.selectedVariant = e.target.id;
  const { results } = await useGetEngines(true, state.selectedVariant);
  state.productList = results;
  state.loader = false;

  document.getElementById("start").scrollIntoView({
    behavior: "smooth",
  });
  navigateTo(
    `/catalogue/${state.selectedVariantFromParam}/?variant=${e.target.id}`
  );
};

onMounted(async () => {
  const { options } = await useGetApplications(false);
  state.selectedVariantFromParam = useRoute().params.variant;
  state.fullListOfVariants = getAllSpecificVariants(
    options.variant,
    state.selectedVariantFromParam
  ).sort();

  if (useRoute().query.variant) {
    state.loader = true;
    state.productList = [];
    const { results } = await useGetEngines(true, useRoute().query.variant);
    state.productList = results;
    state.selectedVariant = useRoute().query.variant;
    state.loader = false;
  }
});

const metaTitle = computed(() => {
  if (useRoute().query.variant) {
    return useRoute().query.variant.split(" | ").join(", ");
  } else {
    return `Variant: ${state.selectedVariantFromParam}`;
  }
});

const metaDescription = computed(() => {
  const variant = useRoute().query.variant;
  if (variant) {
    return `Upgrade your Ford Mustang ${variant} with top-grade car parts. Find high-quality disc brakes, engine bearings, and more from leading brands like DBA, ACL or Pedders`;
  } else {
    return `Empower your Ford Mustang version ${state.selectedVariantFromParam} with our high-quality car parts. Impeccable disc brakes, durable clutches & more from trusted brands like ACS, Pedders or Xforce`;
  }
});

const filter = computed(() => {
  if (!state.productList.length) return [];

  const uniqueMap = new Map();

  return state.productList.filter((obj) => {
    const id = obj.item.id;
    if (!uniqueMap.has(id)) {
      uniqueMap.set(id, true);
      return true;
    }
    return false;
  });
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
