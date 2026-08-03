import CustomBarChart from "./Charts/CustomBarChart";
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
  const DATA = transactions.map((t, index) => ({
    name: t.category_name,
    value: Number(t.amount) || 0,
    code,
    fill: index % 2 === 0 ? "#ffb3c6" : "#ffe5ec",
  }));

  return (
    <div className={`card ${order} ${spanningColumns} col-span-1 bg-white`}>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{`Last 30 Days ${title}`}</h5>
      </div>

      {DATA.length === 0 && (
        <div className="h-20 flex flex-col items-center justify-center">
          <p className="text-sm">No transactions yet</p>
          <p className="text-xs text-gray-300 mt-1">
            Add your first transaction to see the chart
          </p>
        </div>
      )}

      <CustomBarChart data={DATA} />
    </div>
  );
}
