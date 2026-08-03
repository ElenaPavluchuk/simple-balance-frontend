import CustomPieChart from "./Charts/CustomPieChart";
import Card from "../Card";
import PropTypes from "prop-types";

FinancialFlowCard.propTypes = {
  totalBalance: PropTypes.number.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalExpense: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  spanningColumns: PropTypes.string.isRequired,
};

export default function FinancialFlowCard({
  totalBalance,
  totalIncome,
  totalExpense,
  code,
  order,
  spanningColumns,
}) {
  const BALANCE_DATA = [
    {
      name: "Total expense",
      value: totalExpense,
      code: code,
      fill: "url(#gradExpense)",
      color: "#0284c7",
    },
    {
      name: "Total income",
      value: totalIncome,
      code: code,
      fill: "url(#gradIncome)",
      color: "#5ea500",
    },
  ];

  return (
    <Card className={`card ${order} ${spanningColumns} min-h-100`}>
      <h3 className="text-xl text-slate-900 font-medium">Financial flow</h3>

      <CustomPieChart
        data={BALANCE_DATA}
        label="Total balance"
        totalAmount={totalBalance}
        code={code}
      />
    </Card>
  );
}
