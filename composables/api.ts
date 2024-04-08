import { ProductByGetItemAction, Location } from "utils/interfaces";
import {
  ACTION,
  CURRENCY,
  HTTP_URL,
  Make,
  Model,
  SOURCE,
  LOCATION,
  MANUFACTURER,
  EXCLUDED,
  categories,
  Manufacturers,
} from "../vars/index";

const baseBodyEU = {
  source: SOURCE.EU,
  make: Make,
  model: Model,
  currency: CURRENCY.EUR,
  customer: "guest",
  mastercatalogue: true,
};

const baseBodyUK = {
  source: SOURCE.UK,
  make: Make,
  model: Model,
  currency: CURRENCY.GBP,
  customer: "guest",
  mastercatalogue: true,
};

const searchBody = {
  source: "ozpartseu",
  make: Make,
  model: Model,
  currency: CURRENCY.EUR,
  customer: "guest",
};

const useStoreState = () => {
  const store = useStore();
  return store.getHost();
};

export const useGetApplications = async (
  show: boolean,
  country: string,
  item?: string
) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        manufacturergroup: Manufacturers.ALL.id,
        action: ACTION.GET_APPLICATIONS,
        item,
        show,
        country,
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useGetEngines = async (show: boolean, variant: string) => {
  const host = useStoreState();

  try {
    const data = await fetch(`${HTTP_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        manufacturergroup: "",
        show,
        action: ACTION.GET_APPLICATIONS,
        variant,
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useGetProducts = async (
  variant: string,
  manufacturer?: string
) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        show: true,
        action: ACTION.GET_APPLICATIONS,
        variant,
        manufacturergroup: manufacturer ? Manufacturers[manufacturer].id : "",
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useGetItem = async (record: string, country: string) => {
  let errorData = {
    message: "",
  };
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.GET_ITEM,
        byNumber: true,
        record,
        country,
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else {
      if (data.status === 404) {
        errorData.message = (await data.json()).message;
        throw new Error(errorData.message);
      }
    }
  } catch (e) {
    console.log(e);
    throw new Error(errorData.message);
  }
};

export const useGetRelatedItems = async (record: string) => {
  const host = useStoreState();
  try {
    const res = await fetch(`${HTTP_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.GET_RELATED_ITEMS,
        record,
      }),
    });
    return res.status === 200 ? await res.json() : console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const useSubmitEnquiry = async (email: string, product: string) => {
  const host = useStoreState();
  return await fetch(`https://api.ozparts.eu/email/enquiry-form`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      part: product,
      source: host === "UK" ? SOURCE.UK : SOURCE.EU,
      text: `Hi, I am interested in ${product}. Let me know if this is
    available.`,
    }),
  });
};

