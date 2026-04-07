<template>
  <div class="font-nunito">
    <h3 class="pb-1 text-2xl">Contents of Kit {{ base }}</h3>
    <ul>
      <li
        v-for="item in components"
        :key="item.id"
        class="text-lg daisy-link daisy-link-hover daisy-link-error"
      >
        <nuxt-link :to="'/product/' + item.urlcomponent" target="_blank">
          {{ item.quantity }} x {{ item.name }} - {{ item.description }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { components, base } = defineProps(["components", "base"]);
</script>
