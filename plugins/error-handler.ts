export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (error, instance, info) => {
    const err = error as { message: string };
    const code = err.message === "Item is no longer available" ? 404 : 500;
    showError({
      statusCode: code,
      statusMessage: err.message,
    });
  });
});
