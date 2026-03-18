import { AuthGuard } from "../guards/AuthGuard";
import Layout from "../../ui/Layout/Layout";
import DashboardPage from "../../../pages/DashboardPage/DashboardPage";
import ExpensePage from "../../../pages/ExpensePage";
import IncomePage from "../../../pages/IncomePage/IncomePage";
import SignupPage from "../../../pages/SignupPage";
import LoginPage from "../../../pages/LoginPage";

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
  {
    path: "/login",
    element: <LoginPage />,
  },
];
