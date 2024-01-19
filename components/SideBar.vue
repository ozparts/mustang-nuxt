<template>
  <div class="flex items-center justify-center">
    <div class="daisy-drawer">
      <input
        id="my-drawer"
        type="checkbox"
        v-model="sideBar"
        class="daisy-drawer-toggle"
      />
      <div class="daisy-drawer-content">
        <label
          for="my-drawer"
          class="flex items-end p-0 m-0 bg-white border-none daisy-btn daisy-drawer-button hover:bg-transparent"
          ><Icon name="quill:hamburger" size="26px"
        /></label>
      </div>
      <div class="daisy-drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="daisy-drawer-overlay"
        ></label>
        <ul
          class="daisy-menu absolute z-50 min-h-full w-[70%] bg-base-200 p-4 font-nunito uppercase text-base-content"
        >
          <li @click="toogleBar">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li @click="toogleBar">
            <nuxt-link to="/catalogue">Catalogue</nuxt-link>
          </li>
          <li @click="toogleBar">
            <nuxt-link to="/brands">Our brands</nuxt-link>
          </li>
          <li @click="toogleBar">
            <nuxt-link to="/contact">Contact</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const sideBar = ref(false);
const toogleBar = () => {
  sideBar.value = false;
};
</script>
