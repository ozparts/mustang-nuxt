<template>
  <Head>
    <Title> Shipping options | Mustang Performance </Title>
    <Meta name="description" content="Shipping options" />
  </Head>
  <Banner title="Shipping options" />

  <section
    class="container mx-auto px-4 py-5 sm:py-10 sm:px-0 font-nunito sm:max-w-[540px] md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px] 2xl:max-w-[1440px]"
  >
    <ShippingOptionsEu v-if="userRegion === 'EU'" />
    <ShippingOptionsNl v-else-if="userRegion === 'NL'" />
  </section>
</template>

<script setup>
const store = useStore();

const userRegion = computed(() => {
  const name = store.userRegionData?.location.name;
  return name || "NL";
});
</script>
