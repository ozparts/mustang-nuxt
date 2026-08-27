<script setup lang="ts"></script>

<template>
  <Head>
    <Title> Become Our Distributor | Mustang Performance </Title>
    <Meta name="description" content="Become Our Distributor" />
  </Head>
  <Banner title="become our distributor" />
  <ContactAddresses />

  <section
    class="container mx-auto px-4 pt-5 font-roboto sm:max-w-[540px] sm:px-5 sm:pt-8 md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px] 2xl:max-w-[1440px]"
  >
    <div
      class="my-0 mb-6 text-xs font-bold tracking-wide uppercase daisy-divider daisy-divider-start text-base-content/60"
    >
      Dealer enquiry form
    </div>
  </section>

  <div
    class="container mx-auto grid grid-cols-1 gap-6 px-4 pb-5 font-roboto sm:max-w-[540px] sm:px-5 sm:pb-8 md:max-w-[720px] lg:max-w-[980px] lg:grid-cols-3 lg:items-start xl:max-w-[1140px] 2xl:max-w-[1440px]"
  >
    <section class="lg:col-span-1">
      <div
        class="mx-auto max-w-[760px] rounded-2xl border border-base-300 bg-base-100 p-5 font-nunito shadow-sm sm:p-8"
      >
        <p class="text-sm text-base-content/80 sm:text-base">
          Interested in stocking or selling our Mustang performance parts? Fill
          in the form below with your business and billing details and our team
          will get back to you.
        </p>

        <ul class="mt-4 space-y-2 text-sm text-base-content/80 sm:text-base">
          <li class="flex items-start gap-2">
            <Icon
              name="carbon:checkmark"
              class="mt-0.5 shrink-0 text-mustangRed"
              size="16px"
            />
            Have your company name, VAT number and billing address ready
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="carbon:checkmark"
              class="mt-0.5 shrink-0 text-mustangRed"
              size="16px"
            />
            The optional section helps us match you with the right terms
          </li>
          <li class="flex items-start gap-2">
            <Icon
              name="carbon:checkmark"
              class="mt-0.5 shrink-0 text-mustangRed"
              size="16px"
            />
            We endeavour to respond within 48 hours
          </li>
        </ul>
      </div>
    </section>

    <FormDealerEnquiry class="lg:col-span-2" />
  </div>
</template>
