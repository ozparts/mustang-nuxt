<template>
  <div class="px-2 mx-auto mb-10 overflow-hidden">
    <div
      v-if="product.detaildescription"
      v-html="product.detaildescription"
      class="overview mx-auto px-3 py-5 font-nunito text-sm text-[#151515]"
    ></div>
    <ProductKitComponents
      v-if="
        product.components &&
        product.components.length &&
        product.manufacturergroup !== Manufacturers.XFORCE.id
      "
      :components="product.components"
      :base="product.name"
    />
  </div>
</template>

<script setup>
import { Manufacturers } from "../../vars/index";

const props = defineProps(["product"]);
</script>

<style scoped>
div:deep(.overview) {
  p > img {
    width: 90% !important;
    margin: 0 auto;
  }
  iframe {
    max-width: 90%;
    margin: 0 auto;
  }
  table > tbody > tr > td > img.icon {
    width: 30px !important;
    height: 30px !important;
  }

  /* whole table */

  table > tbody {
    display: flex;
    flex-direction: column;
  }

  /* header - row*/

  table > tbody > tr:nth-child(1) > td {
    background-color: #c22025;
    font-size: 10px;
    padding: 3px 0;
    width: 32% !important;
    text-align: center;
    color: white;
    font-weight: 400;
    border-radius: 0.5rem;
  }

  /* table rows  */
  table > tbody > tr {
    display: flex;
    justify-content: space-between;
  }

  table > tbody > tr:nth-child(2) > td:nth-child(1),
  table > tbody > tr:nth-child(5) > td:nth-child(1),
  table > tbody > tr:nth-child(7) > td:nth-child(1),
  table > tbody > tr:nth-child(8) > td:nth-child(1),
  table > tbody > tr:nth-child(9) > td:nth-child(1),
  table > tbody > tr:nth-child(11) > td:nth-child(1) {
    display: flex;
    flex-direction: column;
  }

  table > tbody > tr:nth-child(4),
  table > tbody > tr:nth-child(6),
  table > tbody > tr:nth-child(7),
  table > tbody > tr:nth-child(8),
  table > tbody > tr:nth-child(10),
  table > tbody > tr:nth-child(12) {
    border-bottom: 1px solid gray;
  }

  table > tbody > tr > td {
    margin: 1px;
    padding: 4px;
    font-size: 12px;
    flex-basis: 32% !important;
  }

  table > tbody > tr:nth-child(1) > td:nth-child(1) {
    justify-content: center;
  }

  table > tbody > tr:nth-child(3),
  tr:nth-child(4),
  tr:nth-child(6),
  tr:nth-child(10),
  tr:nth-child(12) {
    justify-content: flex-end;
    margin: 1px;
    gap: 1.3%;
  }
  table > tbody > tr:nth-child(3) > td,
  tr:nth-child(4) > td,
  tr:nth-child(6) > td,
  tr:nth-child(10) > td,
  tr:nth-child(12) > td {
    justify-content: flex-end;
    margin: 1px;
    width: 32% !important;
  }
  table > tbody > tr > td:nth-child(1) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  table > tbody > tr:nth-child(2) > td:nth-child(1),
  table > tbody > tr:nth-child(5) > td:nth-child(1),
  table > tbody > tr:nth-child(7) > td:nth-child(1),
  table > tbody > tr:nth-child(8) > td:nth-child(1),
  table > tbody > tr:nth-child(9) > td:nth-child(1),
  table > tbody > tr:nth-child(11) > td:nth-child(1) {
    text-align: center;
  }

  table > tbody > tr:nth-child(4) > td:nth-child(1),
  table > tbody > tr:nth-child(6) > td:nth-child(1),
  table > tbody > tr:nth-child(10) > td:nth-child(1) {
    text-align: start;
    align-self: flex-start;
  }
  @media (width >= 640px) {
    table > tbody > tr > td > img.icon {
      width: 50px !important;
      height: 50px !important;
      margin-bottom: 5px !important;
    }

    table > tbody > tr > td {
      font-size: 16px;
    }

    table > tbody > tr:nth-child(1) > td {
      font-size: 16px;
      padding: 12px 0;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
  }
}
</style>
