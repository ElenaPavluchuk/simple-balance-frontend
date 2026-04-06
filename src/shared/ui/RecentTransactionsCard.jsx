import TransactionCard from "./TransactionCard";

export default function RecentTransactionsCard({ transactions }) {
  return (
    <div className="bg-white p-3 rounded">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {transactions?.map((t) => (
          <TransactionCard key={t.id} transaction={t} hideDetails />
        ))}
      </div>
    </div>
  );
}
