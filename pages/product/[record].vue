<template>
  <div>
    <div v-if="isLoading">Loading product...</div>

    <div v-else-if="error" class="container px-4 py-12 mx-auto">
      <div class="max-w-lg p-4 mx-auto text-center">
        <Icon
          name="material-symbols:info-outline"
          class="mb-3 text-gray-400"
          size="32px"
        />
        <p class="mb-4 text-sm text-gray-600">
          {{
            error === "This product is currently unavailable."
              ? error
              : "We couldn't load this product right now."
          }}
        </p>
        <div class="flex justify-center gap-2">
          <button
            @click="refreshData"
            class="px-4 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
          >
            Try Again
          </button>
          <NuxtLink
            to="/"
            class="px-4 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Go Home
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else-if="productData.product">
      <Head>
        <Title>
          {{ productData.product.name }} |
          {{
            `${
              productData.product.groupdescription ||
              productData.product.description ||
              productData.product.categorydescription
            }`
          }}
          | Mustang Performance
        </Title>
        <Meta name="description" content="title is the best" />
      </Head>
      <Banner :title="getBannerDescription" />
      <UiAddToCartPopUp
        :name="productData.product.name"
        v-if="addToCartPopUp"
      />
      <section class="container py-3 mx-auto gtm_product_page">
        <!--IMAGES / INFO SECTION -->

        <div class="grid gap-3 sm:grid-cols-2 sm:min-h-[450px]">
          <div class="flex flex-col gap-1 sm:flex-row">
            <div
              v-if="productData.product.photos.length > 1"
              class="order-1 flex basis-[25%] justify-around gap-1 sm:!order-[-1] sm:flex-col md:items-center sm:justify-start md:gap-3"
            >
              <div
                @click="() => (state.selectedFoto = picUrl.url)"
                class="flex h-[80px] w-[80px] cursor-pointer items-center justify-center overflow-hidden border-[1px] border-black p-1 md:h-[100px] md:w-[100px]"
                v-for="picUrl in productData.product.photos"
              >
                <nuxt-img
                  :src="picUrl.url"
                  width="90px"
                  class="p-1"
                  format="webp"
                  :alt="productData.product.urlcomponent"
                />
              </div>
            </div>
            <UiImageModal
              v-if="state.selectedFoto"
              :name="productData.product.name"
              :url="state.selectedFoto"
              :checked="state.dialog"
              @close="state.dialog = false"
            />
            <div
              class="flex items-center justify-center overflow-hidden !border border-black p-2 sm:h-full sm:w-full cursor-pointer"
              @click="openModal()"
              v-if="state.selectedFoto"
            >
              <div
                class="flex h-[250px] items-center justify-center overflow-hidden sm:h-[300px]"
              >
                <div
                  class="object-contain w-[200px] sm:w-[250px] md:w-[300px] justify-center items-center flex"
                >
                  <nuxt-img
                    :src="state.selectedFoto"
                    fit="contain"
                    sizes="xs:200px sm:250px md:300px"
                    :alt="productData.product.urlcomponent"
                    class="w-[200px] sm:w-[250px] md:w-[300px]"
                  />
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex items-center justify-center p-2 overflow-hidden border-[1px] border-black sm:h-full sm:w-full"
            >
              <nuxt-img
                src="/mustang/no_image.jpg"
                format="webp"
                alt="No image"
                provider="cloudinary"
                fit="contain"
                sizes="xs:200px sm:250px md:300px"
              />
            </div>
          </div>

          <div class="flex flex-col items-start gap-2 font-nunito">
            <div
              class="w-full mt-3 font-semibold tracking-wide text-center sm:!mt-0 sm:!mx-0 md:!text-xl sm:!text-start"
            >
              {{ productData.product.name }} -
              {{ productData.product.description }}
            </div>
            <div
              class="w-full mx-auto my-3 font-light text-center border-b sm:!m-0 sm:!mt-2 sm:!text-start sm:text-base"
            >
              Manufacturer:
              {{
                getManufacturerBrand(
                  productData.product.manufacturergroup,
                  Manufacturers
                )
              }}
            </div>
            <ProductInfo
              :part="productData.product"
              :productType="productType"
              :manufacturergroup="productData.product.manufacturergroup"
              class="my-1 sm:!my-2"
            />
            <div class="mx-auto sm:!m-0">
              <div
                class="flex justify-center justify-md-start items-baseline mx-auto mt-2 text-xl font-bold font-nunito sm:!text-2xl"
              >
                {{
                  calculateInitialProductPrice(
                    productData.product?.price?.prices[
                      productData.defaultStockLocation
                    ].grossprice,
                    productType
                  )
                }}
                {{ productData.product.price.symbol }}
                <span
                  v-if="
                    productData.product.price.prices[
                      productData.defaultStockLocation
                    ].promotion
                  "
                  class="ml-3 text-decoration-line-through text-subtitle-1"
                >
                  {{
                    calculateInitialProductPrice(
                      productData.product.price.baseprice,
                      productType
                    )
                  }}
                  {{ productData.product.price.symbol }}</span
                >
                <span class="ml-2 text-base font-normal"
                  >{{ showPriceInfo(productType) }}
                </span>
              </div>
              <p class="text-xs text-center sm:!ml-2 sm:!text-start sm:text-sm">
                (Vat included)
              </p>
              <p
                v-if="
                  productData.product?.price.prices[
                    productData.defaultStockLocation
                  ].promotion
                "
                class="text-xs text-center sm:!ml-2 sm:!text-start sm:text-sm mt-2"
              >
                The lowest price offered within the last 30 days before the
                application of the price reduction:
                {{
                  calculateInitialProductPrice(
                    productData.product.price.baseprice,
                    productType
                  )
                }}
                {{ productData.product.price.symbol }}
              </p>
            </div>
            <!--ADD TO CART / ENQUIRY BUTTON -->
            <div
              class="flex items-center justify-center w-full my-5 sm:!mb-3 sm:!justify-start"
            >
              <div
                class="flex items-center h-full mr-3 text-sm border border-gray-300 rounded-lg sm:text-base"
              >
                <Icon
                  class="cursor-pointer"
                  name="ic:sharp-minus"
                  size="24px"
                  @click="subtractQuantity"
                />
                <p class="px-2">{{ state.quantityOrder }}</p>
                <button>
                  <Icon
                    class="cursor-pointer"
                    name="material-symbols:add-rounded"
                    size="24px"
                    @click="addQuantity"
                  ></Icon>
                </button>
              </div>
              <div class="flex items-center h-[40px]">
                <div
                  v-if="
                    state.quantityInBasket + state.quantityOrder >
                    productInfo.max + state.quantityInBasket
                  "
                >
                  <Enquiry :product="productData.product.name" />
                </div>
                <div v-else>
                  <div v-if="mustangCookieConsents.accepted">
                    <AddToCartBtn
                      @click="() => addToCartPopUpHandler()"
                      :product="productData.product"
                      :quantity="state.quantityOrder"
                      :productType="productType"
                      :productInfo="productInfo"
                      :defaultStockLocation="productData.defaultStockLocation"
                    />
                  </div>
                  <div
                    v-else
                    class="px-2.5 py-2 max-w-[350px] text-xs font-bold border-2 border-red-600 rounded-md sm:text-sm"
                  >
                    In order to purchase, please refresh the page and accept the
                    cookie policy
                  </div>
                </div>
              </div>
            </div>
            <ProductDeliveryInfo :productInfo="productInfo" />
          </div>
        </div>

        <!-- OVERVIWE/APPLICATIONS/RELATED SECTION -->
        <div class="grid gap-2 lg:grid-cols-[75%,auto]">
          <div>
            <ProductOverviewApplicationsTechInfo
              :product="productData.product"
              :weight="productData.product.weight"
              :kitItem="state.kitItem"
            />
          </div>

          <ProductRelatedList :id="productData.product.id" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAvailability } from "@/utils/availability";
