import TransactionCard from "../Transactions/TransactionCard";
import Button from "../Button";
import { CirclePlus } from "lucide-react";
import PropTypes from "prop-types";

RecentTransactionsCard.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category_name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      currency_symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onViewAll: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  hideBtn: PropTypes.bool,
  order: PropTypes.string,
  spanningColumns: PropTypes.string,
};

export default function RecentTransactionsCard({
  transactions,
  onViewAll,
  title,
  hideBtn,
  order,
  spanningColumns,
}) {
  return (
    <div className={`bg-white p-3 rounded card ${order} ${spanningColumns}`}>
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">{title}</h5>
        {!hideBtn && (
          <Button
            onClick={onViewAll}
            variant={transactions.length === 0 ? "icon" : "link"}
            fontSize="text-sm"
          >
            {transactions.length === 0 ? <CirclePlus size={20} /> : "View all"}
          </Button>
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

      <div className="mt-6 flex flex-col gap-5">
        {transactions?.map((t) => (
          <TransactionCard key={t.id} transaction={t} hideDetails />
        ))}
      </div>
    </div>
  );
}
