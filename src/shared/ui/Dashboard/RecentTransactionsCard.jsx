import TransactionCard from "../Transactions/TransactionCard";
import { Link } from "react-router";
import PlusIcon from "../Icons/PlusIcon";
import Card from "../Card";
import PropTypes from "prop-types";

RecentTransactionsCard.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      category_name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      currency_code: PropTypes.string.isRequired,
    }),
  ).isRequired,
  navigateTo: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  spanningColumns: PropTypes.string.isRequired,
};

export default function RecentTransactionsCard({
  transactions,
  navigateTo,
  title,
  description,
  order,
  spanningColumns,
}) {
  return (
    <Card className={`card ${order} ${spanningColumns} min-h-120`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl text-slate-900 font-medium">{title}</h3>
          <p className="text-xs text-gray-600 text-balance mt-1">
            {description}
          </p>
        </div>
        {navigateTo && (
          <Link
            to={navigateTo}
            className="text-gray-600 hover:underline text-base whitespace-nowrap"
          >
            {transactions.length === 0 ? (
              <div className="border border-gray-600 rounded-full text-gray-600 hover:bg-emerald-800 hover:border-emerald-800 hover:text-white">
                <PlusIcon />
              </div>
            ) : (
              "View all"
            )}
          </Link>
        )}
      </div>

      {transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-90">
          <p className="text-sm text-cyan-950">
            No transactions in the last 30 days
          </p>
          <p className="text-xs text-gray-300 mt-1">
            Add transaction to see the list
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} isDashboardStyle />
        ))}
      </div>
    </Card>
  );
}
