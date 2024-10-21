<template>
  <Head>
    <Title>
      {{ product.name }} |
      {{
        `${
          product.groupdescription ||
          product.description ||
          product.categorydescription
        }`
      }}
      |
      {{
        getStockQuantity(product.available)
          ? "2-4 days delivery"
          : metaInfo.find((obj) => obj.id === product.manufacturergroup)
              .shortName
      }}
      | Mustang Performance
    </Title>
    <!-- <Meta name="description" content="title is the best" /> -->
  </Head>
  <ClientOnly>
    <Banner :title="getBannerDescription" />
    <UiAddToCartPopUp :name="product.name" v-if="addToCartPopUp" />

    <section class="container py-3 mx-auto gtm_product_page">
      <!--IMAGES / INFO SECTION -->

      <div class="grid gap-3 sm:grid-cols-2 sm:min-h-[450px]">
        <div class="flex flex-col gap-1 sm:flex-row">
          <div
            v-if="state.product.photos.length > 1"
            class="order-1 flex basis-[25%] justify-around gap-1 sm:!order-[-1] sm:flex-col md:items-center sm:justify-start md:gap-3"
          >
            <div
              @click="() => (state.selectedFoto = picUrl.url)"
              class="flex h-[80px] w-[80px] cursor-pointer items-center justify-center overflow-hidden border-[1px] border-black p-1 md:h-[100px] md:w-[100px]"
              v-for="picUrl in state.product.photos"
            >
              <nuxt-img
                :src="picUrl.url"
                width="90px"
                class="p-1"
                format="webp"
                :alt="state.product.urlcomponent"
              />
            </div>
          </div>
          <UiImageModal
            v-if="state.selectedFoto"
            :name="product.name"
            :url="state.selectedFoto"
            :checked="state.dialog"
            @close="state.dialog = false"
          />
          <div
            class="flex items-center justify-center overflow-hidden !border border-black p-2 sm:h-full sm:w-full cursor-pointer"
            @click="openModal(state.selectedFoto)"
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
                  :alt="state.product.urlcomponent"
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
            {{ state.product.name }} - {{ state.product.description }}
          </div>
          <div
            class="w-full mx-auto my-3 font-light text-center border-b sm:!m-0 sm:!mt-2 sm:!text-start sm:text-base"
          >
            Manufacturer:
            {{ getManufacturerBrand(product.manufacturergroup, Manufacturers) }}
          </div>
          <ProductInfo
            :part="product"
            :productType="productType"
            :manufacturergroup="product.manufacturergroup"
            class="my-1 sm:!my-2"
          />
          <div class="mx-auto sm:!m-0">
            <div
              class="flex justify-center justify-md-start items-baseline mx-auto mt-2 text-xl font-bold font-nunito sm:!text-2xl"
            >
              {{
                calculateInitialProductPrice(
                  state.product.price.prices[LOCATION.EU].grossprice,
                  productType
                )
              }}
              {{ state.product.price.symbol }}
              <span
                v-if="state.product.price.prices[LOCATION.EU].promotion"
                class="ml-3 text-decoration-line-through text-subtitle-1"
              >
                {{
                  calculateInitialProductPrice(
                    state.product.price.baseprice,
                    productType
                  )
                }}
                {{ state.product.price.symbol }}</span
              >
              <span class="ml-2 text-base font-normal"
                >{{ showPriceInfo(productType) }}
              </span>
            </div>
            <p class="text-xs text-center sm:!ml-2 sm:!text-start sm:text-sm">
              (Vat included)
            </p>
            <p
              v-if="state.product.price.prices[LOCATION.EU].promotion"
              class="text-xs text-center sm:!ml-2 sm:!text-start sm:text-sm mt-2"
            >
              The lowest price offered within the last 30 days before the
              application of the price reduction:
              {{
                calculateInitialProductPrice(
                  state.product.price.baseprice,
                  productType
                )
              }}
              {{ state.product.price.symbol }}
            </p>
          </div>
          <!--ADD TO CART / ENQUIRY BUTTON -->
          <div
            class="flex items-center justify-center w-full my-5 sm:!mb-3 sm:!justify-start"
          >
            <div
              class="flex items-center h-full mr-3 text-sm border border-gray-300 rounded-lg sm:text-base"
              v-if="!state.productAvailability.enquiry"
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
              <div v-if="state.productAvailability.outOfStock">
                <Enquiry :product="state.product.name" />
              </div>
              <div v-else>
                <div v-if="mustangCookieConsents.accepted">
                  <AddToCartBtn
                    @click="() => addToCartPopUpHandler()"
                    :product="product"
                    :availability="state.productAvailability"
                    :quantity="state.quantityOrder"
                    :productStatus="state.productStatus"
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
          <ProductDeliveryInfo
            :availabilityStatusInfo="availabilityStatusInfo"
            :productStatus="state.productStatus"
            :arrivalDate="state.productAvailability.intransit.deliveryDate"
          />
        </div>
      </div>

      <!-- OVERVIWE/APPLICATIONS/RELATED SECTION -->
      <div class="grid gap-2 lg:grid-cols-[75%,auto]">
        <div>
          <ProductOverviewApplicationsTechInfo
            :product="product"
            :weight="state.product.weight"
            :kitItem="state.kitItem"
          />
        </div>

        <ProductRelatedList :id="state.product.id" />
      </div>
    </section>
  </ClientOnly>
