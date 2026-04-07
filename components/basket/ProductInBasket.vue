<template>
  <section>
    <table class="w-max-[85%] sm:my-15 mx-auto my-10 w-full text-center">
      <thead class="hidden mb-1 bg-white sm:flex">
        <tr
          class="flex w-full flex-wrap border border-[#C0C0C0] px-3 py-4 font-open-sans text-xs text-mustangRed md:text-sm lg:text-base"
        >
          <th class="font-semibold text-left basis-2/4">Product</th>
          <th class="basis-[calc(45%/4)] font-semibold">Quantity</th>
          <th class="basis-[calc(45%/4)] font-semibold">Unit price</th>
          <th class="basis-[calc(45%/4)] font-semibold">Subtotal</th>
          <th class="basis-[calc(45%/4)] font-semibold">Tax</th>
          <th class="basis-[5%] font-semibold"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="flex flex-col gap-1 font-nunito text-[0.825rem] sm:flex-row sm:gap-0 lg:text-base"
          :class="
            (product.item.recordtype === 'inventoryitem' ||
              product.item.recordtype === 'kititem') &&
            !product.kitcomponent
              ? 'mb-2 border border-[#C0C0C0] bg-white p-2'
              : 'mb-2  ml-3 mt-[-8px] bg-white pr-3 hidden sm:flex'
          "
          v-for="(product, index) in limitedProducts"
          :key="index"
        >
          <td
            class="flex basis-[50%]"
            :class="
              (product.item.recordtype === 'service' || product.kitcomponent) &&
              'hidden sm:block'
            "
          >
            <div
              v-if="
                (product.item.recordtype === 'inventoryitem' ||
                  product.item.recordtype === 'kititem') &&
                !product.kitcomponent
              "
              class="w-full"
            >
              <div
                class="grid grid-cols-[80px_auto] md:!grid-cols-[100px_auto] lg:!grid-cols-[120px_auto] gap-1 mb-2 sm:!mb-0 sm:!gap-3"
              >
                <div class="flex items-start justify-center sm:!p-0">
                  <NuxtLink :to="`/product/${product.item.urlcomponent}`">
                    <div v-if="product.item.photos[0]">
                      <nuxt-img
                        :src="product.item.photos[0].url"
                        :alt="product.item.photos[0].name"
                        width="120px"
                        height="120px"
                        fit="contain"
                        sizes="100px sm:120px"
                        background="white"
                        class="w-[120px] h-[120px] object-contain"
                      />
                    </div>
                    <div class="min-w-[65px]" v-else>
                      <nuxt-img
                        src="/mustang/no_image.jpg"
                        format="webp"
                        alt="No image"
                        provider="cloudinary"
                        width="120px"
                        height="120px"
                        fit="contain"
                        sizes="100px sm:120px"
                        background="white"
                      />
                    </div>
                  </NuxtLink>
                </div>

                <div
                  class="flex flex-col items-start justify-around gap-1 cursor-pointer"
                  @click="
                    () => navigateTo(`/product/${product.item.urlcomponent}`)
                  "
                >
                  <div
                    class="flex flex-col items-start gap-[1px] font-nunito text-sm lg:text-base w-full"
                  >
                    <div class="flex justify-between w-full">
                      <span class="font-bold"> {{ product.displayname }} </span>
                      <div class="sm:hidden">
                        <Icon
                          v-if="
                            (product.item.recordtype === 'inventoryitem' ||
                              product.item.recordtype === 'kititem') &&
                            !product.kitcomponent
                          "
                          name="solar:trash-bin-trash-linear"
                          class="cursor-pointer sm:hidden"
                          size="18px"
                          @click="$emit('deleteProducts', product)"
                        ></Icon>
                      </div>
                    </div>
                    <span class="text-start lg:text-[15px]">
                      {{ product.item.description }}
                    </span>
                  </div>
                  <div>
                    <BasketAvailabilityInStock
                      :inTransit="true"
                      v-if="
                        product.additionalservice.length === 0 &&
                        product.quantity > product.item.quantityavailable
                      "
                    />

                    <BasketAvailabilityInStock
                      :inTransit="false"
                      v-else-if="
                        product.additionalservice.length === 0 &&
                        product.quantity <= product.item.quantityavailable
                      "
                    />
                    <BasketAvailabilityAirFreight
                      v-else-if="product.additionalservice.length > 0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- <div v-else-if="product.item.recordtype === 'kititem'">
              <div
                class="grid border-2 border-green-700 grid-cols-[80px_auto] md:!grid-cols-[100px_auto] lg:!grid-cols-[120px_auto] gap-1 mb-2 sm:!mb-0 sm:!gap-3"
              >
                <div class="flex items-start justify-center sm:!p-0">
                  <NuxtLink :to="`/product/${product.item.number}`">
                    <div v-if="product.item.photos[0]">
                      <nuxt-img
                        :src="product.item.photos[0].url"
                        :alt="product.item.photos[0].name"
                        width="120px"
                        height="120px"
                        fit="contain"
                        sizes="100px sm:120px"
                        background="white"
                        class="w-[120px] h-[120px] object-contain"
                      />
                    </div>
                    <div class="min-w-[65px]" v-else>
                      <nuxt-img
                        src="/mustang/no_image.jpg"
                        format="webp"
                        alt="No image"
                        provider="cloudinary"
                        width="120px"
                        height="120px"
                        fit="contain"
                        sizes="100px sm:120px"
                        background="white"
                      />
                    </div>
                  </NuxtLink>
                </div>

                <div
                  class="flex flex-col items-start gap-1 sm:justify-center sm:gap-4"
                >
                  <div
                    class="flex flex-col items-start gap-[1px] font-nunito text-sm lg:text-base w-full"
                  >
                    <div class="flex justify-between w-full">
                      <span class="font-bold"> {{ product.displayname }} </span>
                      <div class="sm:hidden">
                        <Icon
                          v-if="product.item.recordtype !== 'service'"
                          name="solar:trash-bin-trash-linear"
                          class="cursor-pointer sm:hidden"
                          size="18px"
                          @click="$emit('deleteProducts', product)"
                        ></Icon>
                      </div>
                    </div>
                    <span class="text-start">
                      {{ product.item.description }}
                    </span>
                  </div>

                  <BasketAvailabilityInStock
                    :inTransit="true"
                    v-if="
                      product.additionalservice.length === 0 &&
                      product.quantity > product.item.quantityavailable
                    "
                  />

                  <BasketAvailabilityInStock
                    :inTransit="false"
                    v-else-if="
                      product.additionalservice.length === 0 &&
                      product.quantity <= product.item.quantityavailable
                    "
                  />
                  <BasketAvailabilityAirFreight
                    v-else-if="product.additionalservice.length > 0"
                  />
                </div>
              </div>
            </div> -->

            <div
              v-else-if="
                product.item.recordtype === 'service' || product.kitcomponent
              "
              class="hidden bg-white sm:flex"
            >
              <div
                class="mb-[-1px] ml-[-1px] flex w-[140px] items-start justify-end bg-white"
              >
                <Icon
                  name="material-symbols:subdirectory-arrow-right-rounded"
                  size="56px"
                />
              </div>
              <div
                class="bg-[#F6F6F6] w-[80px] h-[80px] border-l aspect-square cursor-pointer"
                :class="
                  product.item.recordtype === 'service' && 'pointer-events-none'
                "
                @click="
                  () => navigateTo(`/product/${product.item.urlcomponent}`)
                "
              >
                <nuxt-img
                  format="webp"
                  :src="product.item.photos[0].url"
                  :alt="product.item.photos[0].name"
                  width="80px"
                  height="80px"
                  fit="contain"
                  class="w-[80px] h-[80px] object-contain border-b"
                  background="#F6F6F6"
                />
              </div>

              <div
                class="flex items-center w-full px-3 border-b border-l cursor-pointer font-nunito"
                :class="
                  product.item.recordtype === 'service' && 'pointer-events-none'
                "
                @click="
                  () => navigateTo(`/product/${product.item.urlcomponent}`)
                "
              >
                <div class="text-[12px] text-left md:text-sm">
                  <p class="pb-1 font-bold">
                    {{ product.displayname }}
                  </p>
                  {{ product.item.description }}
                </div>
              </div>
            </div>
          </td>

          <td class="flex basis-[calc(45%/4)] items-center bg-white">
            <div
              v-if="
                (product.item.recordtype === 'inventoryitem' ||
                  product.item.recordtype === 'kititem') &&
                !product.kitcomponent
              "
              class="flex justify-between w-full sm:justify-center"
            >
              <p class="sm:hidden">Quantity:</p>
              <p>
                {{ product.quantity }}
              </p>
            </div>
            <div
              v-else
              :class="
                !product.kitcomponent
                  ? 'w-full h-full border-b border-[#C0C0C0] hidden sm:block'
                  : 'w-full h-full  border-b border-r hidden sm:block content-center'
              "
            >
              <p v-if="product.item.recordtype !== 'service'">
                {{ product.quantity }}
              </p>
            </div>
          </td>

          <td
            class="flex basis-[calc(45%/4)] items-center justify-between bg-white sm:w-auto sm:justify-center"
            :class="
              product.item.recordtype === 'service' &&
              'hidden sm:flex border-b border-[#C0C0C0]'
            "
          >
            <p v-if="!product.kitcomponent" class="sm:hidden">Unit price:</p>
            <div v-if="!product.kitcomponent">
              {{ props.currency }} {{ product.unitprice }}
            </div>
          </td>

          <td
            class="flex basis-[calc(45%/4)] items-center justify-between bg-white font-semibold sm:justify-center sm:p-0"
            :class="
              product.item.recordtype === 'service' &&
              'hidden sm:flex border-b border-[#C0C0C0]'
            "
          >
            <p v-if="!product.kitcomponent" class="sm:hidden">Subtotal:</p>
            <div v-if="!product.kitcomponent">
              {{ props.currency }} {{ product.amount }}
            </div>
          </td>

          <td
            class="flex basis-[calc(45%/4)] flex-wrap items-center justify-between gap-1 bg-white sm:justify-center"
            :class="
              product.item.recordtype === 'service' &&
              'hidden sm:flex border-b border-r'
            "
          >
            <div
              v-if="!product.kitcomponent"
              class="flex justify-between w-full sm:justify-center"
            >
              <p class="sm:hidden">Tax:</p>
              <div>{{ props.currency }} {{ product.taxamount }}</div>
            </div>
            <div
              v-if="product.additionalservice.length > 0"
              class="flex justify-between w-full sm:hidden"
            >
              <p>
                <span class="text-sm text-red-600">*</span>Airfreight Service:
              </p>

              <p>
                {{ currency }}
                {{ airFreightCost }}
                <span class="text-[10px]">(with tax)</span>
              </p>
            </div>
          </td>

          <td
            class="hidden right-[5%] top-[5%] basis-[5%] items-center justify-center bg-white sm:flex"
          >
            <Icon
              v-if="
                (product.item.recordtype === 'inventoryitem' ||
                  product.item.recordtype === 'kititem') &&
                !product.kitcomponent
              "
              name="solar:trash-bin-trash-linear"
              class="cursor-pointer"
              size="18px"
              @click="$emit('deleteProducts', product)"
            ></Icon>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
const props = defineProps(["products", "summary", "currency"]);

const limitedProducts = computed(() => {
  // return props.products.filter((obj) => obj.kitcomponent !== true);
  return props.products;
});

const airFreightCost = computed(() => {
  const found = props.products.find((obj) => obj.item.recordtype === "service");
  return found || 0;
  // return props.products.find((obj) => obj.item.recordtype === "service")
  //   .grossprice;
});
</script>
