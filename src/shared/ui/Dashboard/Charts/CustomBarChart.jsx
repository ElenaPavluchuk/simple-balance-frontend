import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import PropTypes from "prop-types";

CustomBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function CustomBarChart({ data }) {
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis
            domain={[0, "dataMax"]}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <Tooltip content={CustomTooltip} />
          <Bar dataKey="value" fill="#FF8042" radius={[10, 10, 10, 10]}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
