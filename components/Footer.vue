<template>
  <section class="bg-gradient-to-t from-gray-300 to-white px-[15px]">
    <div
      class="container mx-auto flex flex-col flex-wrap px-[15px] pb-4 pt-10 md:!items-start md:!flex-row md:!flex-nowrap sm:max-w-[540px] md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px]"
    >
      <div
        class="w-64 flex flex-col items-center mx-auto text-center md:!mx-0 md:!items-start md:!text-left"
      >
        <nuxt-link to="/">
          <NuxtImg
            class="h-[70px]"
            alt="Mustang Performance logo"
            loading="lazy"
            src="/mustang-performance-logo.webp"
            width="200px"
          />
        </nuxt-link>
      </div>
      <div
        class="grid flex-grow grid-cols-1 gap-6 mt-6 text-center sm:grid-cols-3 md:!pl-16 md:!mt-0 md:!text-left"
      >
        <div>
          <div
            class="mb-2 text-sm font-bold tracking-wide uppercase font-nunito-sans"
          >
            Our Policies
          </div>
          <nav class="text-[15px] list-none font-nunito">
            <ul>
              <li>
                <nuxt-link
                  to="/privacy-policy"
                  class="py-1.5 md:!py-0.5 daisy-link-hover daisy-link block"
                  >Privacy Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/cookie-policy"
                  class="py-1.5 md:!py-0.5 daisy-link-hover daisy-link block"
                  >Cookie Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/terms"
                  class="py-1.5 md:!py-0.5 daisy-link-hover daisy-link block gtm_btn_termsandconditions"
                  >Terms&Conditions</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div
            class="mb-2 text-sm font-bold tracking-wide uppercase font-nunito-sans"
          >
            useful links
          </div>
          <nav class="text-[15px] list-none font-nunito">
            <ul>
              <li>
                <nuxt-link
                  @click="openCookieSettings"
                  class="py-1.5 md:!py-0.5 daisy-link-hover daisy-link block gtm_btn_contactus"
                  >Cookies manager</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/shipping"
                  class="py-1.5 block md:!py-0.5 daisy-link-hover daisy-link gtm_btn_shippingoptions"
                  >Shipping options</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/warranties"
                  class="py-1.5 block md:!py-0.5 daisy-link-hover"
                  >Warranties</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div
            class="mb-2 text-sm font-bold tracking-wide uppercase font-nunito-sans"
          >
            contact
          </div>
          <nav class="text-[15px] list-none font-nunito">
            <ul>
              <li>
                <nuxt-link
                  to="/become-our-distributor"
                  class="py-1.5 md:!py-0.5 daisy-link-hover daisy-link block gtm_btn_contactus"
                  >Become our distributor</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/contact-us"
                  class="py-1.5 md:!py-0.5 daisy-link-hover daisy-link block gtm_btn_generalenquiries"
                  >Contact us</nuxt-link
                >
              </li>
              <li v-if="currentRegionData === 'EU'">
                <a
                  class="py-1.5 block md:!py-0.5 daisy-link-hover daisy-link"
                  href="mailto:info@ozparts.eu"
                  >info@ozparts.eu</a
                >
              </li>
              <li v-if="currentRegionData === 'UK'">
                <a
                  class="py-1.5 block md:!py-0.5 daisy-link-hover daisy-link"
                  href="tel:01296711044"
                  >Tel: 01296711044</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div
      class="container mx-auto px-[15px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px]"
    >
      <div class="m-0 daisy-divider"></div>
    </div>

    <div
      class="container mx-auto px-[15px] pb-3 font-nunito-sans sm:max-w-[540px] md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px]"
    >
      <p class="text-sm text-center text-gray-500">
        OZPARTS PL sp. z o.o. © 2023 for website design and development | All
        Rights Reserved
      </p>
    </div>
  </section>
</template>

<script setup>
import { WAREHOUSE_LOCATION } from "./../vars/index";
const store = useStore();

const currentRegionData = computed(() => {
  const locationId = store.userRegionData?.location?._id;
  return locationId ? findWarehouseById(locationId) : null;
});

const findWarehouseById = (value) => {
  return Object.keys(WAREHOUSE_LOCATION).find(
    (key) => WAREHOUSE_LOCATION[key] === value,
  );
};

const openCookieSettings = () => {
  cookie.showModal();
};
</script>
