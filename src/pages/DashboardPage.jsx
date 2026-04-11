import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import TotalCard from "../shared/ui/Dashboard/Cards/TotalCard";
import RecentTransactionsCard from "../shared/ui/Dashboard/Cards/RecentTransactionsCard";
import FinanceOverviewCard from "../shared/ui/Dashboard/Cards/FinanceOverviewCard";
import Last30DaysTransactionsCard from "../shared/ui/Dashboard/Cards/Last30DaysTransactionsCard";
import {
  totalCardsData,
  otherCardsData,
} from "../shared/ui/Dashboard/config/data";

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
        {totalCardsData.map((card) => (
          <TotalCard
            key={card.id}
            icon={<card.Icon />}
            label={card.label}
            total={dashboardData?.total?.[card.dataKey] || 0}
            color={card.color}
            symbol={dashboardData?.symbol?.baseCurrencySymbol}
          />
        ))}

        <FinanceOverviewCard
          totalBalance={dashboardData?.total?.totalBalance || 0}
          totalIncome={dashboardData?.total?.totalIncome || 0}
          totalExpense={dashboardData?.total?.totalExpense || 0}
          symbol={dashboardData?.symbol?.baseCurrencySymbol}
        />

        {otherCardsData.map((card) => {
          const { source, dataKey, navigateTo, ...restProps } = card.props;
          const transactions = dashboardData?.[source]?.[dataKey] ?? [];
          const onViewAll = navigateTo ? () => navigate(navigateTo) : undefined;
          const props = { ...restProps, transactions, onViewAll };

          if (card.type === "recent") {
            return <RecentTransactionsCard key={card.id} {...props} />;
          }

          if (card.type === "category") {
            return <Last30DaysTransactionsCard key={card.id} {...props} />;
          }

          return null;
        })}
      </div>

      <div>
        {apiError && (
          <p className="text-red-500 italic text-center">{apiError}</p>
        )}
      </div>
    </div>
  );
}
