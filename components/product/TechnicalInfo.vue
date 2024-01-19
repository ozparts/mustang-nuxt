<template>
  <section class="px-2 py-5">
    <table
      v-if="!kitItem.isKitItem"
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
        <tr v-for="detail in technicalInfo">
          <td class="text-xs sm:text-sm">
            {{ detail.name }}
          </td>
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
          v-for="technicalInfo in state.kitComponents"
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

<script setup>
const props = defineProps(["technicalInfo", "weight", "kitItem"]);

const state = reactive({
  kitComponents: [],
});

onMounted(() => {
  if (props.kitItem.isKitItem) {
    props.kitItem.components.map(async (obj) => {
      const data = await useGetItem(obj);

      state.kitComponents.push({
        ...data.technicaldetails,
        name: data.name,
        weight: data.weight,
      });
    });
  }
});
</script>