</template>

<script setup>
import { LOCATION, Manufacturers, metaInfo } from "../../vars/index";

const { record } = useRoute().params;
const store = useStore();
const country = store.getCountry();
const mustangCookieConsents = useCookie("mustang-cookie-consents");

const shoppingCart = await useGetCart(country.code, store.cartId);
const product = await useGetItem(record, country.code);

const productType = getProductType(product.name);

const state = reactive({
  product: {},
  quantityOrder: productType === "discbrake" ? 2 : 1,
  quantityInBasket: 0,
  selectedFoto: "",
  productStatus: "",
  kitItem: {
    isKitItem: false,
    components: [],
  },
  productAvailability: {
    inStock: 0,
    manufacturer: 0,
    intransit: {
      quantity: 0,
      deliveryDate: "",
    },
    outOfStock: false,
    enquiry: false,
  },
  dialog: false,
});

onMounted(() => {
  state.product = product;
  init();
});

const addToCartPopUp = ref(false);
const init = () => {
  checkQuantityInBasket();
  kitItemCheck();
  assignProductAvailability(state.product);
  checkAvailabilityStatus();

  if (state.product.photos.length > 0) {
    state.selectedFoto = state.product.photos[0].url;
  } else {
    state.selectedFoto = "";
  }
};
const openModal = () => {
  state.dialog = !state.dialog;
};
// dodawanie do state il produktu z koszyka

const checkQuantityInBasket = () => {
  if (shoppingCart.shoppingcarts.length > 0) {
    const quantityInBasket =
      shoppingCart.shoppingcarts[0].shoppingcart.transactionlines
        .filter((obj) => obj.item._id === product.id)
        .reduce((prev, curr) => prev + curr.quantity, 0);

    if (quantityInBasket) {
      state.quantityInBasket = quantityInBasket;
    }
  }
};

// FUNKCJE

const addToCartPopUpHandler = () => {
  addToCartPopUp.value = true;
  state.quantityInBasket += state.quantityOrder;
  state.quantityOrder = productType === "discbrake" ? 2 : 1;
  if (
    state.quantityInBasket + state.quantityOrder >=
    state.productAvailability.inStock +
      state.productAvailability.manufacturer +
      state.productAvailability.intransit.quantity
  ) {
    state.productAvailability.outOfStock = true;
  }
  const id = setTimeout(() => {
    addToCartPopUp.value = false;

    clearTimeout(id);
  }, 2000);
};

// sprawdzanie statusu dpstępności, żeby btn miłą odpowiednia
const checkAvailabilityStatus = () => {
  const counter = productType === "discbrake" ? 2 : 1;
  if (product.manufacturergroup === Manufacturers.DBA.id) {
    (state.productAvailability.inStock < counter ||
      !state.productAvailability.inStock) &&
    (state.productAvailability.intransit.quantity < counter ||
      !state.productAvailability.intransit.quantity) &&
    (parseInt(state.productAvailability.manufacturer) < counter ||
      !state.productAvailability.manufacturer)
      ? (state.productAvailability.enquiry = true)
      : (state.productAvailability.enquiry = false);
    return;
  } else {
    state.productAvailability.inStock < counter ||
    !state.productAvailability.inStock
      ? (state.productAvailability.enquiry = true)
      : (state.productAvailability.enquiry = false);
  }
};

const getStockQuantity = (arr) => {
  const stock = arr.find((obj) => obj.location === LOCATION.EU);
  return stock ? stock.quantityavailable : 0;
};

