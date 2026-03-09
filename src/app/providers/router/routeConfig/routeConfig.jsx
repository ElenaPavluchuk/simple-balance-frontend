import Layout from "../../../../shared/ui/Layout/Layout";
import DashboardPage from "../../../../pages/DashboardPage/DashboardPage";
import ExpensePage from "../../../../pages/ExpensePage/ExpensePage";
import IncomePage from "../../../../pages/IncomePage/IncomePage";
import SignupPage from "../../../../pages/SignupPage/SignupPage";
import { AuthGuard } from "../guards/AuthGuard";

export const routeConfig = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
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
