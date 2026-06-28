import CustomPieChart from "./Charts/CustomPieChart";
import PropTypes from "prop-types";

FinanceOverviewCard.propTypes = {
  totalBalance: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalExpense: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  spanningColumns: PropTypes.string.isRequired,
};

export default function FinanceOverviewCard({
  totalBalance,
  totalIncome,
  totalExpense,
  code,
  order,
  spanningColumns,
}) {
  const BALANCE_DATA = [
    {
      name: "Total Expense",
      value: totalExpense,
      code: code,
      fill: "#ffcfd2",
    },
    {
      name: "Total Income",
      value: totalIncome,
      code: code,
      fill: "#ffc6ff",
    },
  ];

  return (
    <div className={`card ${order} ${spanningColumns} bg-white rounded h-125`}>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={BALANCE_DATA}
        label="Total Balance"
        totalAmount={totalBalance}
        code={code}
      />
    </div>
  );
}
