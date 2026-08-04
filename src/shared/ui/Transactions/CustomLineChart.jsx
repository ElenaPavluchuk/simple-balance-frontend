import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import dayjs from "dayjs";

export default function CustomLineChart({ transactions }) {
  const data = transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((transaction) => ({
      month: dayjs(transaction?.date).format("D MMMM"),
      amount: transaction?.amount,
      category: transaction?.category,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffb3c6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#ffb3c6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="none" />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

        {/* <Tooltip content={<CustomTooltip />} /> */}

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#ff8fab"
          fill="url(#incomeGradient)"
          strokeWidth={3}
          dot={{ r: 3, fill: "ab8df8" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
