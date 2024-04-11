<template>
  <Banner title="Warranties" />

  <section
    class="container text-sm sm:text-base mx-auto px-4 py-5 sm:py-10 sm:px-0 font-nunito sm:max-w-[540px] md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px] 2xl:max-w-[1440px]"
  >
    <p class="mb-4">
      If you would like to make a warranty claim on any item bought via this
      site please simply choose brand of the product (from the list below) which
      you wish to make a claim for and fill up the warranty claim form online.
      Please note all fields must be filled up and pictures needs to be added.
      Once form is complete please submit it. Warranty claim will be
      automatically sent to us. Upon receiving your claim, we will send you a
      claim number and at the same time it will be passed to the manufacturer
      who will make a decision on it. If claim is approved credit note or
      replacement part FOC will be provided.
    </p>
    <div class="flex flex-col gap-4 text-[#ed3730]">
      <nuxt-link
        to="https://ozparts.eu/warranty/ACL/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - ACL</nuxt-link
      >
      <nuxt-link
        to="https://ozparts.eu/warranty/ACS/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - Australian Clutch Services</nuxt-link
      >
      <nuxt-link
        to="https://ozparts.eu/warranty/DBA/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - Disc Brakes Australia</nuxt-link
      >
      <nuxt-link
        to="https://ozparts.eu/warranty/HAWK/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - Hawk Performance</nuxt-link
      >
      <nuxt-link
        to="https://ozparts.eu/warranty/TURBOSMART/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - Turbosmart</nuxt-link
      >
      <nuxt-link
        to="https://ozparts.eu/warranty/PEDDERS/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - Pedders Suspension</nuxt-link
      >
      <nuxt-link
        to="https://ozparts.eu/warranty/WHITELINE/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - Whiteline</nuxt-link
      >
      <nuxt-link
        to="https://ozparts.eu/warranty/XFORCE/"
        target="_blank"
        class="hover:underline"
        >Warranty Form - Xforce</nuxt-link
      >
    </div>
  </section>
</template>

<script setup></script>
