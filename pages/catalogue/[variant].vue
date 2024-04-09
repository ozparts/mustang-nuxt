<template>
  <section class="container mx-auto">
    <Banner title="catalogue" />

    <div class="mt-5 mb-5 lg:!mb-28">
      <h2
        class="bg-mustangLightGrey my-2 w-full py-2 text-center font-nunito font-bold sm:!my-4 sm:!py-4 sm:text-xl"
      >
        Selected variant: {{ state.selectedVariantFromParam }}
      </h2>
      <div class="grid grid-cols-3 gap-5 pt-16">
        <div v-for="variant in state.fullListOfVariants" :id="variant">
          <v-btn
            :id="variant"
            rounded="xl"
            size="large"
            block
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
      <!-- <div
        class="flex flex-col flex-wrap justify-around gap-1 my-10 sm:items-center sm:flex-row"
      >
        <div class="mb-2 font-nunito sm:basis-[40%]">
          <label class="text-xs sm:text-sm">Select a specific variant:</label>
          <v-select
            type="text"
            density="compact"
            variant="outlined"
            hideDetails="true"
            v-model="state.search.variant"
            :items="state.fullListOfVariants.sort()"
          />
        </div>
      </div> -->
    </div>
    <Loader v-if="state.loader" />
    <p id="start"></p>
    <ProductList v-if="state.productList.length > 0" :products="filter" />
  </section>
</template>

<script setup>
import { manufacturersList } from "../../vars/index";

const state = reactive({
  selectedVariantFromParam: "",
  fullListOfVariants: [],
  selectedVariant: "",
  availableEnginesForSelectedVariant: [],
  productList: [],
  filteredList: [],
  search: {
    variant: "",
    engine: "",
    brand: "",
  },
  queryString: "",
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
};
const getEngines = async (value) => {
  state.search.variant = value;
  // state.search.brand = "";
  state.productList = [];
  console.log(value);
  // if (state.search.variant !== "") {
  //   state.availableEnginesForSelectedVariant = (
  //     await useGetEngines(true, state.search.variant)
  //   ).options.engine;
  // }
  // state.availableEnginesForSelectedVariant =
  //   state.availableEnginesForSelectedVariant.map((engine) =>
  //     engine === "" ? "none" : engine
  //   );
  navigateTo(
    `/catalogue/${state.selectedVariantFromParam}/?${state.search.variant}`
  );
};

const getProducts = async (val) => {
  state.productList = [];
  console.log(state.search.brand, "1!");
  // state.search.engine = val;
  state.loader = true;
  const res = (
    await useGetProducts(
      state.search.variant,
      val
      // state.search.engine === "none" ? "" : state.search.engine
    )
  ).results;
  console.log(state.search.brand, "12");
  // state.search.brand = state.search.brand === "" ? "ALL" : state.search.brand;
  state.productList = res;
  state.loader = false;
  navigateTo(
    `/catalogue/${state.selectedVariantFromParam}/?${state.queryString}`
  );
};

onMounted(async () => {
  const { options } = await useGetApplications(false);
  state.selectedVariantFromParam = useRoute().params.variant;
  console.log(options.variant, state.selectedVariantFromParam);
  state.fullListOfVariants = getAllSpecificVariants(
    options.variant,
    state.selectedVariantFromParam
  ).sort();

  if (useRoute().query.variant && useRoute().query.brand) {
    state.loader = true;
    state.search.variant = useRoute().query.variant;
    // state.search.engine = useRoute().query.engine;
    state.search.brand = useRoute().query.brand.toUpperCase();
    // state.availableEnginesForSelectedVariant = (
    //   await useGetEngines(true, state.search.variant)
    // ).options.engine.map((engine) => (engine === "" ? "none" : engine));
    state.productList = [];
    // state.productList = (
    //   await useGetProducts(state.search.variant, state.search.brand)
    // ).results;
    // state.loader = false;
    console.log(state.search.brand, state.search.variant, "!!!!111rtaz");
  }
});

const filter = computed(() => {
  const filteredId = [];
  const properList = [];
  if (state.productList.length > 0) {
    state.productList.forEach((obj) => {
      if (!filteredId.includes(obj.item.id)) {
        filteredId.push(obj.item.id);
        properList.push(obj);
      }
    });
  }
  return properList;
});

// watch(
//   () => state.search.variant,
//   async () => {
//     await getEngines(state.search.variant);
//   }
// );

// watch(
//   () => state.search.brand,
//   async () => {
//     await getProducts(state.search.brand);
//   }
// );

// watchEffect(() => {
//   const qs = new URLSearchParams(state.search);
//   state.queryString = qs.toString();
//   return qs.toString();
// });
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
