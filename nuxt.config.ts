// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      title: "Mustang Performance",
      meta: [
        {
          name: "description",
          content: "",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content: "",
        },
      ],
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
  css: ["~/assets/main.css", "~/assets/css/tailwind.css"],

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "",
      secretKey: "",
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
    vuetifyOptions: {},
    moduleOptions: {
      styles: true,
      autoImport: false,
    },
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Open Sans": [400, 600, 700],
          Roboto: [100, 400, 600],
          Nunito: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          "Nunito Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
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
