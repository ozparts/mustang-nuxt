<template>
  <section>
    <div class="flex items-center mb-5">
      <Icon name="ic:round-payments" size="24px" color="#c22025" />
      <p class="ml-4 text-lg italic font-bold tracking-tighter sm:text-2xl">
        Select payment method
      </p>
    </div>
    <div
      class="grid gap-4 mb-5 xs:grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-2 lg:grid-cols-3 px-4 sm:!px-0"
    >
      <div
        v-for="method in props.methods"
        :key="method._id"
        @click="$emit('setPaymentMethod', method)"
      >
        <div
          class="cursor-pointer outline outline-2 hover:shadow-xl"
          :class="{
            'border-2 border-[#c22025] outline-none': props.id === method._id,
          }"
        >
          <div
            class="w-max-[200px] flex h-[150px] flex-wrap content-center items-center justify-center p-2"
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
                :name="selectIcon(method._id)"
                size="28px"
                :color="props.id === method._id ? '#c22025' : 'black'"
              />
            </p>
            <p class="w-full mt-3 text-xs text-center sm:text-sm">
              {{ method.displayname || method.displayname }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["methods", "id"]);
const emits = defineEmits(["setPaymentMethod"]);

const paymentIcons = [
  {
    id: "5e0dbaba9e33df43f0b3a482",
    icon: "icon-park-outline:bank-transfer",
  },
  { id: "revolut", icon: "simple-icons:revolut" },
  {
    id: "607468324e5b797a767fe87d",
    icon: "mdi:paypal",
  },
  {
    id: "60d59f30ae244c2314019631",
    icon: "simple-icons:revolut",
  },
];

const selectIcon = (id) => {
  const found = paymentIcons.find((obj) => obj.id === id);
  return found ? found.icon : "fluent:payment-32-regular";
};
</script>
