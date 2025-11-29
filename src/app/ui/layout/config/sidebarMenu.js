import { Home, Wallet, CreditCard } from "lucide-react";

export const sidebarMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    key: "expense",
    label: "Expense",
    icon: CreditCard,
    path: "/expense",
  },
  {
    key: "income",
    label: "Income",
    icon: Wallet,
    path: "/income",
  },
];
