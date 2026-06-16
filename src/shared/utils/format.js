export const currencyFormat = (num, currencyCode = "USD") => {
  if (typeof num !== "number") {
    parseFloat(num);
  }

  const locales = {
    USD: "en-US",
    EUR: "de-DE",
    RUB: "ru-RU",
  };

  const currFormat = new Intl.NumberFormat(locales[currencyCode], {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  });

  return currFormat.format(num);
};