import { Manufacturers, metaInfo } from "@/vars/index";
import {
  AvailableDetail,
  ComponentsItem,
  GetItemResponse,
  TransactionlinesInterface,
} from "~/types/api";

const route = useRoute();
const store = useStore();
const { country } = useCountry();
const mustangCookieConsents = useCookie("mustang-cookie-consents") as any;

const productType = ref<string>("");
const productData = ref<{
  product: GetItemResponse | null;
  shoppingCart: any;
  defaultStockLocation: string;
}>({
  product: null,
  shoppingCart: null,
  defaultStockLocation: "",
});
const isLoading = ref(false);
const error = ref<string | null>(null);
const addToCartPopUp = ref(false);
const productInfo = ref({ av: null, ctx: null, max: 0 });
// const state = reactive({
//   quantityOrder: 0,
//   quantityInBasket: 0,
//   selectedFoto: "",
//   kitItem: {
//     isKitItem: false,
//     components: [],
//   },
//   dialog: false,
// });

const state = reactive<{
  quantityOrder: number;
  quantityInBasket: number;
  selectedFoto: string;
  kitItem: {
    isKitItem: boolean;
    components: number[];
  };
  dialog: boolean;
}>({
  quantityOrder: 0,
  quantityInBasket: 0,
  selectedFoto: "",
  kitItem: {
    isKitItem: false,
    components: [],
  },
  dialog: false,
});

const getBannerDescription = computed(() => {
  if (!productData.value.product) return "";

  if (
    productData.value.product.categorydescription === "BUSHINGS AND OTHER" &&
    productData.value.product.description
  ) {
    return productData.value.product.description;
  } else if (productData.value.product.groupdescription) {
    return productData.value.product.groupdescription;
  } else if (productData.value.product.categorydescription) {
    return productData.value.product.categorydescription;
  } else if (
    !productData.value.product.categorydescription &&
    !productData.value.product.groupdescription
  ) {
    return productData.value.product.description;
  }
});

