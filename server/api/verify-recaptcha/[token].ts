import { RECAPTCHA } from "./../../../vars/index";
export default defineEventHandler(async (event) => {
  const data = event.context.params;
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${
        RECAPTCHA.SECRET_KEY
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
