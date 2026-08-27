<template>
  <section
    class="container mx-auto px-4 py-5 font-roboto sm:max-w-[540px] sm:py-8 md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px] 2xl:max-w-[1440px]"
  >
    <template v-if="store.userRegionData?.location">
      <div
        class="my-0 mb-4 text-xs font-bold tracking-wide uppercase daisy-divider daisy-divider-start text-base-content/60"
      >
        Our offices
      </div>
      <ContactAddressEu v-if="currentRegionData === 'EU'" />
      <ContactAddressNl v-if="currentRegionData === 'NL'" />
      <ContactAddressUk v-if="currentRegionData === 'UK'" />
    </template>
  </section>
</template>

<script setup>
import { WAREHOUSE_LOCATION } from "./../../vars/index";
const store = useStore();

const currentRegionData = computed(() => {
  const locationId = store.userRegionData.location._id;
  return findWarehouseById(locationId);
});

const findWarehouseById = (value) => {
  return Object.keys(WAREHOUSE_LOCATION).find(
    (key) => WAREHOUSE_LOCATION[key] === value
  );
};
</script>

<style lang="scss" scoped></style>
