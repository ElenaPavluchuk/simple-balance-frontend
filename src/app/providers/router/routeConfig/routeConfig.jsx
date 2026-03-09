// import AppLayout from "../../../ui/layout/AppLayout";
import DashboardPage from "../../../../pages/DashboardPage/DashboardPage";
import ExpensePage from "../../../../pages/ExpensePage/ExpensePage";
import IncomePage from "../../../../pages/IncomePage/IncomePage";
import Layout from "../../../../shared/ui/Layout/Layout";

export const routeConfig = {
  // path: "/",
  // element: <AppLayout />,
  // children: [
  //   { index: true, element: <DashboardPage /> },
  //   { path: "expense", element: <ExpensePage /> },
  //   { path: "income", element: <IncomePage /> },
  // ],

  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <DashboardPage /> },
    { path: "expense", element: <ExpensePage /> },
    { path: "income", element: <IncomePage /> },
  ],
};
