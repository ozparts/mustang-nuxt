<template>
  <section>
    <div class="flex items-center mb-5">
      <Icon name="mdi:truck-cargo-container" size="24px" color="#c22025" />
      <p class="ml-4 text-lg italic font-bold tracking-tighter sm:text-2xl">
        Select shipping method
      </p>
    </div>
    <div
      class="grid gap-4 mb-5 xs:grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-2 lg:grid-cols-3 px-4 sm:!px-0"
    >
      <div
        v-for="method in props.methods"
        :key="method._id"
        @click="$emit('setShippingMethod', method)"
      >
        <div
          class="cursor-pointer outline outline-2 hover:shadow-xl"
          :class="{
            'border-2 border-[#c22025] outline-none': props.id === method._id,
          }"
        >
          <div
            class="flex h-[150px] flex-wrap content-center items-center justify-center p-2"
          >
            <p class="mr-4 text-center">
              <Icon
                v-if="props.id === method._id"
                name="fa6-regular:circle-check"
                size="24px"
                color="#c22025"
              />
              <Icon v-else name="fa6-regular:circle" size="24px" />
            </p>

            <p>
              <Icon
                :name="selectIcon(method.name)"
                size="28px"
                :color="props.id === method._id ? '#c22025' : 'black'"
              />
            </p>
            <p class="w-full mt-3 text-xs text-center sm:text-sm">
              {{
                method.displayname === method.description
                  ? method.displayname
                  : `${method.displayname} - ${method.description}`
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["methods", "id"]);

const emits = defineEmits(["setShippingMethod"]);
const shippingIcons = [
  {
    name: "UPS",
    icon: "simple-icons:ups",
  },
  { name: "DPD", icon: "simple-icons:dpd" },
  {
    name: "INPOST",
    icon: "arcticons:inpost-mobile",
  },
];

const selectIcon = (text) => {
  const name = text.split(" ")[0].toUpperCase();
  const found = shippingIcons.find((obj) => obj.name === name);
  return found ? found.icon : "carbon:delivery-parcel";
};
</script>
