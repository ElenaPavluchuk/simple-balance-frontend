import TransactionCard from "../Transactions/TransactionCard";
import { Link } from "react-router";
import { CirclePlus } from "lucide-react";
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl text-slate-900 font-medium">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
        {navigateTo && (
          <Link
            to={navigateTo}
            className="text-gray-600 hover:text-cyan-950 hover:underline text-base"
          >
            {transactions.length === 0 ? <CirclePlus size={20} /> : "View all"}
          </Link>
        )}
      </div>

      {transactions.length === 0 && (
        <div className="h-20 flex flex-col items-center justify-center">
          <p className="text-sm">No transactions yet</p>
          <p className="text-xs text-gray-300 mt-1">
            Add your first transaction to see the list
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} dashboardStyle />
        ))}
      </div>
    </Card>
  );
}
