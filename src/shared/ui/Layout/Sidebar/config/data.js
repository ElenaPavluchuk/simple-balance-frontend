import { Home, Wallet, CreditCard, User } from "lucide-react";

export const data = [
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
  {
    key: "profile",
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];
