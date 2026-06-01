import TransactionCard from "../Transactions/TransactionCard";

export default function RecentTransactionsCard({
  transactions,
  onViewAll,
  title,
  hideBtn,
}) {
  return (
    <div className="bg-white p-3 rounded">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">{title}</h5>
        {!hideBtn && (
          <button className="underline italic" onClick={onViewAll}>
            {transactions.length === 0 ? "Add transaction" : "View all"}
          </button>
        )}
      </div>

      {transactions.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-cyan-700 italic">
            Your transactions will be here...
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
