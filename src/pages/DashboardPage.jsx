import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import TotalCard from "../shared/ui/TotalCard";
import { Home, Wallet, CreditCard } from "lucide-react";
import RecentTransactionsCard from "../shared/ui/RecentTransactionsCard";
import FinanceOverviewCard from "../shared/ui/FinanceOverviewCard";
import Last30DaysExpenseCard from "../shared/ui/Last30DaysExpenseCard";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.DASHBOARD,
        );

        setDashboardData(response?.data);
      } catch (err) {
        console.error(err);
        const message =
          err?.response?.data?.message ||
          "Something went wrong. Please try again";
        setApiError(message);
      }
    };

    getDashboardData();
  }, []);
  return (
    <div className="m-5">
      <h1 className="mb-5 text-center font-bold">Dashboard Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TotalCard
          icon={<Home />}
          label={"Total balance"}
          total={dashboardData?.total?.totalBalance || 0}
          symbol={dashboardData?.symbol?.baseCurrencySymbol}
          color={"bg-teal-500"}
        />

        <TotalCard
          icon={<Wallet />}
          label={"Total income"}
          total={dashboardData?.total?.totalIncome || 0}
          symbol={dashboardData?.symbol?.baseCurrencySymbol}
          color={"bg-pink-500"}
        />

        <TotalCard
          icon={<CreditCard />}
          label={"Total expense"}
          total={dashboardData?.total?.totalExpense || 0}
          symbol={dashboardData?.symbol?.baseCurrencySymbol}
          color={"bg-cyan-500"}
        />

        <RecentTransactionsCard
          transactions={dashboardData?.total?.recentTransactions}
          title={"Recent Transactions"}
          hideBtn
        />

        <FinanceOverviewCard
          totalBalance={dashboardData?.total?.totalBalance || 0}
          totalIncome={dashboardData?.total?.totalIncome || 0}
          totalExpense={dashboardData?.total?.totalExpense || 0}
          symbol={dashboardData?.symbol?.baseCurrencySymbol}
        />

        <RecentTransactionsCard
          transactions={dashboardData?.last30Days?.expenseTransactions || []}
          title={"Expense"}
          onViewAll={() => navigate("/expense")}
        />

        <Last30DaysExpenseCard
          transactions={dashboardData?.last30Days?.expenseByCategory || []}
        />
      </div>

      <div>
        {apiError && (
          <p className="text-red-500 italic text-center">{apiError}</p>
        )}
      </div>
    </div>
  );
}
