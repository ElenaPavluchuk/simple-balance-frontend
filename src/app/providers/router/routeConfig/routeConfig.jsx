import Layout from "../../../../shared/ui/Layout/Layout";
import DashboardPage from "../../../../pages/DashboardPage/DashboardPage";
import ExpensePage from "../../../../pages/ExpensePage/ExpensePage";
import IncomePage from "../../../../pages/IncomePage/IncomePage";

export const routeConfig = {
  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <DashboardPage /> },
    { path: "expense", element: <ExpensePage /> },
    { path: "income", element: <IncomePage /> },
  ],
};
