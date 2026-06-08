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
  recentCardsData,
  lastChartCardsData,
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
      {isLoading || !dashboardData ? (
        <div className="min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {totalCardsData.map((item) => (
            <TotalCard
              key={item.id}
              icon={<item.Icon />}
              label={item.label}
              total={dashboardData?.total?.[item.dataKey] || 0}
              color={item.color}
              code={dashboardData?.code?.baseCurrencyCode}
              order={item.order}
              spanningColumns={item.spanningColumns}
            />
          ))}

          <FinanceOverviewCard
            totalBalance={dashboardData?.total?.totalBalance || 0}
            totalIncome={dashboardData?.total?.totalIncome || 0}
            totalExpense={dashboardData?.total?.totalExpense || 0}
            code={dashboardData?.code?.baseCurrencyCode}
            order={"order-4"}
            spanningColumns={"col-start-1 col-end-3"}
          />

          {recentCardsData.map((item) => (
            <RecentTransactionsCard
              key={item.id}
              transactions={dashboardData?.[item.source]?.[item.dataKey] ?? []}
              onViewAll={
                item.navigateTo ? () => navigate(item.navigateTo) : undefined
              }
              title={item.title}
              hideBtn={item.hideBtn ? item.hideBtn : false}
              order={item.order}
              spanningColumns={item.spanningColumns}
            />
          ))}

          {lastChartCardsData.map((item) => (
            <Last30DaysTransactionsCard
              key={item.id}
              transactions={dashboardData?.[item.source]?.[item.dataKey] ?? []}
              title={item.title}
              symbol={dashboardData?.symbol?.baseCurrencySymbol}
              order={item.order}
              spanningColumns={item.spanningColumns}
            />
          ))}
        </div>
      )}
    </div>
  );
}
