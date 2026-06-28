export const currencyFormat = (num, currencyCode) => {
  if (!currencyCode) {
    return "";
  }

  if (typeof num !== "number") {
    parseFloat(num);
  }

  const LOCALES = {
    USD: "en-US",
    EUR: "de-DE",
    RUB: "ru-RU",
  };

  const currFormat = new Intl.NumberFormat(LOCALES[currencyCode], {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  });

  return currFormat.format(num);
};
