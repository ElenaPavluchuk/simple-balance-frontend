import PropTypes from "prop-types";
import { currencyFormat } from "../../utils/format";
import Card from "../Card";

TotalCard.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  spanningColumns: PropTypes.string.isRequired,
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
    <Card
      className={`flex flex-col items-center justify-center md:justify-start md:flex-row gap-6 card ${order} ${spanningColumns}`}
    >
      <div
        className={`md:w-14 md:h-14 w-12 h-12 flex items-center justify-center text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm font-medium text-cyan-900 mb-1">{label}</h6>
        <div className="flex flex-row gap-2">
          <p className="text-xl text-cyan-950">{currencyFormat(total, code)}</p>
        </div>
      </div>
    </Card>
  );
}
