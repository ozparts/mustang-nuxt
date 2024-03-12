<template>
  <div
    class="p-5 text-sm font-semibold uppercase border-b-[1px] border-mustangRed sm:text-base"
  >
    <div class="mb-2.5 flex justify-between">
      <p>subtotal</p>
      <p>{{ currency }} {{ summary.amount }}</p>
    </div>
    <div class="mb-2.5 flex justify-between">
      <p>total tax</p>
      <p>{{ currency }} {{ summary.taxamount }}</p>
    </div>
    <div class="flex justify-between">
      <p>shipping</p>
      <p>{{ currency }} {{ summary.shippingcost }}</p>
    </div>

    <p
      v-if="backOrderInfo"
      class="pt-4 text-[11px] font-semibold leading-tight"
    >
      *As at least one of products has prolonged delivery time, the whole order
      will be delivered when completed.
    </p>
  </div>
  <div
    class="flex flex-wrap justify-between p-5 text-lg font-bold uppercase sm:text-xl"
  >
    <p>total</p>
    <p>{{ currency }} {{ summary.grossamount }}</p>
    <small
      v-if="discount"
      class="text-sm text-right text-[#ff0000] basis-full normal-case"
    >
      Incl. {{ Math.abs(Number(discount)) * 100 }}% discount</small
    >
  </div>
</template>

<script setup>
const props = defineProps(["summary", "currency", "backOrderInfo", "discount"]);
</script>
