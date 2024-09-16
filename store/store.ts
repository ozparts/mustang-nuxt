import { defineStore } from "pinia";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  company: string;
  address2: string;
  addressNumber: string;
  addressStreet: string;
  city: string;
  country: string;
  zip: string;
  phone: string;
  shippingMethod: string;
  paymentMethod: string;
}

interface BillingForm {
  billCompany: string;
  billAddress: string;
  billAddress2: string;
  billCity: string;
  billCountryName: string;
  billZip: string;
}

const emptyShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  company: "",
  phone: "",
  address2: "",
  addressNumber: "",
  addressStreet: "",
  city: "",
  zip: "",
  country: "",
  paymentMethod: "",
  shippingMethod: "",
};

const emptyBillingForm = {
  billCompany: "",
  billAddress: "",
  billAddress2: "",
  billCity: "",
  billCountryName: "",
  billZip: "",
};

interface SplitVariants {
  variant: string;
  horsePower: string[];
}

interface FilterSchema {
  [category: string]: boolean;
}

export interface StoreState {
  variantsWithHorsepower: SplitVariants;
  categoryMasterList: string[];
  filter: FilterSchema;
  cartId: string | "";
  basketQuantity: number;
  country: string;
  shippingForm: ShippingForm;
  billingForm: BillingForm;
  host: string | undefined;
  productYears: string[] | [];
}

export const useStore = defineStore("store", {
  state: (): StoreState => {
    return {
      variantsWithHorsepower: { variant: "", horsePower: [] },
      categoryMasterList: [],
      filter: {},
      basketQuantity: 0,
      cartId: "",
      country: "",
      shippingForm: emptyShippingForm,
      billingForm: emptyBillingForm,
      host: "EU",
      productYears: [],
    };
  },

  getters: {
    getCategoryMasterList: (state: StoreState) => {
      return state.categoryMasterList;
    },
    getFilter: (state: StoreState) => {
      return state.filter;
    },
    getBasketQuantity: (state: StoreState) => () => {
      return state.basketQuantity;
    },
    getCountry: (state: StoreState) => () => {
      return state.country;
    },
    getCartId: (state: StoreState) => () => {
      return state.cartId;
    },
    getShippingForm: (state: StoreState) => () => {
      return state.shippingForm;
    },
    getBillingForm: (state: StoreState) => () => {
      return state.billingForm;
    },
    getHost: (state: StoreState) => () => {
      return state.host;
    },
    getProductYears: (state: StoreState) => () => {
      return state.productYears;
    },
  },

  actions: {
    setCategoryMasterList(arr: string[]) {
      this.categoryMasterList = arr;
    },
    setFilter(filterSchema: FilterSchema) {
      this.filter = filterSchema;
    },
    setChangeFilter(category: string, val: boolean) {
      this.filter[category] = val;
    },
    setAllFiltersTrue() {
      for (const key in this.filter) {
        this.filter[key] = true;
      }
    },
    setAllFiltersFalse() {
      for (const key in this.filter) {
        this.filter[key] = false;
      }
    },
    clearShippingForm() {
      this.shippingForm = {
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        company: "",
        phone: "",
        address2: "",
        addressNumber: "",
        addressStreet: "",
        city: "",
        zip: "",
        country: "",
        paymentMethod: "",
        shippingMethod: "",
      };
    },
    clearBillingForm() {
      this.billingForm = {
        billCompany: "",
        billAddress: "",
        billAddress2: "",
        billCity: "",
        billCountryName: "",
        billZip: "",
      };
    },
    setBasketQuantity(data: number) {
      this.basketQuantity = data;
    },
    setCountry(data: string) {
      this.country = data;
    },
    setCartId(data: string) {
      this.cartId = data;
    },
    setShippingForm(data: ShippingForm) {
      this.shippingForm = data;
    },
    setBillingForm(data: BillingForm) {
      this.billingForm = data;
    },
    setHost(data: string | undefined) {
      this.host = "EU";
    },
    setProductYears(data: string[]) {
      this.productYears = data;
    },
  },

  persist: {
    storage: persistedState.sessionStorage,
  },
});
