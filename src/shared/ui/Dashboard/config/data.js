import { Home, Wallet, CreditCard } from "lucide-react";

export const totalCardsData = [
  {
    id: "totalBalance",
    dataKey: "totalBalance",
    Icon: Home,
    label: "Total balance",
    color: "bg-teal-500",
    order: "order-1",
  },
  {
    id: "totalIncome",
    dataKey: "totalIncome",
    Icon: Wallet,
    label: "Total income",
    color: "bg-pink-500",
    order: "order-2",
  },
  {
    id: "totalExpense",
    dataKey: "totalExpense",
    Icon: CreditCard,
    label: "Total expense",
    color: "bg-cyan-500",
    order: "order-3",
  },
];

export const recentCardsData = [
  {
    id: "recentTotal",
    source: "total",
    dataKey: "recentTransactions",
    title: "Recent Transactions",
    hideBtn: true,
    order: "order-5",
  },
  {
    id: "recentExpense",
    source: "last30Days",
    dataKey: "expenseTransactions",
    title: "Expense",
    navigateTo: "/expense",
    order: "order-6",
  },
  {
    id: "recentIncome",
    source: "last30Days",
    dataKey: "incomeTransactions",
    title: "Income",
    navigateTo: "/income",
    order: "order-8",
  },
];

export const lastChartCardsData = [
  {
    id: "expenseByCategoryChart",
    source: "last30Days",
    dataKey: "expenseByCategory",
    title: "expense",
    order: "order-7",
  },
  {
    id: "incomeByCategoryChart",
    source: "last30Days",
    dataKey: "incomeByCategory",
    title: "income",
    order: "order-9",
  },
];
