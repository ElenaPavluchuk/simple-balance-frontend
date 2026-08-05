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
import CustomTooltip from "../Dashboard/Charts/CustomTooltip";

const DARK_EMERALD = "#007a55";
const LIGHT_EMERALD = "#00bc7d";

export default function CustomLineChart({ transactions }) {
  const data = [...transactions].slice(0, 10).map((transaction) => ({
    name: transaction?.title,
    month: dayjs(transaction?.date).format("D MMM"),
    amount: transaction?.amount,
    category: transaction?.category_name,
    code: transaction?.currency_code,
  }));

  return (
    <ResponsiveContainer width="100%" height={310}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="transactionGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={LIGHT_EMERALD} stopOpacity={0.8} />
            <stop offset="95%" stopColor={DARK_EMERALD} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#6b7280" }}
          stroke="none"
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#6b7280" }}
          stroke="none"
          domain={[0, "dataMax"]}
          width={36}
        />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#007a55"
          fill="url(#transactionGrad)"
          strokeWidth={3}
          dot={{ r: 3, fill: "#A4F4CF" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
