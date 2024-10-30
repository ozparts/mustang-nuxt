export interface TechnicalDetail {
  _id: string;
  name: string;
  value: string;
}

export interface Photo {
  name: string;
  url: string;
  _id: string;
}

export interface PriceDetails {
  [key: string]: any;
}

export interface ProductByGetItemAction {
  application: string;
  available: {
    location: string;
    quantityavailable: number;
    intransit: number;
    stockcategory: string;
    date: string;
  }[];
  certificate: string;
  deliveries: any;
  description: string;
  detaildescription: string;
  favorite: boolean;
  groupdescription: string;
  hidden: boolean;
  id: string;
  manufacturer: string;
  manufacturergroup: string;
  manufacturerstock: number;
  manufacturerstock2: number;
  moq: number;
  name: string;
  notify: boolean;
  number: number;
  outofstockmessage: string;
  photos: Photo[];
  price: {
    currency: string;
    symbol: string;
    quantity: number;
    prices: PriceDetails;
    baseprice: number;
  };
  pricegroup: string;
  recordtype: string;
  relateditems: any[];
  technicaldetails: TechnicalDetail[];
  urlcomponent: string;
  weight: number;
}

export interface Location {
  EU: string;
  UK: string;
}

export type Manufacturer = {
  id: string | string[];
  name?: string;
  shortName?: string;
};

export type ManufacturersType = {
  [key: string]: Manufacturer;
};

export type PaymentOptions = {
  currency: String;
  amount: Number;
  transactionid: String;
};
