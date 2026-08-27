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
        <b class="block mb-1 text-base">Ozparts Uk Ltd</b>
        Ricketts Close,<br />
        Firs Industrial Estate, Kidderminster<br />
        DY11 7QN, United Kingdom<br />
        Tax number: 365077679<br />
        Company number: 12945327
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
        <b class="block mb-1 text-base">Ozparts UK Ltd</b>
        Ricketts Close,<br />
        Firs Industrial Estate, Kidderminster,<br />
        DY11 7QN, UK<br />
        Tel: 01296 711044
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
        The office is opened between 7:00 – 15:00 (CEST/CET), Mo-Fr.
        <br />
        <br />
        After submitting your inquiry, we endeavour to contact you back within
        48 hours
      </p>
    </div>
  </div>
</template>
