export const currencyFormat = (num, currencyCode) => {
  const currFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
  });

  return currFormat.format(num);
};
