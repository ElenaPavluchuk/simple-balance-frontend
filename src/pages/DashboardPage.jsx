import { useState, useEffect } from "react";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import TotalCard from "../shared/ui/Dashboard/TotalCard";
import RecentTransactionsCard from "../shared/ui/Dashboard/RecentTransactionsCard";
import FinancialFlowCard from "../shared/ui/Dashboard/FinancialFlowCard";
import RecentTransactionsChartCard from "../shared/ui/Dashboard/RecentTransactionsChartCard";
import {
  TOTAL_CARDS_DATA,
  RECENT_CARDS_DATA,
  RECENT_CHART_CARDS_DATA,
} from "../shared/ui/Dashboard/config/data";
import toast from "react-hot-toast";
import Loader from "../shared/ui/Loader";
import { getErrorMessage } from "../shared/utils/getErrorMessage";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const getDashboardData = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          API_PATHS.TRANSACTIONS.DASHBOARD,
        );

        if (isCancelled) return;

        setDashboardData(response.data);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        toast.error(getErrorMessage(err));
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
    <>
      {isLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TOTAL_CARDS_DATA.map((item) => (
            <TotalCard
              key={item.ID}
              icon={<item.ICON className="w-7 h-7" />}
              label={item.LABEL}
              total={dashboardData?.total?.[item.DATA_KEY] || 0}
              color={item.COLOR}
              code={dashboardData?.code?.baseCurrencyCode}
              order={item.ORDER}
              spanningColumns={item.SPANNING_COLUMNS}
            />
          ))}

          <FinancialFlowCard
            totalBalance={dashboardData?.total?.totalBalance || 0}
            totalIncome={dashboardData?.total?.totalIncome || 0}
            totalExpense={dashboardData?.total?.totalExpense || 0}
            code={dashboardData?.code?.baseCurrencyCode}
            order={"order-4"}
            spanningColumns={"col-start-1 col-end-3"}
          />

          {RECENT_CARDS_DATA.map((item) => (
            <RecentTransactionsCard
              key={item.ID}
              transactions={dashboardData?.[item.SOURCE]?.[item.DATA_KEY] ?? []}
              navigateTo={item.NAVIGATE_TO}
              title={item.TITLE}
              description={item.DESCRIPTION}
              order={item.ORDER}
              spanningColumns={item.SPANNING_COLUMNS}
            />
          ))}

          {RECENT_CHART_CARDS_DATA.map((item) => (
            <RecentTransactionsChartCard
              key={item.ID}
              transactions={dashboardData?.[item.SOURCE]?.[item.DATA_KEY] ?? []}
              title={item.TITLE}
              code={dashboardData?.code?.baseCurrencyCode}
              order={item.ORDER}
              spanningColumns={item.SPANNING_COLUMNS}
            />
          ))}
        </div>
      )}
    </>
  );
}
