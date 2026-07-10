import PropTypes from "prop-types";

ExchangeRateCard.propTypes = {
  rate: PropTypes.arrayOf(
    PropTypes.shape({
      target_code: PropTypes.string.isRequired,
      rate: PropTypes.string.isRequired,
    }),
  ).isRequired,
  date: PropTypes.string,
  isManagedCardStyle: PropTypes.bool,
};

export default function ExchangeRateCard({ rate, date, isManagedCardStyle }) {
  const CURRENCY_SYMBOLS = {
    USD: "$",
    EUR: "€",
    RUB: "₽",
  };

  return (
    <div
      className={`flex border-rose-300
        ${
          isManagedCardStyle
            ? "justify-around border-b p-3"
            : "flex-col p-5 bg-white rounded-xl shadow-md border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        }
      `}
    >
      <div className="flex justify-between w-full">
        <span className="flex items-center gap-2">
          {CURRENCY_SYMBOLS[rate.target_code]}
          <p className="text-lg font-semibold">{rate.target_code}</p>
        </span>
        <p className="font-bold text-green-700">{rate.rate}</p>
      </div>

      {date && (
        <div className="flex gap-2 items-center mt-4">
          <span className="text-xs text-italic text-gray-600">
            The rate is valid on the date:{" "}
          </span>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      )}
    </div>
  );
}
