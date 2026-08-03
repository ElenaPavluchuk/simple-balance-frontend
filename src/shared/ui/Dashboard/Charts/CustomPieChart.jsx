import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import { currencyFormat } from "../../../utils/format";
import PropTypes from "prop-types";

CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
};

export default function CustomPieChart({ data, label, totalAmount, code }) {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <PieChart>
        <defs>
          <linearGradient id="gradIncome" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00d492" />
            <stop offset="80%" stopColor="#65a30d" />
          </linearGradient>
        </defs>

        <defs>
          <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D492" />
            <stop offset="80%" stopColor="#0084D1" />
          </linearGradient>
        </defs>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          cornerRadius={8}
          isAnimationActive={true}
          animationDuration={800}
          labelLine={false}
        ></Pie>

        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />

        <text
          x="50%"
          y="50%"
          dy={-20}
          textAnchor="middle"
          fill="oklch(39.8% 0.07 227.392)"
          fontSize="14px"
          fontWeight="500"
        >
          {label}
        </text>

        <text
          x="50%"
          y="50%"
          dy={10}
          textAnchor="middle"
          fill={`${totalAmount < 0 ? "oklch(57.7% 0.245 27.325)" : "oklch(30.2% 0.056 229.695)"}`}
          fontSize="22px"
          fontWeight="600"
        >
          {currencyFormat(totalAmount, code)}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}
