<template>
  <div class="h-full px-2 py-5 overflow-x-auto">
    <table class="daisy-table font-nunito">
      <thead class="text-xs text-black sm:text-sm">
        <tr>
          <th class="hidden sm:inline-block">Make</th>
          <th class="hidden xl:inline-block">Model</th>
          <th class="p-2 sm:px-4 sm:py-3">Variant</th>
          <th class="hidden sm:inline-block">Category</th>
          <th class="p-2 sm:px-4 sm:py-3">Bodytype</th>
          <th class="p-2 sm:px-4 sm:py-3">Year</th>
          <th class="hidden sm:inline-block">Details</th>
        </tr>
      </thead>
      <tbody class="text-xs sm:text-[13px]">
        <tr
          v-for="application in results"
          className="daisy-hover cursor-pointer"
          @click="
            () =>
              navigateTo(
                `/catalogue/${application.variant.split(' |')[0]}/?variant=${
                  application.variant
                }`
              )
          "
        >
          <td class="hidden sm:inline-block">{{ application.make }}</td>
          <td class="hidden xl:inline-block">{{ application.model }}</td>
          <td class="p-2 sm:px-4 sm:py-3">
            {{ fixVariant(application.variant) }}
          </td>
          <td class="hidden sm:inline-block">
            {{ application.categorydescription }}
          </td>
          <td class="p-2 sm:px-4 sm:py-3">{{ application.bodytype }}</td>
          <td class="p-2 sm:px-4 sm:py-3">{{ application.year }}</td>
          <td class="hidden sm:inline-block">{{ application.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const store = useStore();
const customerCountry = store.getCustomerCountry();
const { results } = await useGetApplications(
  true,
  customerCountry.code,
  props.id
);

const fixVariant = computed(() => (variant) => {
  return variant.split(" | ").slice(0, 2).join(" | ");
});

const props = defineProps({
  id: String,
});
</script>
