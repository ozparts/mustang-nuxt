<template>
  <div class="mx-auto md:!mx-0">
    <ul class="flex w-full flex-col text-[13px] sm:text-sm md:text-[15px]">
      <li v-for="singleInfo in info" class="flex w-full my-1">
        <div class="flex items-center justify-center">
          <Icon name="ph:dot-outline-fill" size="18px" />
        </div>

        <span class="ml-1"> {{ singleInfo }} </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getProductInfo } from "../../vars/productInfo";

const { part, productType, manufacturergroup } = defineProps([
  "part",
  "productType",
  "manufacturergroup",
]);

const info = getProductInfo(part, productType, manufacturergroup);
</script>
