import {
  Home,
  Wallet,
  CreditCard,
  User,
  Users,
  Orbit,
  NotebookPen,
} from "lucide-react";

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
  {
    key: "content",
    label: "Currencies and News",
    icon: Orbit,
    path: "/content",
  },
  {
    key: "manage-users",
    label: "Manage users",
    icon: Users,
    path: "/manage-users",
  },
  {
    key: "manage-content",
    label: "Manage content",
    icon: NotebookPen,
    path: "/manage-content",
  },
];
