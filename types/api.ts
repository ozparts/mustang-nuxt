export interface GetApplicationsApiResponse {
  options: GetApplicationsOptions;
  results: GetApplicationsResults[];
}

export interface GetApplicationsResults {
  bodytype: string;
  categorydescription: string;
  categorymaster: string;
  description: string;
  drivetype: string;
  engine: string;
  enginetype: string;
  hidden: boolean;
  item: GetApplicationsItem;
  make: string;
  model: string;
  note: string;
  parameter: string;
  peryear: string[];
  transmissiontype: string;
  variant: string;
  year: string;
  _id: string;
}

export interface GetApplicationsOptions {
  category: string[];
  categorydescription: string[];
  categorymaster: string[];
  class: string[];
  classdescription: string[];
  engine: string[];
  group: string[];
  groupdescription: string[];
  make: string[];
  model: string[];
  peryear: string[];
  variant: string[];
  year: string[];
}

export interface GetApplicationsItem {
  available: number;
  availabledetails: AvailableDetail[];
  id: string;
  recordtype: string;
  name: string;
  description: string;
  urlcomponent: string;
  number: number;
  weight: number;
  pricegroup: string;
  hidden: boolean;
  manufacturergroup: string;
  manufacturerstock: number;
  manufacturerstock2: number;
  groupdescription: string;
  moq: number;
  dropship: boolean;
  favorite: boolean;
  notify: boolean;
  price: Price;
  photos: Photo[];
  outofstockmessage: string;
  intransit: number;
}

export type GetApplicationsForItemResponse = GetApplicationsApiResponse;

export type GetRelatedItemsResponse = GetSearchResponse;

export interface GetSearchResponse {
  available: number;
  availabledetails: AvailableDetail[];
  categoryminor: string;
  description: string;
  description2: string;
  enquiryonly?: boolean;
  dropship: boolean;
  favorite: boolean;
  groupdescription: string;
  hidden: boolean;
  id: string;
  intransit: number;
  manufacturergroup: string;
  manufacturerstock?: number;
  manufacturerstock2?: number;
  moq: number;
  name: string;
  notify: boolean;
  number: number;
  outofstockmessage: string;
  photos: Photo[];
  price: null | Price;
  pricegroup: string;
  recordtype: string;
  urlcomponent: string;
  weight: number;
  _id: string;
}

export interface GetItemResponse {
  application: string;
  available: AvailableDetail[];
  categoryminor: string;
  categorydescription: string;
  certificate: string;
  components: ComponentsItem[] | [];
  custombox: boolean;
  deliveries: {
    [key: string]: Delivery[];
  };
  description: string;
  description2: string;
  detaildescription: string;
  dropship: boolean;
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
  price: PriceInfo;
  pricegroup: string;
  recordtype: string;
  relateditems: any[];
  technicaldetails: TechnicalDetail[];
  urlcomponent: string;
  weight: number;
  _id: string;
}

export interface AvailableDetail {
  default: boolean;
  intransit?: number;
  dropship?: boolean;
  location: string;
  quantityavailable: number;
  specialbackorder?: boolean;
  stockcategory?: string;
  secondary?: boolean;
  alternative?: boolean;
  date?: string;
  name?: string;
  multilocationavailable?: number;
}

export interface Delivery {
  eta: string;
  quantity: number;
}

export interface Photo {
  name: string;
  url: string;
  _id: string;
}

export interface PriceInfo {
  baseprice: number;
  currency: string;
  symbol: string;
  quantity: number;
  prices: {
    [key: string]: PriceDetail;
  };
}

export interface TechnicalDetail {
  _id: string;
  name: string;
  value: string;
}

export interface GetVariantsResponse extends GetSearchResponse {
  variantdescription: string;
}
export interface Price {
  currency: string;
  symbol: string;
  quantity: number;
  promotion: boolean;
  baseprice: string;
  price: string;
  grossprice: string;
}

// export interface GroupedApplications {
//   groupName: string;
//   items: GetApplicationsResponse[];
// }

export interface PriceDetail {
  price: string;
  moq: any[];
  promotion: boolean;
  additionalservices: any[];
  grossprice: string;
  specialbackorder: boolean;
}

export interface ComponentsItem {
  available: number;
  availabledetails: AvailableDetail[];
  categoryminor: string | null;
  certificate: string | null;
  description: string;
  description2: string | null;
  dropship: boolean;
  favorite: boolean;
  groupdescription: string;
  hidden: boolean;
  id: string;
  intransit: number;
  manufacturergroup: string;
  manufacturerstock: number;
  manufacturerstock2: number;
  moq: number;
  name: string;
  notify: boolean;
  number: number;
  outofstockmessage: string;
  photos: Photo[];
  price: PriceInfo | null;
  pricegroup: string;
  quantity: number | null;
  recordtype: string;
  urlcomponent: string;
  weight: number;
  _id: string;
}

// export interface GetApplicationsForItemResponse {
//   bodytype: string;
//   categorydescription: string;
//   categorymaster: string;
//   description: string;
//   drivetype: string;
//   engine: string;
//   enginetype: string;
//   hidden: boolean;
//   item: InventoryItem;
//   make: string;
//   model: string;
//   note: string;
//   parameter: string;
//   peryear: string[];
//   transmissiontype: string;
//   variant: string;
//   year: string;
//   _id: string;
// }

interface TransactionlinesItem {
  deliveries: any;
  description: string;
  displayname: string;
  intransit: number;
  name: string;
  number: number;
  photos: Photo[];
  pricegroup: string;
  quantityavailable: number;
  recordtype: string;
  urlcomponent: string;
  weight: number;
  _id: string;
}

export interface TransactionlinesInterface {
  additionalservice: any[];
  amount: number;
  backorderquantity: number;
  discountrate: number;
  displayname: string;
  dropship: boolean;
  grosamount: number;
  grossprice: string;
  item: TransactionlinesItem;
  memo: string | null;
  price: number;
  pricelevel: unknown | null;
  quantity: number;
  stockcategory: string;
  taxamount: number;
  unitprice: number;
  _id: string;
}
