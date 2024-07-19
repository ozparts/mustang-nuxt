// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      title: "Quality parts for Ford Mustang | Mustang Performance",
      meta: [
        {
          name: "description",
          content:
            "Get the best deals on car parts for Ford Mustang. Shop from our easy to order selection of Disc Brakes, Clutches, Exhaust systems, Suspensions and Engine bearings",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content:
            "Mustang Performance, Ford Mustang, car parts, Disc Brakes, Clutches, Exhaust systems, Suspension parts, Engine bearings, DBA, Pedders, Whiteline, ACL, XForce, Xtreme, Hawk, Turbosmart, Car parts online, Quality auto parts",
        },
      ],
      script: [
        {
          src: `/gtm.js`,
          defer: true,
        },
      ],
      // noscript: [
      //   {
      //     children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWZSWWQV"
      //     height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      //   },
      // ],
    },
  },

  devtools: { enabled: true },
  ssr: true,
  image: {
    domains: ["res.cloudinary.com", "3cerp.eu"],
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dxrwmbpxl/image/upload/",
    },
    providers: {
      myProvider: {
        name: "3c",
        provider: "~/providers/my-provider.ts",
        options: {
          baseURL: "",
        },
      },
    },
    format: ["webp", "jpeg", "jpg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
  alias: {
    // "@": resolve(__dirname, "/"),
  },
  css: [
    "~/assets/main.css",
    "~/assets/css/tailwind.css",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "",
    // Keys within public are also exposed client-side
    public: {
      paypal_EU:
        process.env.NUXT_ENV_PAYPAL_TOKEN_EU ||
        process.env.LOCAL_PAYPAL_TOKEN_EU,
      paypal_PL:
        process.env.NUXT_ENV_PAYPAL_TOKEN_PL ||
        process.env.LOCAL_PAYPAL_TOKEN_PL,
      recaptcha_site_key:
        process.env.NUXT_ENV_RECAPTCHA_SITE_KEY ||
        process.env.LOCAL_RECAPTCHA_SITE_KEY,
      recaptcha_secret_key:
        process.env.NUXT_ENV_RECAPTCHA_SECRET_KEY ||
        process.env.LOCAL_RECAPTCHA_SECRET_KEY,
    },
  },
  tailwindcss: {
    exposeConfig: true,
    configPath: "tailwind.config",
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  imports: {
    dirs: ["./store"],
  },
  postcss: {
    plugins: {
      "tailwindcss/nesting": "postcss-nesting",
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vuetify: {
    moduleOptions: {
      useIconCDN: false,
      styles: true,
      autoImport: false,
      treeshaking: true,
    },
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: [400, 600],
          Nunito: [400, 600, 700],
          "Nunito Sans": [400],
        },
      },
    ],
    "@invictus.codes/nuxt-vuetify",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-swiper",
    "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
  ],
});
