import { EXCLUDED } from "../vars/index";
import { ManufacturersType } from "./interfaces";

export interface Variant {
  variant: string;
  horsePorwer?: string[];
}

export const parseVariantsAndHorsepower = (arr: string[]) => {
  const data: Variant[] = [];

  arr.forEach((el) => {
    const variant = el.split(" | ")[0];
    const hp = el.split(" | ")[1];

    const found = data.find((obj) => obj.variant === variant);
    if (!found) {
      data.push({ variant, horsePorwer: [hp] });
    } else {
      found.horsePorwer?.push(hp);
    }
  });
  return data.sort((a, b) => a.variant.localeCompare(b.variant));
};

export const getParam = (param: string) => {
  return param.split("_").join(" ");
};

export const getAllSpecificVariants = (variants: string[], key: string) => {
  const specificVariants: string[] = [];

  variants.forEach((el) => {
    const variant = el.split(" | ")[0];
    if (variant === key) {
      specificVariants.push(el);
    }
  });

  return specificVariants.sort((a, b) => {
    const hpA = a.split(" | ")[1];
    const hpB = b.split(" | ")[1];
    return hpB.localeCompare(hpA);
  });
};

interface Product {
  bodytype: string;
  categorymaster: string;
  drivetype: string;
  engine: string;
  enginetype: string;
  categorydescription: string;
  groupdescription: string;
  item: {
    groupdescription: string;
    categorydescription: string;
  };
}

interface CategorizedProduct {
  [category: string]: Product;
}

interface ProductGroupedBySubCategory {
  category: string;
  products: Product[];
}

interface ProductGroupedByMasterCategory {
  masterCategory: string;
  subCategories: ProductGroupedBySubCategory[];
}

export const groupProductsByCategory = (products: Product[]) => {
  const productsWithDesc: CategorizedProduct[] = [];

  products.forEach((product: Product) => {
    if (product.categorydescription && product.item.groupdescription) {
      productsWithDesc.push({
        [`${product.item.groupdescription} - ${product.categorydescription}`]:
          product,
      });
    } else if (product.item.categorydescription) {
      productsWithDesc.push({ [product.item.categorydescription]: product });
    } else if (
      !product.item.categorydescription &&
      !product.item.groupdescription &&
      !product.categorydescription &&
      !product.groupdescription
    ) {
      productsWithDesc.push({ OTHER: product });
    } else {
      productsWithDesc.push({ [product.item.groupdescription]: product });
    }
  });
  return productsWithDesc
    .reduce(
      (acc: ProductGroupedBySubCategory[], current: CategorizedProduct) => {
        const category = Object.keys(current)[0];
        const product = current[category];
        const existingCategory: ProductGroupedBySubCategory | undefined =
          acc.find(
            (item: ProductGroupedBySubCategory) => item.category === category
          );

        if (existingCategory) {
          existingCategory.products.push(product);
        } else {
          acc.push({ category, products: [product] });
        }
        return acc;
      },
      []
    )
    .sort((a: ProductGroupedBySubCategory, b: ProductGroupedBySubCategory) => {
      if (a.category.includes("Varex")) return -1;
      if (b.category.includes("Varex")) return 1;
      return a.category.localeCompare(b.category);
    });
};

export const groupProductsByMasterCategory = (
  products: ProductGroupedBySubCategory[]
) => {
  const groupedProducts: ProductGroupedByMasterCategory[] = [];
  products.forEach((obj, i) => {
    const masterCategory = obj.products[0].categorymaster;
    const found = groupedProducts.find(
      (obj) => obj.masterCategory === masterCategory
    );
    if (!found) {
      groupedProducts.push({ masterCategory, subCategories: [obj] });
    } else {
      found.subCategories.push(obj);
    }
  });
  return groupedProducts.sort(
    (a: ProductGroupedByMasterCategory, b: ProductGroupedByMasterCategory) =>
      a.masterCategory.localeCompare(b.masterCategory)
  );
};

interface ProductIn3C {
  quantity: number;
  kitcomponent: boolean;
}

export const countBasketQuantity = (arr: ProductIn3C[]) => {
  return arr
    .filter((obj) => obj.kitcomponent !== true)
    .reduce((prev, curr) => prev + Number(curr.quantity), 0);
};

export const getProductType = (name: string) => {
  const excluded = EXCLUDED;
  if (name) {
    if (excluded.includes(name)) {
      // setProductType("excluded");
      return "excluded";
    } else if (
      name.includes("DBA") &&
      (name.includes("SP") || name.includes("XP"))
    ) {
      // setProductType("kit");
      return "kit";
    } else if (name.includes("DBAC")) {
      // setProductType("calipers");
      return "calipers";
    } else if (name.includes("DBA")) {
      // setProductType("discbrake");
      return "discbrake";
    } else if (name.includes("DB")) {
      // setProductType("brakepad");
      return "brakepad";
    } else {
      return "Other";
    }
  }
};

export const showPriceInfo = (productType: string) => {
  let text = "";
  if (productType === "discbrake") {
    text = "(2 brake discs)";
  } else if (productType === "excluded") {
    text = "(1 brake disc)";
  } else if (productType === "kit" || productType === "brakepad") {
    text = "(1 set)";
  } else if (productType === "calipers") {
    text = "(1 caliper)";
  } else {
    return " ";
  }
  return text + " ";
};

export const getManufacturerBrand = (
  id: string,
  manufacturers: ManufacturersType
) => {
  for (const key in manufacturers) {
    if (manufacturers.hasOwnProperty(key)) {
      const manufacturer = manufacturers[key];

      if (manufacturer.id === id) {
        return manufacturer.name || null;
      }
    }
  }

  return null;
};
