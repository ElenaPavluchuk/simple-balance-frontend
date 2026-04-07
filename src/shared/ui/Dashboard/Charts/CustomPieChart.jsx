import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

export default function CustomPieChart({
  data,
  label,
  totalAmount,
  symbol,
  showTextAnchor,
}) {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={95}
          paddingAngle={3}
          cornerRadius={8}
          isAnimationActive={true}
          animationDuration={800}
          labelLine={false}
        ></Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />
        {showTextAnchor && (
          <>
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
              fill="#222"
              fontSize="22px"
              fontWeight="600"
            >
              {symbol}
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
