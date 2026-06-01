import CustomBarChart from "./Charts/CustomBarChart";

export default function Last30DaysTransactionsCard({
  transactions,
  title,
  symbol,
}) {
  const data = transactions.map((t, index) => ({
    name: t?.category_name,
    value: t?.amount,
    symbol,
    fill: index % 2 === 0 ? "#ffb3c6" : "#ffe5ec",
  }));

  return (
    <div className="card col-span-1 bg-white">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{`Last 30 Days ${title}`}</h5>
      </div>

      <CustomBarChart data={data} />
    </div>
  );
}
