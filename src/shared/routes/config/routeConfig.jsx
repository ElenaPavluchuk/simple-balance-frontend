import { AuthGuard } from "../guards/AuthGuard";
import SignupPage from "../../../pages/SignupPage";
import LoginPage from "../../../pages/LoginPage";
import Layout from "../../ui/Layout/Layout";
import DashboardPage from "../../../pages/DashboardPage";
import ExpensePage from "../../../pages/ExpensePage";
import IncomePage from "../../../pages/IncomePage";
import UserProfilePage from "../../../pages/UserProfilePage";

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
      { path: "profile", element: <UserProfilePage /> },
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
