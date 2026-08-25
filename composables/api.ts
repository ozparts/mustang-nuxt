import { PaymentOptions } from "utils/interfaces";

import {
  ACTION,
  CURRENCY,
  HTTP_URL,
  Make,
  Models,
  SOURCE,
  LOCATION,
  Manufacturers,
} from "../vars/index";

import {
  GetApplicationsApiResponse,
  GetApplicationsForItemResponse,
  GetItemResponse,
  GetRelatedItemsResponse,
} from "~/types/api";

const baseBodyEU = {
  source: SOURCE.EU,
  make: Make,
  currency: CURRENCY.EUR,
  customer: "guest",
  mastercatalogue: true,
};

const searchBody = {
  source: "ozpartseu",
  make: Make,
  currency: CURRENCY.EUR,
  customer: "guest",
};

interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status?: number;
}

const makeApiRequest = async <T = any>(
  endpoint: string,
  body: any,
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${HTTP_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        ...baseBodyEU,
      }),
    });

    if (!response.ok) {
      let errorMessage = `Error status: ${response.status}.`;
      if (response.statusText) {
        errorMessage += ` Error message: ${response.statusText}`;
      }
      throw new Error(errorMessage, { cause: response.status });
    }

    const data = await response.json();
    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error: any) {
    console.error(
      `API Error on /${endpoint} endpoint with ${body.action} method.`,
      error,
    );
    return {
      data: null,
      error: error.message || "Network error occurred",
      status: error.cause,
    };
  }
};

interface GetApplicationsParams {
  show: boolean;
  country: string;
  item?: string;
  model?: string;
}

export const useGetApplications = async (
  params: GetApplicationsParams,
): Promise<ApiResponse<GetApplicationsApiResponse>> => {
  const { show, country, item, model } = params;

  return makeApiRequest("applications", {
    action: ACTION.GET_APPLICATIONS,
    item,
    show,
    country,
    model,
  });
};

interface GetApplicationsForItemParams {
  id: string;
}

export const useGetApplicationsForItem = async (
  params: GetApplicationsForItemParams,
): Promise<ApiResponse<GetApplicationsForItemResponse>> => {
  const { id } = params;
  return makeApiRequest("applications", {
    item: id,
    action: ACTION.GET_APPLICATIONS,
  });
};

interface GetRelatedItemsParams {
  record: string;
}

export const useGetRelatedItems = async (
  params: GetRelatedItemsParams,
): Promise<ApiResponse<GetRelatedItemsResponse>> => {
  const { record } = params;
  return makeApiRequest("applications", {
    record,
    action: ACTION.GET_RELATED_ITEMS,
  });
};

interface GetItemParams {
  record: string;
  country: string;
}

export const useGetItem = async (
  params: GetItemParams,
): Promise<ApiResponse<GetItemResponse>> => {
  const { record, country } = params;

  return makeApiRequest("item", {
    action: ACTION.GET_ITEM,
    record,
    country,
  });
};

export const useGetEngines = async (show: boolean, variant: string) => {
  try {
    const data = await fetch(`${HTTP_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...baseBodyEU,
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

export const useSubmitEnquiry = async (email: string, product: string) => {
  return await fetch(`https://api.ozparts.eu/email/enquiry-form`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      part: product,
      source: SOURCE.EU,
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
  additionalservice: [],
  location: "",
) => {
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...baseBodyEU,
        additionalservice: additionalservice.length ? additionalservice : [],
        location,
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

export const useGetCart = async (country: string, cart_id: string) => {
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  cart_id: string,
) => {
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  cart_id: string,
) => {
  try {
    const data = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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

export const useUpdateCartFields = async (cart_id: string, changes: {}) => {
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  value: string,
) => {
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
        source: SOURCE.EU,
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
  country: string,
) => {
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  try {
    const res = await fetch(`${HTTP_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  try {
    const res = await fetch(`${HTTP_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  // const to = "support@mustangperformance.eu";
  const to = "wojciech.rosinski@ozparts.eu";

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
        source: SOURCE.EU,
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
  try {
    const data = await fetch(`${HTTP_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        action: ACTION.CREATE_LEAD,
        currency: CURRENCY.EUR,
        location: LOCATION.EU,
        source: SOURCE.EU,
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

export const useGetProductsToCatalogue = async (
  peryear: string,
  show: boolean,
  variant?: string,
  model: string = Models[0],
) => {
  try {
    const data = await fetch(`${HTTP_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...baseBodyEU,
        show,
        peryear,
        action: ACTION.GET_APPLICATIONS,
        variant,
        model,
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

export const getPaymentMethods = async (options: PaymentOptions) => {
  try {
    const data = await fetch(`${HTTP_URL}/paymentmethods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: ACTION.GET_PAYMENT_METHODS,
        source: SOURCE.EU,
        ...options,
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

export async function getUserRegion() {
  try {
    const data = await fetch(`${HTTP_URL}/source/${SOURCE.EU}`);
    if (data.status === 200) {
      return data.json();
    } else {
      console.log(data);
    }
  } catch (e) {
    console.log(e);
  }
}
