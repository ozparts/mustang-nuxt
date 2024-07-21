<template>
  <hr />
  <section class="bg-gradient-to-t from-gray-300 to-white px-[15px]">
    <div
      class="flex flex-col flex-wrap px-[15px] py-20 mx-auto md:!items-center lg:!items-start md:!flex-row md:!flex-nowrap"
    >
      <div
        class="w-64 flex justify-center mx-auto text-center md:!mx-0 md:!text-left"
      >
        <nuxt-link to="/">
          <NuxtImg
            alt="Mustang Performance logo"
            loading="lazy"
            src="/mustang_logo.webp"
            width="200px"
          />
        </nuxt-link>
      </div>
      <div
        class="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:!pl-20 md:!mt-0 md:!text-left"
      >
        <div class="w-full px-4 lg:w-1/3 md:w-1/2">
          <div
            class="mb-3 text-sm font-bold tracking-wide uppercase font-nunito-sans"
          >
            Our Policies
          </div>
          <nav class="mb-10 text-[15px] list-none font-nunito h-full">
            <ul>
              <li>
                <nuxt-link
                  to="/privacy-policy"
                  class="py-2.5 md:!py-0 daisy-link-hover daisy-link block"
                  >Privacy Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/cookie-policy"
                  class="py-2.5 md:!py-0 daisy-link-hover daisy-link block"
                  >Cookie Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/terms"
                  class="py-2.5 md:!py-0 daisy-link-hover daisy-link block"
                  >Terms&Conditions</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="w-full px-4 lg:w-1/3 md:w-1/2">
          <div
            class="mb-3 text-sm font-bold tracking-wide uppercase font-nunito-sans"
          >
            useful links
          </div>
          <nav class="mb-10 text-[15px] list-none font-nunito">
            <ul>
              <li>
                <nuxt-link
                  to="/contact"
                  class="py-2.5 md:!py-0 daisy-link-hover daisy-link block"
                  >Contact</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/shipping"
                  class="py-2.5 block md:!py-0 daisy-link-hover daisy-link"
                  >Shipping options</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/warranties"
                  class="py-2.5 block md:!py-0 daisy-link-hover"
                  >Warranties</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="w-full px-4 lg:w-1/3 md:w-1/2">
          <div
            class="mb-3 text-sm font-bold tracking-wide uppercase font-nunito-sans"
          >
            contact
          </div>
          <nav class="mb-10 text-[15px] list-none font-nunito">
            <ul>
              <li>
                <p class="py-2 md:!py-0">OZPARTS PL sp. z o.o.</p>
              </li>
              <li>
                <p class="py-2 md:!py-0">
                  ul. Mazowiecka 46-48, 87-100, Torun, Poland
                </p>
              </li>
              <li>
                <a class="py-2 md:!py-0" href="mailto:info@ozparts.eu"
                  >info@ozparts.eu</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="py-4 font-nunito-sans">
      <p class="text-sm text-center text-gray-500">
        OZPARTS PL sp. z o.o. © 2023 for website design and development | All
        Rights Reserved
      </p>
    </div>
  </section>
</template>