const getManfacturerQuantity = (arr) => {
  const manufacturer = arr.find(
    (obj) => obj.location === "manufacturer"
  ).quantityavailable;

  return manufacturer ? manufacturer : 0;
};

const calculateInitialProductPrice = (price, productType) => {
  return productType === "discbrake"
    ? (price * 2).toFixed(2)
    : Number(price).toFixed(2);
};

const addQuantity = () => {
  if (state.productAvailability.outOfStock) return;
  productType === "discbrake"
    ? (state.quantityOrder += 2)
    : state.quantityOrder++;
};

const subtractQuantity = () => {
  if (productType === "discbrake") {
    if (state.quantityOrder - 2 < 2) {
      return;
    }
    return (state.quantityOrder -= 2);
  } else {
    if (state.quantityOrder - 1 < 1) return;
    state.quantityOrder -= 1;
  }
};

const getInTransitInfo = (product) => {
  const location = product.available.find(
    (obj) => obj.location === LOCATION.EU
  );
  if (!location.intransit) {
    state.productAvailability.intransit.deliveryDate = "";
    state.productAvailability.intransit.quantity = 0;
    return;
  }

  const deliveries = product.deliveries[LOCATION.EU];
  let productsInTransitInLessTreeWeeks = 0;
  let deliveryDate = "";

  deliveries.forEach((obj) => {
    const deliveryTimeCheck = isDateDifferenceGreaterThan(obj, 16);

    if (deliveryTimeCheck) {
      productsInTransitInLessTreeWeeks += obj.quantity;
      deliveryDate = obj.eta;
    }
  });

  state.productAvailability.intransit.quantity =
    productsInTransitInLessTreeWeeks;
  state.productAvailability.intransit.deliveryDate = deliveryDate;
};

const isDateDifferenceGreaterThan = (deliveryObj, days) => {
  const currentDate = new Date();
  const deliveryDate = new Date(deliveryObj.eta);

  const differenceInMilliseconds = deliveryDate - currentDate;

  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (24 * 60 * 60 * 1000)
  );
  return differenceInDays <= days;
};

const assignProductAvailability = (product) => {
  state.productAvailability.inStock = getStockQuantity(product.available);
  state.productAvailability.manufacturer = getManfacturerQuantity(
    product.available
  );
  getInTransitInfo(product);
};

const kitItemCheck = () => {
  if (product.recordtype === "kititem") {
    state.kitItem.isKitItem = true;
    state.kitItem.components = product.components.map((obj) => obj.number);
  }
};

const availabilityStatusInfo = computed(() => {
  const backOrder = !!state.product.available.find(
    (obj) => obj.location === LOCATION.EU
  ).specialbackorder;

  if (
    state.quantityOrder + state.quantityInBasket <=
    state.productAvailability.inStock
  ) {
    state.productAvailability.outOfStock = false;
    state.productStatus = "inStock";

    return "Available and ready to ship (2-4 days delivery)";
  } else {
    if (
      product.manufacturergroup === Manufacturers.DBA.id ||
      (product.manufacturergroup === Manufacturers.PEDDERS.id && backOrder)
    ) {
      if (
        state.quantityOrder + state.quantityInBasket >
          state.productAvailability.inStock &&
        state.quantityOrder + state.quantityInBasket <=
          state.productAvailability.intransit.quantity +
            state.productAvailability.inStock
      ) {
        state.productAvailability.outOfStock = false;
        state.productStatus = "inTransit";
        return "Product in transit - delivery within 3 weeks";
      } else if (
        state.productAvailability.inStock <
          state.quantityOrder + state.quantityInBasket &&
        state.productAvailability.inStock +
          state.productAvailability.manufacturer +
          state.productAvailability.intransit.quantity >=
          state.quantityOrder + state.quantityInBasket
      ) {
        state.productAvailability.outOfStock = false;
        state.productStatus = "air";

        return productType === "discbrake"
          ? "Available within 4 weeks with extra cost"
          : "Available in 4 weeks";
      }
    }
    state.productAvailability.outOfStock = true;
    state.productStatus = "outOfStock";
    return "Temporarily out of stock";
  }
});

const getBannerDescription = computed(() => {
  if (
    state.product.categorydescription === "BUSHINGS AND OTHER" &&
    state.product.description
  ) {
    return state.product.description;
  } else if (state.product.groupdescription) {
    return state.product.groupdescription;
  } else if (state.product.categorydescription) {
    return state.product.categorydescription;
  } else if (
    !state.product.categorydescription &&
    !state.product.groupdescription
  ) {
    return state.product.description;
  }
});
</script>
