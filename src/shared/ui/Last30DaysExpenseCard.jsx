import CustomBarChart from "./CustomBarChart";

export default function Last30DaysExpenseCard({ transactions }) {
  const data = transactions.map((t, index) => ({
    name: t?.category_name,
    value: t?.amount,
    fill: index % 2 === 0 ? "#ffb3c6" : "#ffe5ec",
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
