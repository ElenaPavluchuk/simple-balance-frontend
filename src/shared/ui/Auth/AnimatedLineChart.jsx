import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DATA = [
  { name: "Jan", income: 4800, expenses: 1800 },
  { name: "Feb", income: 6200, expenses: 2900 },
  { name: "Mar", income: 5100, expenses: 4200 },
  { name: "Apr", income: 7600, expenses: 3100 },
  { name: "May", income: 4300, expenses: 5100 },
  { name: "Jun", income: 6900, expenses: 2700 },
];

const DARK_EMERALD = "#007a55";
const LIGHT_EMERALD = "#00bc7d";

export default function AnimatedLineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={DATA}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={LIGHT_EMERALD} stopOpacity={0.8} />
            <stop offset="95%" stopColor={LIGHT_EMERALD} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={DARK_EMERALD} stopOpacity={0.8} />
            <stop offset="95%" stopColor={DARK_EMERALD} stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="name"
          stroke="#006045"
          tickLine={false}
          interval={0}
          padding={{ left: 8, right: 8 }}
        />

        <YAxis hide={true} />

        <Tooltip
          contentStyle={{
            fontSize: "12px",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          labelStyle={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#004f3b",
          }}
          formatter={(value, name) => [
            `$${value.toLocaleString()}`,
            name === "income" ? "Income" : "Expenses",
          ]}
        />

        <Area
          type="monotone"
          dataKey="income"
          stroke={LIGHT_EMERALD}
          fillOpacity={1}
          fill="url(#colorIncome)"
          dot={false}
          strokeWidth={3}
          isAnimationActive={true}
          animationDuration={1500}
        />

        <Area
          type="monotone"
          dataKey="expenses"
          stroke={DARK_EMERALD}
          fillOpacity={1}
          fill="url(#colorExpenses)"
          dot={false}
          strokeWidth={3}
          isAnimationActive={true}
          animationDuration={2000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
