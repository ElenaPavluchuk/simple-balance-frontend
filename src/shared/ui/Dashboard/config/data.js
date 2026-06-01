import { Home, Wallet, CreditCard } from "lucide-react";

export const totalCardsData = [
  {
    id: "totalBalance",
    Icon: Home,
    label: "Total balance",
    dataKey: "totalBalance",
    color: "bg-teal-500",
  },
  {
    id: "totalIncome",
    Icon: Wallet,
    label: "Total income",
    dataKey: "totalIncome",
    color: "bg-pink-500",
  },
  {
    id: "totalExpense",
    Icon: CreditCard,
    label: "Total expense",
    dataKey: "totalExpense",
    color: "bg-cyan-500",
  },
];

export const cardsByTypeData = [
  {
    id: "recentTotal",
    type: "recent",
    props: {
      source: "total",
      dataKey: "recentTransactions",
      title: "Recent Transactions",
      hideBtn: true,
    },
  },
  {
    id: "recentExpense",
    type: "recent",
    props: {
      source: "last30Days",
      dataKey: "expenseTransactions",
      title: "Expense",
      navigateTo: "/expense",
    },
  },
  {
    id: "expenseByCategory",
    type: "category",
    props: {
      source: "last30Days",
      dataKey: "expenseByCategory",
      title: "expense",
    },
  },
  {
    id: "recentIncome",
    type: "recent",
    props: {
      source: "last30Days",
      dataKey: "incomeTransactions",
      title: "Income",
      navigateTo: "/income",
    },
  },
  {
    id: "incomeByCategory",
    type: "category",
    props: {
      source: "last30Days",
      dataKey: "incomeByCategory",
      title: "income",
    },
  },
];
