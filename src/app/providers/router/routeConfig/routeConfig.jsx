import AppLayout from "../../../ui/layout/AppLayout";
import DashboardPage from "../../../../pages/DashboardPage/DashboardPage";
import ExpensePage from "../../../../pages/ExpensePage/ExpensePage";
import IncomePage from "../../../../pages/IncomePage/IncomePage";

export const routeConfig = [
  {
    path: "/",
    element: <AppLayout />, // Общий layout для всех дочерних роутов
    children: [
      {
        index: true, // это эквивалент path: "" — главная страница внутри layout
        element: <DashboardPage />,
      },
      {
        path: "expense",
        element: <ExpensePage />,
      },
      {
        path: "income",
        element: <IncomePage />,
      },
    ],
  },
];
