import CustomBarChart from "./Charts/CustomBarChart";
import PropTypes from "prop-types";

Last30DaysTransactionsCard.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      category_name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  spanningColumns: PropTypes.string.isRequired,
};

export default function Last30DaysTransactionsCard({
  transactions,
  title,
  symbol,
  order,
  spanningColumns,
}) {
  const data = transactions.map((t, index) => ({
    name: t?.category_name,
    value: t?.amount,
    symbol,
    fill: index % 2 === 0 ? "#ffb3c6" : "#ffe5ec",
  }));

  return (
    <div className={`card ${order} ${spanningColumns} col-span-1 bg-white`}>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{`Last 30 Days ${title}`}</h5>
      </div>

      {data.length === 0 && (
        <div className="h-20 flex flex-col items-center justify-center">
          <p className="text-sm">No transactions yet</p>
          <p className="text-xs text-gray-300 mt-1">
            Add your first transaction to see the chart
          </p>
        </div>
      )}

      <CustomBarChart data={data} />
    </div>
  );
}
