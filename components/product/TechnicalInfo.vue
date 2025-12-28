<template>
  <section class="px-2 py-5">
    <table
      v-if="
        !kitItem.isKitItem ||
        product.manufacturergroup === Manufacturers.XFORCE.id
      "
      class="daisy-table daisy-table-xs sm:daisy-table"
    >
      <thead>
        <tr
          class="text-base text-center text-black font-nunito-sans sm:text-xl"
        >
          <th colspan="2">TECHNICAL INFORMATION</th>
        </tr>
      </thead>
      <tbody class="text-xs font-nunito-sans">
        <tr v-for="detail in product.technicaldetails">
          <td class="text-xs sm:text-sm">{{ detail.name }}</td>
          <td
            v-if="detail.name === 'Tech Bulletins'"
            class="text-xs text-red-500 border-gray-200 sm:text-sm"
          >
            <div v-html="detail.value" class="text-xs sm:text-sm"></div>
          </td>
          <td v-else class="text-xs sm:text-sm">
            {{ detail.value }}
          </td>
        </tr>
        <tr>
          <td class="text-xs sm:text-sm">Weight [KG]</td>
          <td class="text-xs sm:text-sm">{{ Number(weight).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <div
        class="grid items-start gap-2 auto-cols-fr auto-rows-auto"
        :class="
          props.kitItem.components.length > 3
            ? 'sm:grid-cols-3'
            : 'sm:grid-flow-col'
        "
      >
        <table
          v-for="technicalInfo in kitComponents"
          class="daisy-table daisy-table-xs sm:daisy-table"
        >
          <thead>
            <tr
              class="text-base text-center text-black font-nunito-sans sm:text-xl"
            >
              <th colspan="2">{{ technicalInfo.name }}</th>
            </tr>
          </thead>
          <tbody class="text-xs font-nunito-sans">
            <tr v-for="detail in technicalInfo">
              <td v-if="detail.name" class="text-xs sm:text-sm">
                {{ detail.name }}
              </td>
              <td
                v-if="detail.name === 'Tech Bulletins'"
                class="text-xs text-red-500 border-gray-200 sm:text-sm"
              >
                <div v-html="detail.value" class="text-xs sm:text-sm"></div>
              </td>
              <td
                v-else-if="detail.name !== 'Tech Bulletins' && detail.name"
                class="text-xs sm:text-sm"
              >
                {{ detail.value }}
              </td>
            </tr>
            <tr>
              <td class="text-xs sm:text-sm">Weight [KG]</td>
              <td class="text-xs sm:text-sm">
                {{ technicalInfo.weight }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { TechnicalDetail, GetItemResponse } from "~/types/api";
import { Manufacturers } from "../../vars/index";

interface Props {
  product: GetItemResponse;
  weight: number;
  kitItem: KitItem;
}

interface KitItem {
  isKitItem: boolean;
  components: number[];
}

interface KitComponentTechnicalInfo {
  name: string;
  weight: number;
  technicaldetails: TechnicalDetail[];
  [key: string]: any;
}

const props = defineProps<Props>();

const { country } = useCountry();

const kitComponents = ref<KitComponentTechnicalInfo[]>([]);

onMounted(() => {
  if (props.kitItem.isKitItem) {
    props.kitItem.components.map(async (record) => {
      const { data, error } = await useGetItem({
        record: String(record),
        country: country.value,
      });

      if (error) {
        console.error("Failed to get kit component details:", error);
        return;
      }

      if (!data) {
        console.error("Kit component not found");
        return;
      }

      const componentData: KitComponentTechnicalInfo = {
        name: data.name,
        weight: data.weight,
        technicaldetails: data.technicaldetails,
        ...data.technicaldetails,
      };

      kitComponents.value.push(componentData);
    });
  }
});
</script>
