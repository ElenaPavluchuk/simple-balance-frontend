import CustomBarChart from "./Charts/CustomBarChart";
import Card from "../Card";
import PropTypes from "prop-types";

RecentTransactionsChartCard.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      category_name: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  spanningColumns: PropTypes.string.isRequired,
};

export default function RecentTransactionsChartCard({
  transactions,
  title,
  code,
  order,
  spanningColumns,
}) {
  const data = transactions.map((t, index) => ({
    name: t?.category_name,
    value: Number(t?.amount) || 0,
    code,
    fill: index % 2 === 0 ? "#009966" : "#006045",
  }));

  return (
    <Card
      className={`card ${order} ${spanningColumns} col-span-1 flex flex-col min-h-100`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl text-slate-900 font-medium">{`Last 30 Days ${title}`}</h3>
      </div>

      {data.length === 0 ? (
        <div className="min-h-90 flex flex-col items-center justify-center">
          <p className="text-sm text-cyan-950">
            No transactions in the last 30 days
          </p>
          <p className="text-xs text-gray-300 mt-1">
            Add transaction to see the chart
          </p>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <CustomBarChart data={data} />
        </div>
      )}
    </Card>
  );
}
