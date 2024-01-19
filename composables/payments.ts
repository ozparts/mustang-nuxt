import { HTTP_URL } from "../vars/index";

export const useRevolut = async (url: string, data: {}) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      return data.public_id;
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useSetPaymentStatus = async (transaction_id: string) => {
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "setPaymentStatus",
        transaction_id,
        customer: "guest",
      }),
    });
    return res.status === 200 ? res.status : console.log(res);
  } catch (e) {
    console.log(e);
  }
};
