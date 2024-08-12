export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig();
  const data = event.context.params;
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${
        cfg.public.recaptchaSecretKey
      }&response=${data !== undefined ? data.token : null}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return await response.json();
  } catch (e) {
    console.log(e);
  }
  return;
});
