import { checkUserCountry } from "ozparts-client";

export default defineNuxtPlugin(async () => {
  const { setCountry } = useCountry();

  try {
    const country = await checkUserCountry(true);
    if (country) {
      setCountry(country);
    }
  } catch (error) {
    console.error("Failed to detect user country:", error);
  }
});
