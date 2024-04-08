<template>
  <hr />
  <footer>
    <section class="bg-gradient-to-t from-gray-300 to-white px-[15px]">
      <div
        class="flex flex-col flex-wrap px-[15px] py-20 mx-auto md:!items-center lg:!items-start md:!flex-row md:!flex-nowrap"
      >
        <div
          class="w-64 flex justify-center mx-auto text-center md:!mx-0 md:!text-left"
        >
          <nuxt-link to="/">
            <nuxt-img
              format="webp"
              alt="Mustang Performance logo"
              src="/mustang/mustang_logo.png"
              provider="cloudinary"
              width="200px"
            />
          </nuxt-link>
        </div>
        <div
          class="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:!pl-20 md:!mt-0 md:!text-left"
        >
          <div class="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2
              class="mb-3 text-sm font-bold tracking-wide uppercase font-nunito-sans"
            >
              Our Policies
            </h2>
            <nav class="mb-10 text-[15px] list-none font-nunito">
              <li>
                <nuxt-link
                  to="/privacy-policy"
                  class="daisy-link-hover daisy-link"
                  >Privacy Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  to="/cookie-policy"
                  class="daisy-link-hover daisy-link"
                  >Cookie Policy</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/terms" class="daisy-link-hover daisy-link"
                  >Terms&Conditions</nuxt-link
                >
              </li>
            </nav>
          </div>
          <div class="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2
              class="mb-3 text-sm font-bold tracking-wide uppercase font-nunito-sans"
            >
              useful links
            </h2>
            <nav class="mb-10 text-[15px] list-none font-nunito">
              <li>
                <nuxt-link to="/contact" class="daisy-link-hover daisy-link"
                  >Contact</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/shipping" class="daisy-link-hover daisy-link"
                  >Shipping options</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/warrianties" class="daisy-link-hover"
                  >Warranties</nuxt-link
                >
              </li>
            </nav>
          </div>
          <div class="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2
              class="mb-3 text-sm font-bold tracking-wide uppercase font-nunito-sans"
            >
              contact
            </h2>
            <nav class="mb-10 text-[15px] list-none font-nunito">
              <li>
                <p>OZPARTS PL sp. z o.o.</p>
              </li>
              <li>
                <p>ul. Mazowiecka 46-48, 87-100, Torun, Poland</p>
              </li>
              <li>
                <a href="mailto:info@ozparts.eu">info@ozparts.eu</a>
              </li>
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
  </footer>
</template>
