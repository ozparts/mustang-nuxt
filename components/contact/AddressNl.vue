<template>
  <div class="grid grid-cols-1 gap-4 py-2 font-nunito-sans md:grid-cols-4">
    <div
      class="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div class="flex items-center gap-2 mb-1">
        <Icon
          name="solar:document-text-outline"
          size="18px"
          class="shrink-0 text-mustangRed"
        />
        <p class="text-xs font-bold tracking-wide uppercase text-base-content/70">
          Registered office
        </p>
      </div>
      <p class="mb-3 text-xs text-base-content/50">(billing purposes)</p>
      <p class="text-sm leading-relaxed">
        <b class="block mb-1 text-base">Ozparts B.V.</b>
        Weena 690,<br />
        3012CN Rotterdam, Netherlands<br />
        VAT: NL.8663.35.791B01
      </p>
    </div>

    <div
      class="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div class="flex items-center gap-2 mb-1">
        <Icon
          name="solar:buildings-2-outline"
          size="18px"
          class="shrink-0 text-mustangRed"
        />
        <p class="text-xs font-bold tracking-wide uppercase text-base-content/70">
          Office & warehouse
        </p>
      </div>
      <p class="mb-3 invisible text-xs">_</p>
      <p class="text-sm leading-relaxed">
        <b class="block mb-1 text-base">Ozparts B.V.</b>
        Geloërveld, Blauwwater 15D,<br />
        5951 DB Belfeld, Netherlands
      </p>
    </div>

    <div
      class="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-shadow hover:shadow-md md:col-span-2"
    >
      <div class="flex items-center gap-2 mb-1">
        <Icon
          name="solar:clock-circle-outline"
          size="18px"
          class="shrink-0 text-mustangRed"
        />
        <p class="text-xs font-bold tracking-wide uppercase text-base-content/70">
          Opening hours
        </p>
      </div>
      <p class="mb-3 invisible text-xs">_</p>
      <p class="text-sm leading-relaxed">
        The office is opened between 8:00 – 16:00 (CEST/CET), Mo-Fr.
        <br />
        <br />
        After submitting your inquiry, we endeavour to contact you back within
        48 hours
      </p>
    </div>
  </div>
</template>
