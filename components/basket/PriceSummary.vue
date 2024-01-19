<template>
  <section class="flex justify-end mb-10 font-nunito text-mustangRed">
    <div class="flex flex-col gap-1 text-sm font-bold sm:text-xl">
      <div class="flex justify-between">
        <p>Subtotal:</p>
        <p>{{ currency }} {{ summary.amount }}</p>
      </div>
      <div class="flex justify-between border-b-2 border-mustangRed">
        <p>Total tax:</p>
        <p>{{ currency }} {{ summary.taxamount }}</p>
      </div>
      <div class="flex justify-between gap-10">
        <p>Total price:</p>
        <p>{{ currency }} {{ summary.grossamount }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const { summary, currency } = defineProps(["summary", "currency"]);
</script>
