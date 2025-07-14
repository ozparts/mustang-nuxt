export const getAvailability = (
  part,
  quantity,
  quantityInBasket,
  MANUFACTURER
) => {
  const defaultStock = part.available.find((e) => e.default);
  const dropshipStock = part.available.find((e) => e.dropship);
  const alternativeStock = part.available.find((e) => e.alternative);
  const manufacturerStock = part.available.find(
    (e) => e.location === "manufacturer"
  );

  const isAirFreight = !part.custombox;

  const countKitsInStocks = () => {
    const transformedData = part.components?.map(({ available, quantity }) => ({
      available,
      quantity,
      max: quantity !== 0 ? Math.floor(available / quantity) : null,
    }));

    return Math.min(...transformedData.map((item) => item.max));
  };

  const countAlternativeStock = () => {
    const inDropshipStock =
      avSettings[MANUFACTURER].dropship && dropshipStock
        ? dropshipStock.quantityavailable
        : 0;
    const allItems =
      avSettings[MANUFACTURER].alternative && alternativeStock
        ? alternativeStock.quantityavailable
        : 0;
    const kits = part.recordtype === "kititem" ? countKitsInStocks() : 0; //maksymalna ilość kitów jakie można złożyć z dwóch magazynów
    return part.recordtype === "kititem"
      ? kits - defaultStock.quantityavailable - inDropshipStock
      : allItems - inDropshipStock;
  };

  //Obiekt w którym wyliczamy ile jest sztuk danego produktu dla każdego z przypadku. Pod uwagę brane są ustawionia dla każdego brandu gdzie szybko możemy sterować tym czy chcemy pokazywać tranzy, atlternatywny magazy, dropship itd.
  const ctx = {
    inStock: defaultStock.quantityavailable,
    inDropshipStock:
      avSettings[MANUFACTURER].dropship && dropshipStock
        ? dropshipStock.quantityavailable
        : 0,
    inAlternativeStock: countAlternativeStock(),
    inTransitUpTo3Weeks: avSettings[MANUFACTURER].transit
      ? countTransit(part.deliveries?.[defaultStock.location], 28, "down")
      : 0,
    inTransitPast3Weeks: avSettings[MANUFACTURER].transit
      ? countTransit(part.deliveries?.[defaultStock.location], 28, "up")
      : 0,
    inManufacturer:
      (avSettings[MANUFACTURER]?.airFreight &&
        isAirFreight &&
        (manufacturerStock.quantityavailable || part.manufacturerstock)) ||
      0,
  };

  const {
    inStock,
    inDropshipStock,
    inAlternativeStock,
    inTransitUpTo3Weeks,
    inTransitPast3Weeks,
    inManufacturer,
  } = ctx;

  const max =
    inStock +
    inDropshipStock +
    inAlternativeStock +
    inTransitUpTo3Weeks +
    inTransitPast3Weeks +
    inManufacturer -
    quantityInBasket;

  let av;

  if (quantity + quantityInBasket <= inStock) {
    av = deliverySettings("instock");
  } else if (quantity + quantityInBasket <= inStock + inDropshipStock) {
    av = deliverySettings("dropshipping");
  } else if (
    quantity + quantityInBasket <=
    inStock + inDropshipStock + inAlternativeStock
  ) {
    av = deliverySettings("alternative", 0);
  } else if (
    quantity + quantityInBasket <=
    inStock + inDropshipStock + inAlternativeStock + inTransitUpTo3Weeks
  ) {
    const days = setDays(
      quantity - (inStock + inDropshipStock + inAlternativeStock),
      part.deliveries[defaultStock.location]
    );
    av = deliverySettings("intransit", days);
  } else if (
    quantity + quantityInBasket <=
    inStock +
      inDropshipStock +
      inAlternativeStock +
      inTransitUpTo3Weeks +
      inManufacturer
  ) {
    av = deliverySettings("airfreight");
  } else if (
    quantity + quantityInBasket <=
    inStock +
      inDropshipStock +
      inAlternativeStock +
      inTransitUpTo3Weeks +
      inManufacturer +
      inTransitPast3Weeks
  ) {
    const days = setDays(
      quantity +
        quantityInBasket -
        (inStock + inDropshipStock + inAlternativeStock + inManufacturer),
      part.deliveries[defaultStock.location]
    );
    av = deliverySettings("intransit", days);
  } else {
    av = deliverySettings("outofstock");
  }

  return { av, max, ctx };
};

const setDays = (quantity, deliveries) => {
  let transit;
  if (deliveries.length) {
    const today = new Date();
    const array = [];
    for (const data of deliveries) {
      array.push({
        eta: new Date(data.eta),
        quantity: data.quantity,
        days: Math.ceil(
          (new Date(data.eta).getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      });
    }
    transit = array.sort((a, b) => a.eta - b.eta);
  }
  let deliv;
  let accumulatedQuantity = 0;
  for (const item of transit) {
    accumulatedQuantity += item.quantity;
    if (quantity <= accumulatedQuantity) {
      deliv = item;
      break;
    }
  }
  const safeDays = 5;
  let days;
  if (deliv) {
    days = `${deliv.days + safeDays} - ${deliv.days + safeDays + 2}`;
  } else {
    days = "1 - 2";
  }
  return days;
};

function setTransit(deliveries) {
  if (deliveries.length) {
    const today = new Date();
    const array = [];
    for (const data of deliveries) {
      array.push({
        eta: new Date(data.eta),
        quantity: data.quantity,
        days: Math.ceil(
          (new Date(data.eta).getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      });
    }
    return array.sort((a, b) => a.eta - b.eta);
  } else return [];
}
function countTransit(deliveries, days, direction) {
  if (deliveries?.length) {
    const transit = setTransit(deliveries);
    if (transit) {
      const arr = transit.filter((e) =>
        direction === "up" ? e.days > days : e.days <= days
      );
      const totalQuantity = arr.reduce((sum, item) => {
        return sum + (item.quantity || 0);
      }, 0);
      return totalQuantity || 0;
    } else return 0;
  } else return 0;
}
export const avSettings = {
  DBA: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: true,
  },
  ACS: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: true,
  },
  XFORCE: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: false,
  },
  HAWK: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: false,
  },
  REDARC: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: true,
  },
  PEDDERS: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: true,
  },
  TURBOSMART: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: false,
  },
  WHITELINE: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: false,
  },
  ACL: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: true,
  },
  SABER: {
    dropship: true,
    alternative: true,
    transit: true,
    airFreight: true,
  },
};
export const deliverySettings = (parametr, days) => {
  switch (parametr) {
    case "instock":
      return {
        case: "instock",
        message: "In stock",
        days: "Delivery within 2-5 days",
        color: "green",
      };
    case "dropshipping":
      return {
        case: "dropshipping",
        message: "In stock",
        days: "Delivery within 2-5 days",
        color: "green",
      };
    case "alternative":
      return {
        case: "alternative",
        message: "In stock",
        days: "Delivery within 5-10 days",
        color: "green",
      };
    case "intransit":
      return {
        case: "intransit",
        message: "In transit",
        days: `Delivery within ${days} days`,
        color: "orange",
      };
    case "airfreight":
      return {
        case: "airfreight",
        message: "Available from the manufacturer",
        days: "Delivery within 3-4 weeks with airfreight*",
        color: "orange",
        badge: true,
        badgeText: `Extra costs may be charged.
          Please note that the lead time starts from the date of receiving the payment.`,
      };
    case "outofstock":
      return {
        case: "outofstock",
        message: "Temporarily out of stock",
        color: "#c33934",
      };
  }
};
