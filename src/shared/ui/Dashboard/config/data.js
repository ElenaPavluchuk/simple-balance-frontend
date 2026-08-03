import { Home, Wallet, CreditCard } from "lucide-react";

export const TOTAL_CARDS_DATA = [
  {
    ID: "totalBalance",
    DATA_KEY: "totalBalance",
    ICON: Home,
    LABEL: "Total balance",
    COLOR: "bg-linear-to-r from-emerald-500 to-emerald-800",
    ORDER: "order-1",
    SPANNING_COLUMNS: "col-span-2",
  },
  {
    ID: "totalIncome",
    DATA_KEY: "totalIncome",
    ICON: Wallet,
    LABEL: "Total income",
    COLOR: "bg-linear-to-r from-emerald-400 to-lime-600",
    ORDER: "order-2",
    SPANNING_COLUMNS: "col-span-1",
  },
  {
    ID: "totalExpense",
    DATA_KEY: "totalExpense",
    ICON: CreditCard,
    LABEL: "Total expense",
    COLOR: "bg-linear-to-r from-emerald-400 to-sky-600",
    ORDER: "order-3",
    SPANNING_COLUMNS: "col-span-1",
  },
];

export const RECENT_CARDS_DATA = [
  {
    ID: "recentTotal",
    SOURCE: "total",
    DATA_KEY: "recentTransactions",
    TITLE: "Recent Transactions",
    NAVIGATE_TO: null,
    ORDER: "order-5",
    SPANNING_COLUMNS: "col-span-2",
  },
  {
    ID: "recentExpense",
    SOURCE: "last30Days",
    DATA_KEY: "expenseTransactions",
    TITLE: "Expense",
    NAVIGATE_TO: "/expense",
    ORDER: "order-6",
    SPANNING_COLUMNS: "col-span-2",
  },
  {
    ID: "recentIncome",
    SOURCE: "last30Days",
    DATA_KEY: "incomeTransactions",
    TITLE: "Income",
    NAVIGATE_TO: "/income",
    ORDER: "order-8",
    SPANNING_COLUMNS: "col-span-2",
  },
];

export const RECENT_CHART_CARDS_DATA = [
  {
    ID: "expenseByCategoryChart",
    SOURCE: "last30Days",
    DATA_KEY: "expenseByCategory",
    TITLE: "expense",
    ORDER: "order-7",
    SPANNING_COLUMNS: "col-span-2",
  },
  {
    ID: "incomeByCategoryChart",
    SOURCE: "last30Days",
    DATA_KEY: "incomeByCategory",
    TITLE: "income",
    ORDER: "order-9",
    SPANNING_COLUMNS: "col-span-2",
  },
];
