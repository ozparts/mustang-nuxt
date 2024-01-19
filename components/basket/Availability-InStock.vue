<template>
  <div>
    <div
      class="flex items-center gap-1 text-left font-nunito text-xs lg:text-sm"
    >
      <div class="flex gap-1">
        <span class="flex items-start" v-if="props.inTransit">
          <Icon name="mdi:airplane-clock" color="#38C659" size="18px" />
        </span>

        <span v-else class="flex items-start">
          <Icon name="ic:sharp-check" color="#38C659" size="18px" />
        </span>
        <p>
          {{
            props.inTransit
              ? "Product available in 3 weeks"
              : "Available and ready to ship (2-4 days to deliver)"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["inTransit"]);
</script>
