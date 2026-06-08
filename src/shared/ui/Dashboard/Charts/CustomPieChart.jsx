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
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
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
          fill="#888"
          fontSize="14px"
        >
          {label}
        </text>
        <text
          x="50%"
          y="50%"
          dy={10}
          textAnchor="middle"
          fill={`${totalAmount < 0 ? "#ff4d6d" : "#222"}`}
          fontSize="22px"
          fontWeight="600"
        >
          {currencyFormat(totalAmount, code)}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}
