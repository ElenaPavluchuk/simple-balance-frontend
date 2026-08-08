import dayjs from "dayjs";

export const groupTransactionsByMonth = (transactions) => {
  const groups = transactions.reduce((acc, transaction) => {
    const date = dayjs(transaction.date);
    const key = date.format("YYYY-MM");

    if (!acc[key]) {
      acc[key] = {
        key,
        label: date.format("MMMM YYYY"),
        transactions: [],
      };
    }

    acc[key].transactions.push(transaction);

    return acc;
  }, {});

  return Object.values(groups);
};

export const sortTransactions = (transactions) => {
  transactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }

    return (b.id || 0) - (a.id || 0);
  });
};
