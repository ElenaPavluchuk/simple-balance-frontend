import DashboardIcon from "../../Icons/DashboardIcon";
import IncomeIcon from "../../Icons/IncomeIcon";
import ExpenseIcon from "../../Icons/ExpenseIcon";
import NewsAndCurrenciesIcon from "../../Icons/NewsAndCurrenciesIcon";
import ManageUsersIcon from "../../Icons/ManageUsersIcon";
import UserProfileIcon from "../../Icons/UserProfileIcon";
import ManageContentIcon from "../../Icons/ManageContentIcon";

export const MENU_DATA = [
  {
    KEY: "dashboard",
    LABEL: "Dashboard",
    ICON: DashboardIcon,
    PATH: "/",
  },
  {
    KEY: "expense",
    LABEL: "Expense",
    ICON: ExpenseIcon,
    PATH: "/expense",
  },
  {
    KEY: "income",
    LABEL: "Income",
    ICON: IncomeIcon,
    PATH: "/income",
  },
  {
    KEY: "profile",
    LABEL: "Profile",
    ICON: UserProfileIcon,
    PATH: "/profile",
  },
  {
    KEY: "content",
    LABEL: "Currencies and News",
    ICON: NewsAndCurrenciesIcon,
    PATH: "/content",
  },
  {
    KEY: "manage-users",
    LABEL: "Manage users",
    ICON: ManageUsersIcon,
    PATH: "/manage-users",
  },
  {
    KEY: "manage-content",
    LABEL: "Manage content",
    ICON: ManageContentIcon,
    PATH: "/manage-content",
  },
];
