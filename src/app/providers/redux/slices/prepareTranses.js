export function prepareTranses(trans) {
  const errors = {};

  const name = trans.name?.trim();
  if (!name) {
    errors.name = "The name field is required";
  }

  const amount = Number(trans.amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (!amount || amount <= 0) {
    errors.amount = "The amount must be greater than 0";
  }

  const category = trans.category?.trim();

  const dateString = trans.date?.trim();
  const date = dateString
    ? (() => {
        const formattedDate = new Date(dateString);
        return isNaN(formattedDate.getTime())
          ? dateString
          : formattedDate.toLocaleDateString("en-GB");
      })()
    : "";

  if (Object.keys(errors).length > 0) {
    return {
      error: true,
      errors,
    };
  }

  return {
    payload: {
      id: trans.id,
      name,
      amount,
      category,
      date,
      type: trans.type,
    },
  };
}
