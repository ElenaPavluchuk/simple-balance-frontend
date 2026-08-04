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
      code: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function CustomBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 24,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "#6b7280" }}
          stroke="none"
        />
        <YAxis
          width="auto"
          domain={[0, "dataMax"]}
          tick={{ fontSize: 12, fill: "#6b7280" }}
          stroke="none"
        />
        <Tooltip content={CustomTooltip} />
        <Bar dataKey="value" maxBarSize={50} radius={[10, 10, 10, 10]}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
