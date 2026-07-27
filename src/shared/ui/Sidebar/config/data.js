import {
  Home,
  Wallet,
  CreditCard,
  User,
  Users,
  Orbit,
  NotebookPen,
} from "lucide-react";

export const MENU_DATA = [
  {
    KEY: "dashboard",
    LABEL: "Dashboard",
    ICON: Home,
    PATH: "/",
  },
  {
    KEY: "expense",
    LABEL: "Expense",
    ICON: CreditCard,
    PATH: "/expense",
  },
  {
    KEY: "income",
    LABEL: "Income",
    ICON: Wallet,
    PATH: "/income",
  },
  {
    KEY: "profile",
    LABEL: "Profile",
    ICON: User,
    PATH: "/profile",
  },
  {
    KEY: "content",
    LABEL: "Currencies and News",
    ICON: Orbit,
    PATH: "/content",
  },
  {
    KEY: "manage-users",
    LABEL: "Manage users",
    ICON: Users,
    PATH: "/manage-users",
  },
  {
    KEY: "manage-content",
    LABEL: "Manage content",
    ICON: NotebookPen,
    PATH: "/manage-content",
  },
];