export const useAddToBasket = async (
  quantity: number,
  record: "",
  country: "",
  cart_id: string | "",
  additionalservice: []
) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        additionalservice: additionalservice.length ? additionalservice : [],
        location: LOCATION.EU,
        action: ACTION.ADD_TO_CART,
        quantity,
        record,
        cart_id,
        country,
      }),
    });
    if (data.status === 200) {
      return await data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useCountry = async () => {
  try {
    const data = await fetch(`https://api.ozparts.eu/country`);
    if (data.status === 200) {
      return await data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useGetCart = async (country: string, cart_id: string) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.GET_CARTS,
        country,
        cart_id,
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useDeleteItems = async (
  line_id: string,
  country: string,
  cart_id: string
) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.UPDATE_CART,
        field: "deleted",
        line_id,
        cart_id,
        country,
        value: true,
      }),
    });
    if (data.status === 200) {
      return await data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useDeleteItem = async (
  line_id: string,
  country: string,
  value: number,
  cart_id: string
) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.UPDATE_CART,
        field: "quantity",
        line_id,
        cart_id,
        country,
        value,
      }),
    });
    if (data.status === 200) {
      return await data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useAvlInLocation = (
  part: ProductByGetItemAction,
  location: Location
) => {
  const host = useStoreState();
  if (part) {
    let item = 0;
    if (host === "EU") {
      const local = part.available.find((obj) => obj.location === location.EU);
      if (local !== undefined) {
        item = local.quantityavailable;
      } else {
        item = 0;
      }
    } else if (host === "UK") {
      const local = part.available.find((obj) => obj.location === location.UK);
      if (local !== undefined) {
        item = local.quantityavailable;
      } else {
        item = 0;
      }
    }
    return item;
  }
};

export const useAvlInManstock = (part: ProductByGetItemAction) => {
  if (part) {
    const manufacturer = part.available.find(
      (e) => e.location === "manufacturer"
    );
    if (manufacturer) {
      const avl = manufacturer.quantityavailable
        ? manufacturer.quantityavailable
        : 0;
      return avl;
    }
  }
  return 0;
};

export const useUpdateCartFields = async (cart_id: string, changes: {}) => {
  const host = useStoreState();
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.UPDATE_CART,
        cart_id,
        changes,
        refresh: true,
      }),
    });
    return res.status === 200 ? await res.json() : console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const useUpdateCartField = async (
  cart_id: string,
  line_id: any,
  field: string,
  value: string
) => {
  const host = useStoreState();

  const data = line_id
    ? {
        action: ACTION.UPDATE_CART,
        cart_id,
        field,
        value,
        line_id,
      }
    : {
        action: ACTION.UPDATE_CART,
        cart_id,
        field,
        value,
      };
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        source: host === "UK" ? SOURCE.UK : SOURCE.EU,
        customer: "guest",
      }),
    });
    return res.status === 200 ? await res.json() : console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const useCreateAddress = async (
  cart_id: string,
  form: {},
  country: string
) => {
  const host = useStoreState();
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.UPDATE_ADDRESS,
        ...form,
        cart_id,
        country,
      }),
    });
    return res.status === 200 ? await res.json() : console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const useConfirmOrder = async (cart_id: string, country: string) => {
  const host = useStoreState();
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.ADD_ORDER,
        cart_id,
        country,
      }),
    });
    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong, try again later.");
  }
};

export const useGetOrder = async (transaction_id: string, country: string) => {
  const host = useStoreState();
  try {
    const res = await fetch(`${HTTP_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        action: ACTION.GET_TRANSACTIONS,
        transaction_id,
        country,
      }),
    });
    if (res.status === 200) {
      return await res.json();
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong, try again later.");
  }
};

export const useSubmitContactForm = async (form: {}, formType: string) => {
  const host = useStoreState();

  const to =
    host === "UK"
      ? "support@mustangperformance.uk"
      : "support@mustangperformance.eu";

  const url =
    formType === "GENERAL"
      ? `https://api.ozparts.eu/email/contact-general`
      : `https://api.ozparts.eu/email/contact-dealer`;
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        source: host === "UK" ? SOURCE.UK : SOURCE.EU,
        to,
      }),
    });
    if (data.status === 200) {
      return data.status;
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useCreateLead = async (form: {}) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        action: ACTION.CREATE_LEAD,
        currency: host === "UK" ? CURRENCY.GBP : CURRENCY.EUR,
        location: host === "UK" ? LOCATION.UK : LOCATION.EU,
        source: host === "UK" ? SOURCE.UK : SOURCE.EU,
      }),
    });
    if (data.status === 200) {
      return data.status;
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

export const useSearch = async (keyword: string) => {
  const host = useStoreState();
  try {
    const data = await fetch(`${HTTP_URL}/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...searchBody,
        action: ACTION.SEARCH,
        keyword: keyword,
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};

// export const useGetProductsByCategory = async (name: string) => {
//   const host = useStoreState();

//   try {
//     const data = await fetch(`${HTTP_URL}/applications`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...(host === "UK" ? baseBodyUK : baseBodyEU),
//         show: true,
//         action: ACTION.GET_APPLICATIONS,
//         categorymaster: categories.find((obj: any) => obj.title === name)
//           ?.categorydescription,
//       }),
//     });
//     if (data.status === 200) {
//       return data.json();
//     } else {
//       console.log(data);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

export const useGetProductsToCatalogue = async (
  peryear: string,
  show: boolean,
  variant?: string
) => {
  const host = useStoreState();

  try {
    const data = await fetch(`${HTTP_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ...(host === "UK" ? baseBodyUK : baseBodyEU),
        ...baseBodyEU,
        show,
        peryear,
        action: ACTION.GET_APPLICATIONS,
        variant,
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
};
