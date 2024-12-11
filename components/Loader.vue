<template>
  <div class="loader-wrapper">
    <img
      src="./../assets/loader.png"
      alt="Mustang Performance"
      class="p-1 loader"
    />
  </div>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px 0;

  .loader {
    width: 60px;
    height: 60px;
    animation: preload 2s linear;
  }

  @keyframes preload {
    0% {
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
