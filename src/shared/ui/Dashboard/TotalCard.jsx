import PropTypes from "prop-types";
import { currencyFormat } from "../../utils/formattingFunctions";

TotalCard.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  order: PropTypes.string,
  spanningColumns: PropTypes.string,
};

export default function TotalCard({
  icon,
  label,
  total,
  code,
  color,
  order,
  spanningColumns,
}) {
  return (
    <div
      className={`flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 card ${order} ${spanningColumns}`}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center text-2xl text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1"> {label}</h6>
        <div className="flex flex-row gap-2">
          <p className="text-xl">{currencyFormat(total, code)}</p>
        </div>
      </div>
    </div>
  );
}
