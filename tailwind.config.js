// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./nuxt.config.{js,ts}",
  ],

  darkMode: "media", // or 'media' or 'class'
  plugins: [require("tailwindcss-debug-screens"), require("daisyui")],
  theme: {
    screens: {
      xs: "412px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    debugScreens: {
      prefix: "screen: ",
    },
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        "nunito-sans": ["Nunito Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      colors: {
        mustangSilver: "#c0c0c0",
        mustangYellow: "#F6EF46",
        mustangRed: "#c22025",
        mustangBlue: "#0052a5",
        mustangLightGrey: "#EDEDED",
        mustangGrey: "#C0C0C0",
      },
    },
  },
  variants: {
    extend: {},
  },

  daisyui: {
    styled: true,
    prefix: "daisy-",
    themes: [
      {
        mytheme: {
          primary: "#c22025",

          secondary: "#f000b8",

          accent: "#1dcdbc",

          neutral: "#2b3440",

          "base-100": "#ffffff",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
};
