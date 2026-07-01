import { AuthGuard } from "../guards/AuthGuard";
import { AdminGuard } from "../guards/AdminGuard";
import SignupPage from "../../../pages/Auth/SignupPage";
import LoginPage from "../../../pages/Auth/LoginPage";
import AppLayout from "../../ui/Layouts/AppLayout/AppLayout";
import DashboardPage from "../../../pages/DashboardPage";
import ExpensePage from "../../../pages/ExpensePage";
import IncomePage from "../../../pages/IncomePage";
import UserProfilePage from "../../../pages/UserProfilePage";
import CurrenciesAndNewsPage from "../../../pages/CurrenciesAndNewsPage";
import NewsPage from "../../../pages/NewsPage";
import ManageUsersPage from "../../../pages/Admin/ManageUsersPage";
import ManageContentPage from "../../../pages/Admin/ManageContentPage";

export const routeConfig = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "expense", element: <ExpensePage /> },
      { path: "income", element: <IncomePage /> },
      { path: "profile", element: <UserProfilePage /> },
      { path: "content", element: <CurrenciesAndNewsPage /> },
      { path: "/news/:id", element: <NewsPage /> },
      {
        path: "manage-users",
        element: (
          <AdminGuard>
            <ManageUsersPage />
          </AdminGuard>
        ),
      },
      {
        path: "manage-content",
        element: (
          <AdminGuard>
            <ManageContentPage />
          </AdminGuard>
        ),
      },
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
