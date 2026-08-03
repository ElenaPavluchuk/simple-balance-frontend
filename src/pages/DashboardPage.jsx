import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../shared/utils/axiosInstance";
import { API_PATHS } from "../shared/utils/apiPaths";
import TotalCard from "../shared/ui/Dashboard/TotalCard";
import RecentTransactionsCard from "../shared/ui/Dashboard/RecentTransactionsCard";
import FinancialFlowCard from "../shared/ui/Dashboard/FinancialFlowCard";
import Last30DaysTransactionsCard from "../shared/ui/Dashboard/Last30DaysTransactionsCard";
import {
  TOTAL_CARDS_DATA,
  RECENT_CARDS_DATA,
  LAST_CHART_CARDS_DATA,
} from "../shared/ui/Dashboard/config/data";
import toast from "react-hot-toast";
import Loader from "../shared/ui/Loader";
import { getErrorMessage } from "../shared/utils/getErrorMessage";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        <Loader className="min-h-screen flex justify-center items-center" />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TOTAL_CARDS_DATA.map((item) => (
            <TotalCard
              key={item.ID}
              icon={<item.ICON />}
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
              onViewAll={item.NAVIGATE_TO && (() => navigate(item.NAVIGATE_TO))}
              title={item.TITLE}
              hideBtn={item.HIDE_BTN}
              order={item.ORDER}
              spanningColumns={item.SPANNING_COLUMNS}
            />
          ))}

          {LAST_CHART_CARDS_DATA.map((item) => (
            <Last30DaysTransactionsCard
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