const fetchProductData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const record = route.params.record as string;

    if (!record || !country.value) {
      throw new Error("Missing required parameters");
    }

    const [shoppingCart, useGetItemResponse] = await Promise.all([
      useGetCart(country.value, store.cartId),
      useGetItem({ record, country: country.value }),
    ]);

    // if (productResponse.error) {
    //   throw new Error(productResponse.error);
    // }
    console.log(useGetItemResponse);

    if (useGetItemResponse.error) {
      if (useGetItemResponse.status === 404) {
        error.value = "This product is currently unavailable.";
      } else {
        error.value = useGetItemResponse.error;
      }
      return;
    }

    const product = useGetItemResponse.data;

    if (!product) {
      error.value = "This product is currently unavailable.";
      return;
    }

    const defaultStockLocation =
      product?.available?.find((e) => e.default)?.location || "";

    productType.value = getProductType(product.name);
    state.quantityOrder = getProductType(product.name) === "discbrake" ? 2 : 1;

    productData.value = {
      product,
      shoppingCart,
      defaultStockLocation,
    };
  } catch (err: any) {
    console.error("Error fetching product data:", err);
    error.value =
      err.message || "Unable to load product. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

const init = async () => {
  checkQuantityInBasket();
  kitItemCheck();

  if (
    productData.value.product &&
    productData.value.product.photos.length > 0
  ) {
    state.selectedFoto = productData.value.product.photos[0].url;
  } else {
    state.selectedFoto = "";
  }
};

const openModal = () => {
  console.log("elo");
  state.dialog = !state.dialog;
};

const checkQuantityInBasket = () => {
  if (
    productData.value.product &&
    productData.value.shoppingCart.shoppingcarts.length > 0
  ) {
    const productId = productData.value.product.id;
    const quantityInBasket =
      productData.value.shoppingCart.shoppingcarts[0].shoppingcart.transactionlines
        .filter((obj: TransactionlinesInterface) => obj.item._id === productId)
        .reduce(
          (prev: number, curr: TransactionlinesInterface) =>
            prev + curr.quantity,
          0
        );

    if (quantityInBasket) {
      state.quantityInBasket = quantityInBasket;
    }
  }
};

const addToCartPopUpHandler = () => {
  addToCartPopUp.value = true;
  state.quantityInBasket += state.quantityOrder;
  state.quantityOrder = productType.value === "discbrake" ? 2 : 1;

  const id = setTimeout(() => {
    addToCartPopUp.value = false;

    clearTimeout(id);
  }, 2000);
};

const calculateInitialProductPrice = (
  price: number | string,
  productType: string
) => {
  return productType === "discbrake"
    ? (Number(price) * 2).toFixed(2)
    : Number(price).toFixed(2);
};

const addQuantity = () => {
  productType.value === "discbrake"
    ? (state.quantityOrder += 2)
    : state.quantityOrder++;
};

const subtractQuantity = () => {
  if (productType.value === "discbrake") {
    if (state.quantityOrder - 2 < 2) {
      return;
    }
    return (state.quantityOrder -= 2);
  } else {
    if (state.quantityOrder - 1 < 1) return;
    state.quantityOrder -= 1;
  }
};

const kitItemCheck = () => {
  if (
    productData.value.product &&
    productData.value.product.recordtype === "kititem"
  ) {
    state.kitItem.isKitItem = true;
    state.kitItem.components = productData.value.product.components.map(
      (obj) => obj.number
    );
  }
};

const refreshData = async () => {
  error.value = null;
  await fetchProductData();
  if (productData.value.product) {
    init();
  }
};

onMounted(async () => {
  await fetchProductData();
  init();
});

watch(
  () => [productData.value.product, productData.value.shoppingCart],
  ([newProduct, newShoppingCart]) => {
    if (newProduct && newShoppingCart && newProduct.manufacturergroup) {
      checkQuantityInBasket();

      const manufacturerInfo = metaInfo.find(
        (obj) => obj.id === newProduct.manufacturergroup
      );

      if (!manufacturerInfo) return;

      const { av, ctx, max } = getAvailability(
        newProduct,
        state.quantityOrder,
        state.quantityInBasket,
        manufacturerInfo.shortName
      ) as { av: any; ctx: any; max: number };

      productInfo.value = { av, ctx, max };
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => [state.quantityOrder, state.quantityInBasket],
  () => {
    if (productData.value.product && productData.value.shoppingCart) {
      checkQuantityInBasket();

      const manufacturerInfo = metaInfo.find(
        (obj) => obj.id === productData.value.product!.manufacturergroup
      );

      if (!manufacturerInfo) return;

      const { av, ctx, max } = getAvailability(
        productData.value.product,
        state.quantityOrder,
        state.quantityInBasket,
        manufacturerInfo.shortName
      ) as { av: any; ctx: any; max: number };

      productInfo.value = { av, ctx, max };
    }
  }
);
</script>
