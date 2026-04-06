import CustomBarChart from "./CustomBarChart";

export default function Last30DaysExpenseCard({ transactions }) {
  const data = transactions.map((t) => ({
    category: t?.category_name,
    amount: t?.amount,
  }));

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expense</h5>
      </div>

      <CustomBarChart data={data} />
    </div>
  );
}
