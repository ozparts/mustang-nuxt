<template>
  <div class="mx-auto mb-10 overflow-hidden">
    <div
      v-if="product.detaildescription"
      v-html="product.detaildescription"
      class="mx-auto py-5 font-nunito text-base text-[#151515]"
      :class="styleClass"
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

const { product } = defineProps(["product"]);

const styleClass = computed(() => {
  return {
    dba: `${product.manufacturergroup}` === `${Manufacturers.DBA.id}`,
    "dba-street":
      product.description.includes("Brake Pads Street") &&
      product.manufacturergroup === Manufacturers.DBA.id,
    "dba-xtreme":
      product.description.includes("Brake Pads Xtreme") &&
      product.manufacturergroup === Manufacturers.DBA.id,
    xtreme: product.manufacturergroup === Manufacturers.ACS.id,
    "xtreme-230mm-organic":
      product.manufacturergroup === Manufacturers.ACS.id &&
      product.description.includes("230mm Organic Twin"),
    "xtreme-230mm-carbon":
      product.manufacturergroup === Manufacturers.ACS.id &&
      product.description.includes("230mm Carbon Blade"),
    "xtreme-230mm-rigid":
      product.manufacturergroup === Manufacturers.ACS.id &&
      product.description.includes("230mm Rigid Ceramic"),
    "xtreme-270mm-organic":
      product.manufacturergroup === Manufacturers.ACS.id &&
      product.description.includes("270mm Organic Twin"),
    "xtreme-230mm-sprung":
      (product.manufacturergroup === Manufacturers.ACS.id &&
        product.description.includes("230mm Sprung Ceramic")) ||
      product.description.includes("230mm Sprung hub"),
    xforce: `${product.manufacturergroup}` === `${Manufacturers.XFORCE.id}`,
    whiteline:
      `${product.manufacturergroup}` === `${Manufacturers.WHITELINE.id}`,
    pedders: `${product.manufacturergroup}` === `${Manufacturers.PEDDERS.id}`,
    acl: `${product.manufacturergroup}` === `${Manufacturers.ACL.id}`,
  };
});
</script>

<style scoped>
div:deep(.dba-street) {
  @media (width <= 640px) {
    img + img {
      content: url("https://ozparts.eu/dba-street-performance-pads.jpg");
      width: 100%;
      margin-bottom: 16px;
      margin-top: 16px;
      max-height: 400px;
      float: none !important;
    }
  }
  @media (width > 640px) {
    img + img {
      content: url("https://ozparts.eu/dba-street-performance-pads.jpg");
      float: right !important;
      width: 80%;
      max-height: 400px;
    }
  }
}
div:deep(.dba-xtreme) {
  @media (width <= 640px) {
    p + img {
      content: url("https://ozparts.eu/dba-xtreme-performance-pads.png");
      width: 100%;
      margin-bottom: 16px;
      margin-top: 16px;
      max-height: 400px;
      float: none !important;
    }
  }
  @media (width > 640px) {
    p + img {
      content: url("https://ozparts.eu/dba-xtreme-performance-pads.png");
      float: right !important;
      width: 80%;
      max-height: 400px;
    }
  }
}
div:deep(.dba) {
  p {
    margin-bottom: 16px;
  }
  p > img {
    width: 90% !important;
    margin: 10px auto;
  }
  ul {
    list-style: disc;
    margin-top: 10px;
    padding-left: 20px;
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
    line-height: normal;
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
div:deep(.xtreme) {
  p {
    margin-bottom: 16px;
  }
  ul {
    list-style: disc;
    margin-top: 10px;
    padding-left: 20px;
  }
}
div:deep(.xtreme-230mm-organic),
div:deep(.xtreme-270mm-organic) {
  img {
    margin-top: 0 !important;
  }
}
div:deep(.xtreme-230mm-carbon) {
  table > tbody > tr > td > h1 {
    font-size: 16px !important;
  }
  table#xoverview > tbody > tr:nth-of-type(1) {
    display: none;
  }
  table#xoverview > tbody > tr:nth-of-type(2) > td:nth-of-type(1) {
    display: none;
  }
  table#xoverview > tbody > tr:nth-of-type(3) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  table#xoverview > tbody > tr:nth-of-type(3) > td:nth-of-type(2) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  table#xoverview > tbody > tr:nth-of-type(3) > td:nth-of-type(2) img {
    flex-basis: 40%;
    padding: 10px;
    margin: 0 auto;
  }
  table#xoverview > tbody > tr:nth-of-type(3) > td:nth-of-type(2) h3 {
    flex-basis: 100%;
    font-size: 20px;
    margin: 10px 0;
  }
  table#xoverview > tbody > tr:nth-of-type(3) > td:nth-of-type(2) ul > li {
    font-size: 16px;
  }
}
div:deep(.xtreme-230mm-rigid) {
  @media (width <= 640px) {
    b > div:nth-of-type(1) {
      flex-direction: column;
    }
    b > div:nth-of-type(1) > img {
      height: 150px !important;
      width: 150px !important;
      align-self: center;
    }

    b > div:nth-of-type(1) > div:nth-of-type(1) {
      width: 100% !important;
      flex-basis: 100% !important;
    }
    b > div:nth-of-type(1) > div:nth-of-type(2) > img {
      width: 50% !important;
      align-self: center;
    }
    b > div:nth-of-type(2) {
      flex-direction: column;
      margin: 10px 0;
    }
    b > div:nth-of-type(2) > div {
      margin: 10px auto;
      order: 1;
    }
    b > div:nth-of-type(2) > table {
      margin-top: 10px;
    }
  }
  @media (width > 640px) {
    b > div:nth-of-type(1) {
      align-items: center;
    }
    b > div:nth-of-type(1) > div:nth-of-type(1) {
      width: 50% !important;
    }
    b > div:nth-of-type(1) > img {
      width: 25% !important;
      max-height: 300px !important;
    }
    b > div:nth-of-type(1) > div:nth-of-type(2) > img {
      width: 50% !important;
      height: 300px;
    }
  }
}
div:deep(.xtreme-230mm-sprung) {
  b > div:nth-of-type(1) > div:nth-of-type(2) > img {
    width: 45% !important;
    margin: 10px auto;
  }
  @media (width <= 640px) {
    b > div:nth-of-type(1) {
      flex-direction: column;
    }
  }
}
div:deep(.xforce) {
  ul {
    list-style: disc;
    margin-top: 10px;
    padding-left: 20px;
  }
  iframe {
    max-width: 90%;
    margin: 0 auto;
  }
}
div:deep(.pedders) {
  ul {
    list-style: disc;
    margin: 10px 0;
    padding-left: 20px;
  }
  p,
  h2,
  h3 {
    margin-bottom: 16px;
  }
  h2,
  h3 {
    font-weight: bold;
  }
  iframe {
    max-width: 90%;
    margin: 0 auto;
  }
}
div:deep(.acl) {
  ul {
    list-style: disc;
    margin: 10px 0;
    padding-left: 20px;
  }
  p,
  h2,
  h3 {
    margin-bottom: 16px;
  }
  h2,
  h3 {
    font-weight: bold;
  }
}
</style>
