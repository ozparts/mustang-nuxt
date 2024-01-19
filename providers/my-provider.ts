// import { joinURL } from "ufo";
// import type { ProviderGetImage } from "@nuxt/image";
// import { createOperationsGenerator } from "#image";

// const operationsGenerator = createOperationsGenerator();

// export const getImage: ProviderGetImage = (
//   src,
//   { modifiers = {}, baseURL } = {}
// ) => {
//   if (!baseURL) {
//     // also support runtime config
//     baseURL = useRuntimeConfig().public.siteUrl;
//   }

//   const operations = operationsGenerator(modifiers);

//   return {
//     url: joinURL(baseURL, src + (operations ? "?" + operations : "")),
//   };
// };

import { joinURL, encodePath, encodeParam } from "ufo";
import type { ProviderGetImage } from "./types";
import { createOperationsGenerator } from "#image";

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b",
  },
  joinWith: "&",
  formatter: (key: string, val: string) =>
    encodeParam(key) + "_" + encodeParam(val),
});

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL } = {},
  ctx
) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }

  const params = operationsGenerator(modifiers) || "_";

  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src)),
  };
};
