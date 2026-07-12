const LOCALES = {
  USD: "en-US",
  EUR: "de-DE",
  RUB: "ru-RU",
};

export const currencyFormat = (num, currencyCode) => {
  if (!currencyCode) {
    return "";
  }

  if (typeof num !== "number") {
    parseFloat(num);
  }

  const currFormat = new Intl.NumberFormat(LOCALES[currencyCode], {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  });

  return currFormat.format(num);
};

export const exchangeRateFormat = (num, currencyCode) => {
  if (!currencyCode) {
    return "";
  }

  if (typeof num !== "number") {
    parseFloat(num);
  }

  const rateFormat = new Intl.NumberFormat(LOCALES[currencyCode], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return rateFormat.format(num);
};
