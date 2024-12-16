<template>
  <div class="px-4 py-5">
    <template v-if="store.userRegionData?.location">
      <ContactAddressEu v-if="currentRegionData === 'EU'" />
      <ContactAddressNl v-if="currentRegionData === 'NL'" />
      <ContactAddressUk v-if="currentRegionData === 'UK'" />
    </template>
  </div>
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
