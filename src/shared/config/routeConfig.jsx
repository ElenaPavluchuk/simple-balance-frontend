import Layout from "../ui/Layout/Layout";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import ExpensePage from "../../pages/ExpensePage/ExpensePage";
import IncomePage from "../../pages/IncomePage/IncomePage";
import SignupPage from "../../pages/SignupPage/SignupPage";

export const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "expense", element: <ExpensePage /> },
      { path: "income", element: <IncomePage /> },
    ],
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];
