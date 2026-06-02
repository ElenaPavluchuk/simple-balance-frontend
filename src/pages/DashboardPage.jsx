import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import TotalCard from "../shared/ui/Dashboard/TotalCard";
import RecentTransactionsCard from "../shared/ui/Dashboard/RecentTransactionsCard";
import FinanceOverviewCard from "../shared/ui/Dashboard/FinanceOverviewCard";
import Last30DaysTransactionsCard from "../shared/ui/Dashboard/Last30DaysTransactionsCard";
import {
  totalCardsData,
  cardsByTypeData,
} from "../shared/ui/Dashboard/config/data";
import toast from "react-hot-toast";
import Loader from "../shared/ui/Loader";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    const getDashboardData = async () => {
      try {
        setIsLoading(true);

        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.DASHBOARD,
        );

        if (!isCancelled) setDashboardData(response?.data);
      } catch (err) {
        if (!isCancelled) console.error(err);
        if (!isCancelled)
          toast.error(err?.response?.data?.message || "Something went wrong");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    getDashboardData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="m-5">
      {isLoading && <Loader />}

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

        {cardsByTypeData.map((card) => {
          const { source, dataKey, navigateTo, ...restProps } = card.props;
          const transactions = dashboardData?.[source]?.[dataKey] ?? [];
          const onViewAll = navigateTo ? () => navigate(navigateTo) : undefined;
          const props = { ...restProps, transactions, onViewAll };

          if (card.type === "recent") {
            return <RecentTransactionsCard key={card.id} {...props} />;
          }

          if (card.type === "category") {
            return (
              <Last30DaysTransactionsCard
                key={card.id}
                symbol={dashboardData?.symbol?.baseCurrencySymbol}
                {...props}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
