import { currencyFormat } from "../../../utils/format";
import PropTypes from "prop-types";

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
      }),
      value: PropTypes.number,
    }),
  ),
};

export default function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
        <p className="text-sm font-semibold text-slate-900 mb-1">
          {payload[0].payload.name ?? payload.name}
        </p>
        <p className="text-xs font-medium text-cyan-900">
          Amount:{" "}
          <span className="text-sm font-medium text-cyan-950">
            {currencyFormat(
              payload[0].value ?? payload.amount,
              payload[0].payload.code ?? payload.code,
            )}
          </span>
        </p>
      </div>
    );
  }

  return null;
}
